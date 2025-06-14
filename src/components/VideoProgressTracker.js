// VideoProgressTracker.js - Reusable module for tracking video progress
// This can be imported in all video lesson components

import { useState, useEffect, useRef } from 'react';
import { call_api } from '../api';

/**
 * Hook for tracking video progress and handling points
 * 
 * @param {string} courseKey - The course identifier (e.g., "astronomy")
 * @param {string} lessonNumber - The lesson identifier (e.g., "lesson1")
 * @param {number} maxVideoPoints - Maximum points for video completion
 * @param {number} worksheetPoints - Points awarded for worksheet completion
 * @param {number} completionThreshold - Percentage at which video is considered complete
 * @returns {Object} - Video tracking state and handlers
 */
export const useVideoProgress = (
  courseKey, 
  lessonNumber, 
  maxVideoPoints = 7, 
  worksheetPoints = 5,
  completionThreshold = 95
) => {
  // State variables
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [videoWatched, setVideoWatched] = useState(0); // Current session progress
  const [highestVideoProgress, setHighestVideoProgress] = useState(0); // All-time highest progress
  const [worksheetCompleted, setWorksheetCompleted] = useState(false);
  const [pointsEarned, setPointsEarned] = useState({ video: 0, worksheet: 0 });
  const [savingPoints, setSavingPoints] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  
  // Refs
  const playerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const statusTimeoutRef = useRef(null);
  const progressLoadedRef = useRef(false); // Track if progress was loaded
  
  // Log function for debugging
  const log = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${message}`);
  };

  // Show status message with auto-fade
  const showStatus = (message, duration = 3000) => {
    setStatusMessage(message);
    
    // Clear any existing timeout
    if (statusTimeoutRef.current) {
      clearTimeout(statusTimeoutRef.current);
    }
    
    // Set new timeout to clear message
    statusTimeoutRef.current = setTimeout(() => {
      setStatusMessage("");
    }, duration);
  };

  // Verify auth token
  const verifyToken = async (navigate) => {
    const token = localStorage.getItem("token");
    if (!token) {
      log("No token found, redirecting to login page");
      navigate("/login");
      return false;
    }
    
    try {
      log("Token found, verifying...");
      const response = await call_api(null, "auth/verify", "POST");
      
      if (response && response.success) {
        log("Token verification successful");
        setIsAuthenticated(true);
        setLoading(false);
        
        // Immediately fetch progress after authentication
        await fetchUserProgressData();
        
        return true;
      } else {
        log("Token verification failed");
        localStorage.removeItem("token");
        navigate("/login");
        return false;
      }
    } catch (error) {
      console.error("Token verification error:", error);
      localStorage.removeItem("token");
      navigate("/login");
      return false;
    }
  };

  // Fetch user progress data - extracted as separate function for immediate calling
  const fetchUserProgressData = async () => {
    try {
      log("Fetching user progress data...");
      const response = await call_api(null, "points", "GET");
      
      log("API response received");
      
      if (response) {
        setUserProgress(response);
        
        // Check if there's course data available
        if (response.courses && response.courses[courseKey]) {
          const lesson = response.courses[courseKey].lessons[lessonNumber];
          
          log("Lesson data found");
          
          if (lesson) {
            // Initialize video progress
            if (lesson.activities && lesson.activities.video) {
              const savedProgress = lesson.activities.video.percentWatched || 0;
              const savedPoints = lesson.activities.video.earned || 0;
              
              log(`Loading saved video progress: ${savedProgress}%`);
              log(`Loading saved video points: ${savedPoints}`);
              
              // Set both current and highest progress
              setVideoWatched(savedProgress);
              setHighestVideoProgress(savedProgress);
              setPointsEarned(prev => ({ 
                ...prev, 
                video: savedPoints
              }));
            }
            
            // Initialize worksheet completion
            if (lesson.activities && lesson.activities.worksheet) {
              const savedCompleted = lesson.activities.worksheet.completed || false;
              const savedPoints = lesson.activities.worksheet.earned || 0;
              
              log(`Loading saved worksheet completion: ${savedCompleted}`);
              log(`Loading saved worksheet points: ${savedPoints}`);
              
              setWorksheetCompleted(savedCompleted);
              setPointsEarned(prev => ({ 
                ...prev, 
                worksheet: savedPoints
              }));
            }
            
            // Mark progress as loaded
            progressLoadedRef.current = true;
          }
        }
        
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching course progress:', err);
      setLoading(false);
    }
  };

  // Fetch progress data
  const fetchProgress = async () => {
    // Only fetch if not already loaded
    if (!progressLoadedRef.current) {
      await fetchUserProgressData();
    }
  };

  // Initialize YouTube API and player
  const initializeYouTube = (videoElementId) => {
    // Initialize YouTube API
    const loadYouTubeAPI = () => {
      log("Loading YouTube API");
      
      // Check if script already exists
      if (document.getElementById('youtube-api')) {
        log("YouTube API script already exists");
        return;
      }
      
      const tag = document.createElement('script');
      tag.id = 'youtube-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
      window.onYouTubeIframeAPIReady = initializePlayer;
    };
    
    // Initialize player when API is ready
    const initializePlayer = () => {
      log("Initializing YouTube player");
      
      const iframe = document.getElementById(videoElementId);
      if (!iframe) {
        log(`YouTube iframe with ID '${videoElementId}' not found, will retry`);
        setTimeout(() => initializePlayer(), 1000);
        return;
      }
      
      try {
        playerRef.current = new YT.Player(videoElementId, {
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
        
        log("Player initialized");
      } catch (error) {
        log("Error initializing player: " + error.message);
      }
    };
    
    // Player ready handler
    const onPlayerReady = (event) => {
      log("Player ready");
      playerRef.current = event.target;
      
      // Check initial progress
      setTimeout(() => {
        checkVideoProgress();
      }, 1000);
    };
    
    // Player state change handler
    const onPlayerStateChange = (event) => {
      const stateNames = {
        '-1': 'UNSTARTED',
        '0': 'ENDED',
        '1': 'PLAYING',
        '2': 'PAUSED',
        '3': 'BUFFERING',
        '5': 'CUED'
      };
      
      const stateName = stateNames[event.data] || event.data;
      log(`Player state changed: ${stateName} (${event.data})`);
      
      // State handlers
      if (event.data === 1) { // PLAYING
        startProgressTracking();
      } else if (event.data === 2 || event.data === 0) { // PAUSED or ENDED
        checkVideoProgress();
        stopProgressTracking();
      }
    };
    
    // Start initialization
    if (window.YT && window.YT.Player) {
      log("YouTube API already loaded");
      initializePlayer();
    } else {
      loadYouTubeAPI();
    }
    
    // Return cleanup function
    return () => {
      log("Cleaning up YouTube API");
      stopProgressTracking();
      window.onYouTubeIframeAPIReady = null;
      
      if (statusTimeoutRef.current) {
        clearTimeout(statusTimeoutRef.current);
      }
    };
  };

  // Start tracking progress
  const startProgressTracking = () => {
    log("Starting progress tracking");
    
    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    // Set up new interval - check every 3 seconds
    progressIntervalRef.current = setInterval(checkVideoProgress, 3000);
  };
  
  // Stop tracking progress
  const stopProgressTracking = () => {
    if (!progressIntervalRef.current) return;
    
    clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = null;
    log("Stopped progress tracking");
  };
  
  // Check video progress
  const checkVideoProgress = () => {
    if (!playerRef.current) {
      log("No player available");
      return;
    }
    
    try {
      // Verify player methods are available
      if (typeof playerRef.current.getCurrentTime !== 'function' || 
          typeof playerRef.current.getDuration !== 'function') {
        log("Player methods not available");
        
        // Attempt to recreate player if methods aren't available
        if (window.YT && window.YT.Player) {
          log("Recreating player instance");
          playerRef.current = new YT.Player(videoElementId, {
            events: {
              'onReady': (event) => {
                log("Player recreated");
                playerRef.current = event.target;
                setTimeout(checkVideoProgress, 500);
              }
            }
          });
        }
        return;
      }
      
      // Get times and calculate percentage
      const currentTime = playerRef.current.getCurrentTime();
      const duration = playerRef.current.getDuration();
      
      if (isNaN(currentTime) || isNaN(duration) || duration <= 0) {
        log("Invalid time values");
        return;
      }
      
      const percent = Math.min(Math.floor((currentTime / duration) * 100), 100);
      
      log(`Video progress: ${percent}% (${currentTime.toFixed(1)}/${duration.toFixed(1)})`);
      
      // Always update current session progress
      setVideoWatched(percent);
      
      // Only update highest progress if current progress is higher
      if (percent > highestVideoProgress) {
        log(`New highest progress: ${percent}% (previous: ${highestVideoProgress}%)`);
        setHighestVideoProgress(percent);
        
        // Calculate points based on new highest progress
        const points = Math.min(maxVideoPoints, Math.floor((maxVideoPoints * percent) / 100));
        log(`Updating points: ${pointsEarned.video} → ${points}`);
        setPointsEarned(prev => ({ ...prev, video: points }));
        
        // Handle completion
        if (percent >= completionThreshold) {
          log(`Video fully watched (${percent}% ≥ ${completionThreshold}%)`);
          setHighestVideoProgress(100);
          setPointsEarned(prev => ({ ...prev, video: maxVideoPoints }));
        }
      }
    } catch (error) {
      log("Error checking progress: " + error.message);
    }
  };

  // Update backend when progress changes
  const updateBackend = async () => {
    if (!userProgress || !isAuthenticated || savingPoints) return;
    
    // Get current lesson data
    const currentLesson = userProgress.courses?.[courseKey]?.lessons?.[lessonNumber];
    if (!currentLesson) return;
    
    // Check if points have changed - USING HIGHEST PROGRESS
    const videoPointsChanged = pointsEarned.video !== (currentLesson.activities?.video?.earned || 0);
    const worksheetPointsChanged = pointsEarned.worksheet !== (currentLesson.activities?.worksheet?.earned || 0);
    const videoProgressChanged = highestVideoProgress !== (currentLesson.activities?.video?.percentWatched || 0);
    const worksheetCompletionChanged = worksheetCompleted !== (currentLesson.activities?.worksheet?.completed || false);
    
    const hasChanges = videoPointsChanged || worksheetPointsChanged || 
                       videoProgressChanged || worksheetCompletionChanged;
    
    log("Changes detected: " + hasChanges + 
        `, Video: ${highestVideoProgress}% vs ${currentLesson.activities?.video?.percentWatched || 0}%, ` +
        `Points: ${pointsEarned.video} vs ${currentLesson.activities?.video?.earned || 0}`);
    
    if (hasChanges) {
      log("Updating backend with changes");
      setSavingPoints(true);
      showStatus("Saving progress...");
      
      try {
        // Create a deep clone of the userProgress
        const updatedProgress = JSON.parse(JSON.stringify(userProgress));
        
        // Ensure all needed objects exist
        if (!updatedProgress.courses[courseKey]) {
          updatedProgress.courses[courseKey] = { lessons: {} };
        }
        
        if (!updatedProgress.courses[courseKey].lessons[lessonNumber]) {
          updatedProgress.courses[courseKey].lessons[lessonNumber] = { activities: {} };
        }
        
        if (!updatedProgress.courses[courseKey].lessons[lessonNumber].activities) {
          updatedProgress.courses[courseKey].lessons[lessonNumber].activities = {};
        }
        
        // Ensure video activity exists
        if (!updatedProgress.courses[courseKey].lessons[lessonNumber].activities.video) {
          updatedProgress.courses[courseKey].lessons[lessonNumber].activities.video = {};
        }
        
        // Ensure worksheet activity exists
        if (!updatedProgress.courses[courseKey].lessons[lessonNumber].activities.worksheet) {
          updatedProgress.courses[courseKey].lessons[lessonNumber].activities.worksheet = {};
        }
        
        // Update video progress - SAVE HIGHEST PROGRESS ONLY
        updatedProgress.courses[courseKey].lessons[lessonNumber].activities.video.percentWatched = highestVideoProgress;
        updatedProgress.courses[courseKey].lessons[lessonNumber].activities.video.earned = pointsEarned.video;
        updatedProgress.courses[courseKey].lessons[lessonNumber].activities.video.completed = 
          highestVideoProgress >= completionThreshold;
        
        // Update worksheet progress
        updatedProgress.courses[courseKey].lessons[lessonNumber].activities.worksheet.completed = worksheetCompleted;
        updatedProgress.courses[courseKey].lessons[lessonNumber].activities.worksheet.earned = pointsEarned.worksheet;
        
        // Update lesson points
        updatedProgress.courses[courseKey].lessons[lessonNumber].lessonPoints = 
          pointsEarned.video + pointsEarned.worksheet;
        
        // Check if lesson is completed
        updatedProgress.courses[courseKey].lessons[lessonNumber].completed = 
          (highestVideoProgress >= completionThreshold) && worksheetCompleted;
        
        // Recalculate course points
        let coursePoints = 0;
        Object.values(updatedProgress.courses[courseKey].lessons).forEach(lesson => {
          coursePoints += lesson.lessonPoints || 0;
        });
        updatedProgress.courses[courseKey].coursePoints = coursePoints;
        
        // Check if course is completed
        const allLessonsCompleted = Object.values(updatedProgress.courses[courseKey].lessons)
          .every(lesson => lesson.completed);
        updatedProgress.courses[courseKey].completed = allLessonsCompleted;
        
        // Recalculate total points
        let totalPoints = 0;
        Object.values(updatedProgress.courses).forEach(course => {
          totalPoints += course.coursePoints || 0;
        });
        updatedProgress.totalPoints = totalPoints;
        
        log("Sending updated progress to backend");
        
        // Send to backend
        const response = await call_api(updatedProgress, "points", "POST");
        
        if (response) {
          log("Points updated successfully");
          setUserProgress(updatedProgress);
          showStatus("✓ Progress saved!", 3000);
        }
      } catch (error) {
        console.error("Error updating points:", error);
        showStatus("❌ Error saving progress", 3000);
      } finally {
        setSavingPoints(false);
      }
    }
  };

  // Cleanup function
  const cleanup = () => {
    if (statusTimeoutRef.current) {
      clearTimeout(statusTimeoutRef.current);
    }
    
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  // Simple worksheet navigation - just navigate to the page
  const navigateToWorksheet = (navigate, worksheetPath) => {
    log("Navigating to worksheet:", worksheetPath);
    navigate(worksheetPath);
  };

  return {
    // State
    loading,
    isAuthenticated,
    videoWatched,
    highestVideoProgress, // Export this for display
    worksheetCompleted,
    pointsEarned,
    savingPoints,
    statusMessage,
    
    // Methods
    verifyToken,
    fetchProgress,
    initializeYouTube,
    checkVideoProgress,
    updateBackend,
    cleanup,
    navigateToWorksheet,
    showStatus
  };
};

export default useVideoProgress;