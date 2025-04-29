import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { call_api } from '../api';
import './css/allvideo.css';

/* global YT */  // Tell ESLint that YT is a global variable

const Astrovid1s = () => {
  // State variables
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [videoWatched, setVideoWatched] = useState(0);
  const [worksheetCompleted, setWorksheetCompleted] = useState(false);
  const [pointsEarned, setPointsEarned] = useState({ video: 0, worksheet: 0 });
  const [savingPoints, setSavingPoints] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  
  // Refs
  const playerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const statusTimeoutRef = useRef(null);
  
  // Navigation
  const navigate = useNavigate();
  
  // Constants
  const lessonNumber = "lesson1";
  const courseKey = "astronomy";
  const MAX_VIDEO_POINTS = 7;
  const COMPLETION_THRESHOLD = 95;
  const WORKSHEET_POINTS = 5;

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

  // Token verification
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        log("No token found, redirecting to login page");
        navigate("/login");
        return;
      }
      
      try {
        log("Token found, verifying...");
        const response = await call_api(null, "auth/verify", "POST");
        
        if (response && response.success) {
          log("Token verification successful");
          setIsAuthenticated(true);
          setLoading(false);
        } else {
          log("Token verification failed");
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Token verification error:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    
    verifyToken();
  }, [navigate]);

  // Fetch user progress data
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const fetchUserProgress = async () => {
      try {
        log("Fetching user progress...");
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
                
                // Set video progress and points
                setVideoWatched(savedProgress);
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
            }
          }
          
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching course progress:', err);
        setLoading(false);
      }
    };

    fetchUserProgress();
  }, [isAuthenticated, courseKey, lessonNumber]);

  // YouTube API initialization
  useEffect(() => {
    // Initialize YouTube API
    const loadYouTubeAPI = () => {
      log("Loading YouTube API");
      
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
      window.onYouTubeIframeAPIReady = initializePlayer;
    };
    
    // Initialize player when API is ready
    const initializePlayer = () => {
      log("Initializing YouTube player");
      
      const iframe = document.getElementById('youtube-player');
      if (!iframe) {
        log("YouTube iframe not found, will retry");
        setTimeout(initializePlayer, 1000);
        return;
      }
      
      try {
        playerRef.current = new YT.Player('youtube-player', {
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
    
    // Cleanup
    return () => {
      log("Component unmounting, cleaning up");
      stopProgressTracking();
      window.onYouTubeIframeAPIReady = null;
      
      if (statusTimeoutRef.current) {
        clearTimeout(statusTimeoutRef.current);
      }
    };
  }, []);

  // Start tracking progress
  const startProgressTracking = () => {
    log("Starting progress tracking");
    
    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    // Set up new interval - check every 5 second
    progressIntervalRef.current = setInterval(checkVideoProgress, 5000);
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
          playerRef.current = new YT.Player('youtube-player', {
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
      
      // Update only if progress increases
      if (percent > videoWatched) {
        log(`Updating progress: ${videoWatched}% → ${percent}%`);
        setVideoWatched(percent);
        
        // Calculate points
        const points = Math.min(MAX_VIDEO_POINTS, Math.floor((MAX_VIDEO_POINTS * percent) / 100));
        log(`Updating points: ${pointsEarned.video} → ${points}`);
        setPointsEarned(prev => ({ ...prev, video: points }));
        
        // Handle completion
        if (percent >= COMPLETION_THRESHOLD) {
          log(`Video fully watched (${percent}% ≥ ${COMPLETION_THRESHOLD}%)`);
          setVideoWatched(100);
          setPointsEarned(prev => ({ ...prev, video: MAX_VIDEO_POINTS }));
        }
      }
    } catch (error) {
      log("Error checking progress: " + error.message);
    }
  };

  // Simple worksheet navigation - just navigate to the page
  const handleWorksheetClick = () => {
    log("Worksheet button clicked, navigating to worksheet");
    navigate("/astroworksheet1");
  };

  // Update points in backend when they change
  useEffect(() => {
    const updateBackend = async () => {
      if (!userProgress || !isAuthenticated || savingPoints) return;
      
      // Get current lesson data
      const currentLesson = userProgress.courses?.[courseKey]?.lessons?.[lessonNumber];
      if (!currentLesson) return;
      
      // Check if points have changed
      const videoPointsChanged = pointsEarned.video !== (currentLesson.activities?.video?.earned || 0);
      const worksheetPointsChanged = pointsEarned.worksheet !== (currentLesson.activities?.worksheet?.earned || 0);
      const videoProgressChanged = videoWatched !== (currentLesson.activities?.video?.percentWatched || 0);
      const worksheetCompletionChanged = worksheetCompleted !== (currentLesson.activities?.worksheet?.completed || false);
      
      const hasChanges = videoPointsChanged || worksheetPointsChanged || 
                         videoProgressChanged || worksheetCompletionChanged;
      
      log("Changes detected: " + hasChanges);
      
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
          
          // Update video progress
          updatedProgress.courses[courseKey].lessons[lessonNumber].activities.video.percentWatched = videoWatched;
          updatedProgress.courses[courseKey].lessons[lessonNumber].activities.video.earned = pointsEarned.video;
          updatedProgress.courses[courseKey].lessons[lessonNumber].activities.video.completed = videoWatched >= COMPLETION_THRESHOLD;
          
          // Update worksheet progress
          updatedProgress.courses[courseKey].lessons[lessonNumber].activities.worksheet.completed = worksheetCompleted;
          updatedProgress.courses[courseKey].lessons[lessonNumber].activities.worksheet.earned = pointsEarned.worksheet;
          
          // Update lesson points
          updatedProgress.courses[courseKey].lessons[lessonNumber].lessonPoints = 
            pointsEarned.video + pointsEarned.worksheet;
          
          // Check if lesson is completed
          updatedProgress.courses[courseKey].lessons[lessonNumber].completed = 
            (videoWatched >= COMPLETION_THRESHOLD) && worksheetCompleted;
          
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
    
    updateBackend();
  }, [pointsEarned, videoWatched, worksheetCompleted, userProgress, isAuthenticated, savingPoints, courseKey, lessonNumber]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current) {
        clearTimeout(statusTimeoutRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <HeroOther overlayText="Lesson 1: The Solar System"/>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading lesson content...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 1: The Solar System"/>
      
      {/* Status message notification */}
      {statusMessage && (
        <div className="status-notification" style={{
          position: 'fixed',
          top: '150px', // Moved down to avoid blocking anything
          right: '20px',
          padding: '10px 15px',
          backgroundColor: statusMessage.includes("Error") ? 'rgba(231, 76, 60, 0.8)' : '#357717',
          color: 'white',
          borderRadius: '5px',
          fontWeight: 'bold',
          zIndex: 1000,
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          animation: 'fadeIn 0.3s ease-out',
          fontSize: '16px'
        }}>
          {statusMessage}
        </div>
      )}
      
      <div className="points-status">
        <div className="points-row">
          <span className="points-label">Video progress:</span> 
          <span className="points-value">{videoWatched}%</span>
          <span className="points-earned">({pointsEarned.video} points)</span>
        </div>
        <div className="points-row">
          <span className="points-label">Worksheet:</span> 
          <span className="points-value">{worksheetCompleted ? "Completed" : "Not completed"}</span>
          <span className="points-earned">({pointsEarned.worksheet} points)</span>
        </div>
        <div className="points-row total">
          <span className="points-label">Total lesson points:</span>
          <span className="points-value">{pointsEarned.video + pointsEarned.worksheet} out of 12</span>
        </div>
      </div>
      
      <div className="vidbig">
        <div id="youtube-player-container">
          <iframe 
            id="youtube-player"
            className="astrovid" 
            width="700" 
            height="480" 
            src="https://www.youtube.com/embed/vy2NuP1ITFo?enablejsapi=1&origin=http://localhost:3001" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
      
      <div className="centered-container">
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSHCaacBter5Vp_LpWpW8qmNphqR4CZdmyFp9OIRzzuvveXNrmg-iTwFLOcsIdQMDazL6KyxAfk9ftU/pub?start=false&loop=false&delayms=3000" 
          target="_blank" 
          rel="noopener noreferrer">
          <button className="course-button">Slideshow</button>
        </Link>
        
        <button className="course-button" onClick={handleWorksheetClick}>
          Worksheet
        </button>
        
        <Link to="https://docs.google.com/document/d/e/2PACX-1vRvLzrRtS52Gup_N7UbX3YdJN9DBAhImvR8jqu8yKo7Fwt2pY0UoOfxJlkt2HJKKrA1M3-L-KHihTpF/pub" 
          target="_blank" 
          rel="noopener noreferrer">
          <button className="course-button">Student Notes</button>
        </Link>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>
      
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  );
};

export default Astrovid1s;