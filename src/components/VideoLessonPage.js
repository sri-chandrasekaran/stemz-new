import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import HeroOther from "../components/HeroOther";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { call_api } from "../api";
import "../pages/css/Allvideo.css";

/* global YT */ // Tell ESLint that YT is a global variable

const VideoLessonPage = ({
  // Required props
  lessonTitle,
  lessonNumber = "lesson1",
  courseKey = "astronomy",
  videoUrl,

  // Resource URLs and paths
  slideshowUrl,
  worksheetPath = null, // Set to null if no worksheet
  quizPath = null, // Set to null if no quiz

  // Notes configuration
  notesUrl,
  notesLabel,

  // Points configuration (same for both versions)
  maxVideoPoints = 7,
  worksheetPoints = 5,
  quizPoints = 10,
  completionThreshold = 95,

  // Version type (affects auth checks and which notes to display)
  isParentVersion = false,
  bpqQuestions = [],
}) => {
  // State variables
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [videoWatched, setVideoWatched] = useState(0);
  const [worksheetCompleted, setWorksheetCompleted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [pointsEarned, setPointsEarned] = useState({
    video: 0,
    worksheet: 0,
    quiz: 0,
  });
  const [savingPoints, setSavingPoints] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Refs
  const playerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const statusTimeoutRef = useRef(null);

  // Navigation
  const navigate = useNavigate();

  // Feature flags
  const hasWorksheet = worksheetPath !== null;
  const hasQuiz = quizPath !== null;

  // state variablse specific to bpq
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [answer, setAnswer] = useState("");
  const [questionsShown, setQuestionsShown] = useState(new Set());

  useEffect(() => {
    if (!showQuestion) return;
    if (answer === undefined || answer === null) return;
  
    // set a 400–500ms delay after the last keystroke
    const timeout = setTimeout(async () => {
      if (!answer.trim()) return; // skip empty
      try {
        const eventData = {
          questionId: `${lessonNumber}_q${currentQuestionIndex + 1}`,
          value: answer,
          cursorPos: 0,
        };
  
        console.log("💾 Continuous auto-saving snapshot:", eventData);
  
        await call_api(
          eventData,
          `studentresponses/${courseKey}/${lessonNumber}/bpqEvent`,
          "POST"
        );
  
        showStatus("✓ Auto-saved", 800);
      } catch (err) {
        console.error("❌ Error auto-saving response:", err);
        showStatus("❌ Auto-save failed", 800);
      }
    }, 500); // wait 0.5s after user stops typing
  
    // cleanup on new keystroke → resets timer
    return () => clearTimeout(timeout);
  }, [answer, showQuestion, currentQuestionIndex, courseKey, lessonNumber]);
  
  

const handleAnswerSubmit = async () => {
  console.log(`Answer submitted for question ${currentQuestionIndex + 1}:`, answer);
  
  // Call NLP API to get scores
  if (answer.trim()) {
    showStatus("Analyzing response...");
    
    const scores = await callNLPAPI(answer);
    
    if (scores) {
      console.log('🎯 NLP ANALYSIS COMPLETE 🎯');
      console.log('=====================================');
      console.log(`Question ${currentQuestionIndex + 1}: "${bpqQuestions[currentQuestionIndex]?.text}"`);
      console.log(`Student Response: "${answer}"`);
      console.log('=====================================');
      console.log('📊 QUALITATIVE SCORES (out of 20):');
      console.log(`🎨 Creativity: ${scores.creativity}/20`);
      console.log(`🧠 Critical Thinking: ${scores.critical_thinking}/20`);
      console.log(`👁️ Observation: ${scores.observation}/20`);
      console.log(`❓ Curiosity: ${scores.curiosity}/20`);
      console.log(`🔧 Problem Solving: ${scores.problem_solving}/20`);
      console.log('=====================================');
      
      // Calculate average score
      const avgScore = (scores.creativity + scores.critical_thinking + 
                       scores.observation + scores.curiosity + scores.problem_solving) / 5;
      console.log(`📈 Average Score: ${avgScore.toFixed(1)}/20`);
         // Save to backend
      showStatus("Saving response...");
      
      const responseData = {
        questionId: `${lessonNumber}_q${currentQuestionIndex + 1}`,
        initialAnswer: answer,
        finalAnswer: answer, // You can modify this if you implement revision features
        feedback: "", // Add feedback if you implement it
        scores: {
          "Creativity": scores.creativity,
          "Critical Thinking": scores.critical_thinking,
          "Observation": scores.observation,
          "Curiosity": scores.curiosity,
          "Problem Solving": scores.problem_solving
        }
      };
      
      try {
        const saveResponse = await call_api(
          responseData, 
          `studentresponses/${courseKey}/lesson/${lessonNumber}/bpq`, 
          "POST"
        );
        
        if (saveResponse && saveResponse.success) {
          console.log('✅ Response saved to backend successfully');
          showStatus("✓ Response saved!");
        } else {
          console.log('❌ Failed to save response to backend');
          showStatus("❌ Error saving response");
        }
      } catch (error) {
        console.error('Error saving response:', error);
        showStatus("❌ Error saving response");
      }
      
    } else {
      console.log('❌ NLP Analysis failed - check Flask server');
      showStatus("❌ Error analyzing response");
    }
  } else {
    console.log('⚠️ Empty response - skipping NLP analysis');
  }
  
  // Hide the question
  setShowQuestion(false);
  setAnswer("");
  
  // Resume video playbook
  if (playerRef.current && typeof playerRef.current.playVideo === "function") {
    playerRef.current.playVideo();
  }
};

const callNLPAPI = async (inputText) => {
  try {
    // Step 1: POST request to get EVENT_ID
    const postResponse = await fetch('https://stemz-learning-qualitative-metrics-nlp.hf.space/gradio_api/call/predict_scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [inputText]
      })
    });

    if (!postResponse.ok) {
      throw new Error(`POST request failed: ${postResponse.status}`);
    }

    const postResult = await postResponse.json();
    console.log('POST response:', postResult);

    const eventId = postResult.event_id;
    if (!eventId) {
      throw new Error('No event_id received');
    }

    // Step 2: GET request as text (SSE format)
    const getResponse = await fetch(`https://stemz-learning-qualitative-metrics-nlp.hf.space/gradio_api/call/predict_scores/${eventId}`);

    if (!getResponse.ok) {
      throw new Error(`GET request failed: ${getResponse.status}`);
    }

    const responseText = await getResponse.text();
    console.log('GET response text:', responseText);

    // Parse SSE format to extract the JSON data
    const lines = responseText.split('\n');
    let resultData = null;

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const jsonStr = line.substring(6); // Remove 'data: ' prefix
          const parsed = JSON.parse(jsonStr);
          console.log('Parsed line:', parsed);
          
          // The data is directly an array with the scores object
          if (Array.isArray(parsed) && parsed.length > 0) {
            resultData = parsed[0]; // Get the first element of the array
            break;
          }
        } catch (e) {
          console.log('Failed to parse line:', line, e);
          continue;
        }
      }
    }

    console.log('Final parsed result:', resultData);
    return resultData;

  } catch (error) {
    console.error('Error calling NLP API:', error);
    return null;
  }
};

  const [bpqTimeouts, setBpqTimeouts] = useState([]); // Renamed for clarity
  const [questionsScheduled, setQuestionsScheduled] = useState(false);

  const clearAllBpqTimeouts = () => {
    bpqTimeouts.forEach((timeout) => clearTimeout(timeout));
    // Don't call setBpqTimeouts([]) here 
    console.log("Cleared all BPQ timeouts");
  };

  const scheduleAllQuestions = () => {
    if (
      !playerRef.current ||
      !bpqQuestions ||
      bpqQuestions.length === 0 ||
      questionsScheduled
    ) {
      console.log("Questions already scheduled or no questions to schedule");
      return;
    }
  
    console.log("Scheduling all BPQ questions");
  
    // Clear any existing timeouts first - but don't update state
    bpqTimeouts.forEach((timeout) => clearTimeout(timeout));
  
    const newTimeouts = [];
  
    bpqQuestions.forEach((question, index) => {
      if (question && typeof question.time === "number") {
        console.log(
          `Scheduling question ${index + 1} at ${question.time} seconds:`,
          question.text
        );
  
        const timeout = setTimeout(() => {
          console.log(`Showing BPQ question ${index + 1}:`, question.text);
  
          // Clear timeouts without updating state
          bpqTimeouts.forEach((t) => clearTimeout(t));
  
          // Pause the video
          if (
            playerRef.current &&
            typeof playerRef.current.pauseVideo === "function"
          ) {
            playerRef.current.pauseVideo();
          }
  
          // Set the current question and show it
          setCurrentQuestionIndex(index);
          setShowQuestion(true);
        }, question.time * 1000);
  
        newTimeouts.push(timeout);
      }
    });
  
    setBpqTimeouts(newTimeouts); // Only update once with all timeouts
    setQuestionsScheduled(true);
  };
  

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
                const savedProgress =
                  lesson.activities.video.percentWatched || 0;
                const savedPoints = lesson.activities.video.earned || 0;

                log(`Loading saved video progress: ${savedProgress}%`);
                log(`Loading saved video points: ${savedPoints}`);

                // Set video progress and points
                setVideoWatched(savedProgress);
                setPointsEarned((prev) => ({
                  ...prev,
                  video: savedPoints,
                }));
              }

              // Initialize worksheet completion if has worksheet
              if (
                hasWorksheet &&
                lesson.activities &&
                lesson.activities.worksheet
              ) {
                const savedCompleted =
                  lesson.activities.worksheet.completed || false;
                const savedPoints = lesson.activities.worksheet.earned || 0;

                log(`Loading saved worksheet completion: ${savedCompleted}`);
                log(`Loading saved worksheet points: ${savedPoints}`);

                setWorksheetCompleted(savedCompleted);
                setPointsEarned((prev) => ({
                  ...prev,
                  worksheet: savedPoints,
                }));
              }

              // Initialize quiz completion if has quiz
              if (hasQuiz && lesson.activities && lesson.activities.quiz) {
                const savedCompleted =
                  lesson.activities.quiz.completed || false;
                const savedPoints = lesson.activities.quiz.earned || 0;

                log(`Loading saved quiz completion: ${savedCompleted}`);
                log(`Loading saved quiz points: ${savedPoints}`);

                setQuizCompleted(savedCompleted);
                setPointsEarned((prev) => ({
                  ...prev,
                  quiz: savedPoints,
                }));
              }
            }
          }

          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching course progress:", err);
        setLoading(false);
      }
    };

    fetchUserProgress();
  }, [isAuthenticated, courseKey, lessonNumber, hasWorksheet, hasQuiz]);

  // YouTube API initialization
  useEffect(() => {
    // Initialize YouTube API
    const loadYouTubeAPI = () => {
      log("Loading YouTube API");

      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";

      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initializePlayer;
    };

    // Initialize player when API is ready
    const initializePlayer = () => {
      log("Initializing YouTube player");

      const iframe = document.getElementById("youtube-player");
      if (!iframe) {
        log("YouTube iframe not found, will retry");
        setTimeout(initializePlayer, 1000);
        return;
      }

      try {
        playerRef.current = new YT.Player("youtube-player", {
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });

        log("Player initialized");
      } catch (error) {
        log("Error initializing player: " + error.message);
      }
    };
    
  // Keep the existing onPlayerReady as is - it only runs once
  const onPlayerReady = (event) => {
    console.log("Player ready");
    playerRef.current = event.target;
  };

    // // Keep the existing onPlayerReady as is - it only runs once
    // const onPlayerReady = (event) => {
    //   console.log("Player ready");
    //   playerRef.current = event.target;

    //   // Schedule all BPQ questions when player is ready (ONLY ONCE)
    //   if (bpqQuestions && bpqQuestions.length > 0) {
    //     scheduleAllQuestions();
    //   }
    // };

    // Modified player state change handler - ONLY schedule on first play
    const onPlayerStateChange = (event) => {
      const stateNames = {
        "-1": "UNSTARTED",
        0: "ENDED",
        1: "PLAYING",
        2: "PAUSED",
        3: "BUFFERING",
        5: "CUED",
      };

      const stateName = stateNames[event.data] || event.data;
      console.log(`Player state changed: ${stateName} (${event.data})`);

      // Handle different states
      if (event.data === 1) {
        // PLAYING
        startProgressTracking();

        // REMOVED: Don't schedule questions here anymore
        // Questions are only scheduled once in onPlayerReady
      } else if (event.data === 2 || event.data === 0) {
        // PAUSED or ENDED
        checkVideoProgress();
        stopProgressTracking();

        // If video ended, clear all remaining timeouts
        // if (event.data === 0) {
        //   clearAllBpqTimeouts();
        //   setQuestionsScheduled(false);
        // }
        if (event.data === 0) {
          setQuestionsShown(new Set());
        }
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

  const startProgressTracking = () => {
    log("Starting progress tracking");

    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    // Set up new interval - check every 1 second
    progressIntervalRef.current = setInterval(() => {
      checkVideoProgress();
      checkForBPQQuestions(); // ADD THIS LINE
    }, 1000); // CHANGE from 5000 to 1000
  };

  // Stop tracking progress
  const stopProgressTracking = () => {
    if (!progressIntervalRef.current) return;

    clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = null;
    log("Stopped progress tracking");
  };
  
  const checkForBPQQuestions = () => {
    if (!playerRef.current || !bpqQuestions || bpqQuestions.length === 0 || showQuestion) {
      return;
    }
  
    try {
      const currentTime = playerRef.current.getCurrentTime();
      
      // Find questions that should be shown at the current time
      bpqQuestions.forEach((question, index) => {
        if (question && typeof question.time === 'number') {
          // Check if we're at or past the question time (within 1 second tolerance)
          // and haven't shown this question yet
          if (currentTime >= question.time && 
              currentTime < question.time + 1 && 
              !questionsShown.has(index)) {
            
            console.log(`Showing BPQ question ${index + 1} at video time ${currentTime}:`, question.text);
            
            // Mark this question as shown
            setQuestionsShown(prev => new Set([...prev, index]));
            
            // Pause the video
            if (typeof playerRef.current.pauseVideo === "function") {
              playerRef.current.pauseVideo();
            }
            
            // Set the current question and show it
            setCurrentQuestionIndex(index);
            setShowQuestion(true);
            
            // Break after showing one question
            return;
          }
        }
      });
    } catch (error) {
      console.log("Error checking for BPQ questions:", error);
    }
  };
  
  // Check video progress
  const checkVideoProgress = () => {
    if (!playerRef.current) {
      log("No player available");
      return;
    }

    try {
      // Verify player methods are available
      if (
        typeof playerRef.current.getCurrentTime !== "function" ||
        typeof playerRef.current.getDuration !== "function"
      ) {
        log("Player methods not available");

        // Attempt to recreate player if methods aren't available
        if (window.YT && window.YT.Player) {
          log("Recreating player instance");
          playerRef.current = new YT.Player("youtube-player", {
            events: {
              onReady: (event) => {
                log("Player recreated");
                playerRef.current = event.target;
                setTimeout(checkVideoProgress, 500);
              },
            },
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

      const currentPercent = Math.min(
        Math.floor((currentTime / duration) * 100),
        100
      );

      log(
        `Current video position: ${currentPercent}% (${currentTime.toFixed(
          1
        )}/${duration.toFixed(1)})`
      );

      // Only update if current position is higher than saved max progress
      if (currentPercent > videoWatched) {
        log(`Updating progress: ${videoWatched}% → ${currentPercent}%`);
        setVideoWatched(currentPercent);

        // Calculate points
        const points = Math.min(
          maxVideoPoints,
          Math.floor((maxVideoPoints * currentPercent) / 100)
        );
        log(`Updating points: ${pointsEarned.video} → ${points}`);
        setPointsEarned((prev) => ({ ...prev, video: points }));

        // Handle completion
        if (currentPercent >= completionThreshold) {
          log(
            `Video fully watched (${currentPercent}% ≥ ${completionThreshold}%)`
          );
          setVideoWatched(100);
          setPointsEarned((prev) => ({ ...prev, video: maxVideoPoints }));
        }
      } else {
        log(
          `Current position (${currentPercent}%) is less than max progress (${videoWatched}%). No update needed.`
        );
      }
    } catch (error) {
      log("Error checking progress: " + error.message);
    }
  };

  // Worksheet click handler
  const handleWorksheetClick = () => {
    log("Worksheet button clicked, navigating to worksheet");
    navigate(worksheetPath);
  };

  // Quiz click handler
  const handleQuizClick = () => {
    log("Quiz button clicked, navigating to quiz");
    navigate(quizPath);
  };

  // Update points in backend when they change
  useEffect(() => {
    const updateBackend = async () => {
      if (!userProgress || !isAuthenticated || savingPoints) return;

      // Get current lesson data
      const currentLesson =
        userProgress.courses?.[courseKey]?.lessons?.[lessonNumber];
      if (!currentLesson) return;

      // Check if points have changed
      const videoPointsChanged =
        pointsEarned.video !== (currentLesson.activities?.video?.earned || 0);
      const videoProgressChanged =
        videoWatched !== (currentLesson.activities?.video?.percentWatched || 0);

      // Only check worksheet changes if there's a worksheet
      const worksheetPointsChanged = hasWorksheet
        ? pointsEarned.worksheet !==
          (currentLesson.activities?.worksheet?.earned || 0)
        : false;
      const worksheetCompletionChanged = hasWorksheet
        ? worksheetCompleted !==
          (currentLesson.activities?.worksheet?.completed || false)
        : false;

      // Only check quiz changes if there's a quiz
      const quizPointsChanged = hasQuiz
        ? pointsEarned.quiz !== (currentLesson.activities?.quiz?.earned || 0)
        : false;
      const quizCompletionChanged = hasQuiz
        ? quizCompleted !== (currentLesson.activities?.quiz?.completed || false)
        : false;

      const hasChanges =
        videoPointsChanged ||
        worksheetPointsChanged ||
        quizPointsChanged ||
        videoProgressChanged ||
        worksheetCompletionChanged ||
        quizCompletionChanged;

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
            updatedProgress.courses[courseKey].lessons[lessonNumber] = {
              activities: {},
            };
          }

          if (
            !updatedProgress.courses[courseKey].lessons[lessonNumber].activities
          ) {
            updatedProgress.courses[courseKey].lessons[
              lessonNumber
            ].activities = {};
          }

          // Ensure video activity exists
          if (
            !updatedProgress.courses[courseKey].lessons[lessonNumber].activities
              .video
          ) {
            updatedProgress.courses[courseKey].lessons[
              lessonNumber
            ].activities.video = {};
          }

          // Ensure worksheet activity exists if there's a worksheet
          if (
            hasWorksheet &&
            !updatedProgress.courses[courseKey].lessons[lessonNumber].activities
              .worksheet
          ) {
            updatedProgress.courses[courseKey].lessons[
              lessonNumber
            ].activities.worksheet = {};
          }

          // Ensure quiz activity exists if there's a quiz
          if (
            hasQuiz &&
            !updatedProgress.courses[courseKey].lessons[lessonNumber].activities
              .quiz
          ) {
            updatedProgress.courses[courseKey].lessons[
              lessonNumber
            ].activities.quiz = {};
          }

          // Update video progress
          updatedProgress.courses[courseKey].lessons[
            lessonNumber
          ].activities.video.percentWatched = videoWatched;
          updatedProgress.courses[courseKey].lessons[
            lessonNumber
          ].activities.video.earned = pointsEarned.video;
          updatedProgress.courses[courseKey].lessons[
            lessonNumber
          ].activities.video.completed = videoWatched >= completionThreshold;

          // Update worksheet progress if there's a worksheet
          if (hasWorksheet) {
            updatedProgress.courses[courseKey].lessons[
              lessonNumber
            ].activities.worksheet.completed = worksheetCompleted;
            updatedProgress.courses[courseKey].lessons[
              lessonNumber
            ].activities.worksheet.earned = pointsEarned.worksheet;
          }

          // Update quiz progress if there's a quiz
          if (hasQuiz) {
            updatedProgress.courses[courseKey].lessons[
              lessonNumber
            ].activities.quiz.completed = quizCompleted;
            updatedProgress.courses[courseKey].lessons[
              lessonNumber
            ].activities.quiz.earned = pointsEarned.quiz;
          }

          // Calculate total points for this lesson
          const lessonTotalPoints =
            pointsEarned.video +
            (hasWorksheet ? pointsEarned.worksheet : 0) +
            (hasQuiz ? pointsEarned.quiz : 0);

          // Update lesson points
          updatedProgress.courses[courseKey].lessons[
            lessonNumber
          ].lessonPoints = lessonTotalPoints;

          // Check if lesson is completed
          const isVideoComplete = videoWatched >= completionThreshold;
          const isWorksheetComplete = !hasWorksheet || worksheetCompleted;
          const isQuizComplete = !hasQuiz || quizCompleted;

          const isLessonComplete =
            isVideoComplete && isWorksheetComplete && isQuizComplete;
          updatedProgress.courses[courseKey].lessons[lessonNumber].completed =
            isLessonComplete;

          // Recalculate course points
          let coursePoints = 0;
          Object.values(updatedProgress.courses[courseKey].lessons).forEach(
            (lesson) => {
              coursePoints += lesson.lessonPoints || 0;
            }
          );
          updatedProgress.courses[courseKey].coursePoints = coursePoints;

          // Check if course is completed
          const allLessonsCompleted = Object.values(
            updatedProgress.courses[courseKey].lessons
          ).every((lesson) => lesson.completed);
          updatedProgress.courses[courseKey].completed = allLessonsCompleted;

          // Recalculate total points
          let totalPoints = 0;
          Object.values(updatedProgress.courses).forEach((course) => {
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
  }, [
    pointsEarned,
    videoWatched,
    worksheetCompleted,
    quizCompleted,
    userProgress,
    isAuthenticated,
    savingPoints,
    courseKey,
    lessonNumber,
    hasWorksheet,
    hasQuiz,
    completionThreshold,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current) {
        clearTimeout(statusTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      console.log("Component unmounting, cleaning up BPQ timeouts");
      clearAllBpqTimeouts();
      setQuestionsScheduled(false);
    };
  }, []); 

  // Reset BPQ state when video URL changes
  useEffect(() => {
    console.log("Video URL changed, resetting BPQ state");
    setQuestionsShown(new Set());
    setCurrentQuestionIndex(0);
    setShowQuestion(false);
    setAnswer("");
  }, [videoUrl]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <HeroOther overlayText={lessonTitle} />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading lesson content...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Extract YouTube video ID from URL if needed
  const getYoutubeId = (url) => {
    if (!url.includes("youtube.com/") && !url.includes("youtu.be/")) {
      // Already an ID
      return url;
    }

    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYoutubeId(videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`;

  // Calculate total possible points
  const totalPossiblePoints =
    maxVideoPoints +
    (hasWorksheet ? worksheetPoints : 0) +
    (hasQuiz ? quizPoints : 0);

  return (
    <div>
      <Navbar />
      <HeroOther overlayText={lessonTitle} />

      {/* Status message notification */}
      {statusMessage && (
        <div
          className="status-notification"
          style={{
            position: "fixed",
            top: "150px",
            right: "20px",
            padding: "10px 15px",
            backgroundColor: statusMessage.includes("Error")
              ? "rgba(231, 76, 60, 0.8)"
              : "#357717",
            color: "white",
            borderRadius: "5px",
            fontWeight: "bold",
            zIndex: 1000,
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            animation: "fadeIn 0.3s ease-out",
            fontSize: "16px",
          }}
        >
          {statusMessage}
        </div>
      )}

      {showQuestion && currentQuestionIndex < bpqQuestions.length && (
        <div
          className="question-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="question-box"
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "10px",
              maxWidth: "500px",
              width: "90%",
              textAlign: "center",
            }}
          >
            <h3>Question {currentQuestionIndex + 1}</h3>
            <p style={{ fontSize: "18px", marginBottom: "20px" }}>
              {bpqQuestions[currentQuestionIndex]?.text ||
                "Question not available"}
            </p>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              style={{
                width: "100%",
                minHeight: "100px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginBottom: "20px",
                resize: "vertical",
              }}
            />
            <button onClick={handleAnswerSubmit}>Submit & Continue</button>
          </div>
        </div>
      )}

      {/* Progress display - show for both versions */}
      <div className="points-status">
        <div className="points-row">
          <span className="points-label">Video progress:</span>
          <span className="points-value">{videoWatched}%</span>
          <span className="points-earned">({pointsEarned.video} points)</span>
        </div>

        {hasWorksheet && (
          <div className="points-row">
            <span className="points-label">Worksheet:</span>
            <span className="points-value">
              {worksheetCompleted ? "Completed" : "Not completed"}
            </span>
            <span className="points-earned">
              ({pointsEarned.worksheet} points)
            </span>
          </div>
        )}

        {hasQuiz && (
          <div className="points-row">
            <span className="points-label">Quiz:</span>
            <span className="points-value">
              {quizCompleted ? "Completed" : "Not completed"}
            </span>
            <span className="points-earned">({pointsEarned.quiz} points)</span>
          </div>
        )}

        <div className="points-row total">
          <span className="points-label">Total lesson points:</span>
          <span className="points-value">
            {pointsEarned.video +
              (hasWorksheet ? pointsEarned.worksheet : 0) +
              (hasQuiz ? pointsEarned.quiz : 0)}{" "}
            out of {totalPossiblePoints}
          </span>
        </div>
      </div>

      <div className="vidbig">
        <div id="youtube-player-container">
          <iframe
            id="youtube-player"
            className="astrovid"
            width="700"
            height="480"
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="centered-container">
        {slideshowUrl && (
          <Link to={slideshowUrl} target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
        )}

        {hasWorksheet && (
          <button className="course-button" onClick={handleWorksheetClick}>
            Worksheet
          </button>
        )}

        {hasQuiz && (
          <button className="course-button" onClick={handleQuizClick}>
            Quiz
          </button>
        )}

        {notesUrl && (
          <Link to={notesUrl} target="_blank" rel="noopener noreferrer">
            <button className="course-button">{notesLabel}</button>
          </Link>
        )}
      </div>
      

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
      `}</style>

      <div style={{ paddingBottom: "200px" }} />
      <Footer />
    </div>
  );
};

export default VideoLessonPage;
