import React, { useState, useEffect, useRef } from "react";
import { Timer } from "lucide-react";
import stemzLearningLogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { call_api } from "../api";

const mathProblems = [
  [
    { top: 1, bottom: 5 },
    { top: 3, bottom: 8 },
    { top: 9, bottom: 7 },
    { top: 5, bottom: 2 },
    { top: 7, bottom: 7 },
    { top: 9, bottom: 5 },
    { top: 6, bottom: 4 },
    { top: 4, bottom: 5 },
    { top: 9, bottom: 4 },
    { top: 5, bottom: 9 },
  ],
  [
    { top: 2, bottom: 1 },
    { top: 8, bottom: 9 },
    { top: 1, bottom: 9 },
    { top: 8, bottom: 6 },
    { top: 9, bottom: 6 },
    { top: 1, bottom: 4 },
    { top: 8, bottom: 1 },
    { top: 8, bottom: 3 },
    { top: 7, bottom: 7 },
    { top: 6, bottom: 9 },
  ],
  [
    { top: 1, bottom: 8 },
    { top: 8, bottom: 4 },
    { top: 7, bottom: 3 },
    { top: 7, bottom: 5 },
    { top: 8, bottom: 8 },
    { top: 2, bottom: 9 },
    { top: 7, bottom: 7 },
    { top: 1, bottom: 6 },
    { top: 3, bottom: 9 },
    { top: 3, bottom: 9 },
  ],
  [
    { top: 8, bottom: 9 },
    { top: 1, bottom: 2 },
    { top: 5, bottom: 8 },
    { top: 9, bottom: 2 },
    { top: 4, bottom: 8 },
    { top: 7, bottom: 6 },
    { top: 4, bottom: 2 },
    { top: 6, bottom: 6 },
    { top: 2, bottom: 2 },
    { top: 8, bottom: 2 },
  ],
  [
    { top: 8, bottom: 1 },
    { top: 9, bottom: 1 },
    { top: 7, bottom: 6 },
    { top: 5, bottom: 6 },
    { top: 3, bottom: 3 },
    { top: 3, bottom: 4 },
    { top: 6, bottom: 8 },
    { top: 7, bottom: 8 },
    { top: 6, bottom: 1 },
    { top: 4, bottom: 3 },
  ],
  [
    { top: 8, bottom: 5 },
    { top: 6, bottom: 7 },
    { top: 6, bottom: 7 },
    { top: 3, bottom: 7 },
    { top: 7, bottom: 9 },
    { top: 6, bottom: 8 },
    { top: 3, bottom: 2 },
    { top: 8, bottom: 7 },
    { top: 9, bottom: 6 },
    { top: 4, bottom: 6 },
  ],
  [
    { top: 1, bottom: 1 },
    { top: 9, bottom: 8 },
    { top: 9, bottom: 3 },
    { top: 9, bottom: 5 },
    { top: 6, bottom: 5 },
    { top: 9, bottom: 7 },
    { top: 9, bottom: 8 },
    { top: 4, bottom: 7 },
    { top: 5, bottom: 1 },
    { top: 2, bottom: 4 },
  ],
  [
    { top: 1, bottom: 3 },
    { top: 2, bottom: 8 },
    { top: 7, bottom: 4 },
    { top: 6, bottom: 6 },
    { top: 2, bottom: 7 },
    { top: 9, bottom: 9 },
    { top: 6, bottom: 3 },
    { top: 7, bottom: 8 },
    { top: 7, bottom: 1 },
    { top: 3, bottom: 6 },
  ],
  [
    { top: 4, bottom: 4 },
    { top: 7, bottom: 9 },
    { top: 6, bottom: 2 },
    { top: 4, bottom: 9 },
    { top: 4, bottom: 1 },
    { top: 5, bottom: 4 },
    { top: 5, bottom: 3 },
    { top: 8, bottom: 8 },
    { top: 2, bottom: 6 },
    { top: 8, bottom: 7 },
  ],
  [
    { top: 5, bottom: 5 },
    { top: 1, bottom: 7 },
    { top: 3, bottom: 1 },
    { top: 8, bottom: 5 },
    { top: 2, bottom: 5 },
    { top: 7, bottom: 5 },
    { top: 6, bottom: 9 },
    { top: 5, bottom: 7 },
    { top: 2, bottom: 3 },
    { top: 3, bottom: 5 },
  ],
];

export default function PsychWorkSheet2() {
  // Navigation
  const navigate = useNavigate();

  // State variables
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ row: 0, col: 0 });
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hasAlerted, setHasAlerted] = useState(false);
  const [cellStyles, setCellStyles] = useState({});
  const [borders, setBorders] = useState({});
  const [wasStopped, setWasStopped] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [trialResults, setTrialResults] = useState([]);
  
  // Progress tracking states
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [worksheetCompleted, setWorksheetCompleted] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");

  // Constants for progress tracking
  const lessonNumber = "lesson2";
  const courseKey = "psychology";
  
  // Refs
  const inputRefs = useRef(
    Array(10)
      .fill()
      .map(() => Array(10).fill(React.createRef()))
  );
  const statusTimeoutRef = useRef(null);

  // Show status message with auto-fade
  const showStatus = (message, duration = 3000) => {
    setStatusMessage(message);
    if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
    statusTimeoutRef.current = setTimeout(() => setStatusMessage(""), duration);
  };

  useEffect(() => {
    inputRefs.current = Array(10)
      .fill()
      .map(() =>
        Array(10)
          .fill()
          .map(() => React.createRef())
      );
  }, []);

  // Token verification
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      
      try {
        const response = await call_api(null, "auth/verify", "POST");
        if (response && response.success) {
          setIsAuthenticated(true);
          setLoading(false);
        } else {
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
        const response = await call_api(null, "points", "GET");
        if (response) {
          setUserProgress(response);
          
          // Check if there's course data available
          if (response.courses && response.courses[courseKey]) {
            const lesson = response.courses[courseKey].lessons[lessonNumber];
            
            if (lesson && lesson.activities && lesson.activities.worksheet) {
              const savedCompleted = lesson.activities.worksheet.completed || false;
              const savedPoints = lesson.activities.worksheet.earned || 0;
              
              setWorksheetCompleted(savedCompleted);
              setPointsEarned(savedPoints);
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

  useEffect(() => {
    let intervalId;
    if (isTimerRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !hasAlerted) {
      setIsTimerRunning(false);
      setShowResults(true);
      setHasAlerted(true);
      alert("Time's up! Let's check your answers.");
      
      // Save trial results
      const correctCount = Object.keys(answers).filter(key => {
        const [rowIndex, colIndex] = key.split('-').map(Number);
        return checkAnswer(rowIndex, colIndex);
      }).length;
      
      const attemptedCount = Object.keys(answers).length;
      
      setTrialResults(prev => [
        ...prev, 
        {
          trialNumber: submissionCount + 1,
          attempted: attemptedCount,
          correct: correctCount
        }
      ]);
      
      setSubmissionCount(prevCount => prevCount + 1);
      
      // After two submissions, award points and mark as completed
      if (submissionCount + 1 >= 2) {
        handleWorksheetComplete();
      }
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning, timeLeft, hasAlerted, submissionCount, answers]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isTimerRunning) return;

      if (
        (e.key >= "0" && e.key <= "9") ||
        e.key === "Backspace" ||
        e.key === "Delete"
      ) {
        e.preventDefault();
        const key = `${currentPosition.row}-${currentPosition.col}`;
        let currentValue = answers[key] || "";

        if (e.key === "Backspace" || e.key === "Delete") {
          currentValue = currentValue.slice(0, -1);
        } else {
          if (currentValue.length < 3) {
            currentValue += e.key;
          }
        }

        setAnswers((prev) => ({
          ...prev,
          [key]: currentValue,
        }));

        if (currentValue.length === 3) {
          setCurrentPosition((prev) => {
            const nextCol = (prev.col + 1) % 10;
            const nextRow = nextCol === 0 ? (prev.row + 1) % 10 : prev.row;
            return { row: nextRow, col: nextCol };
          });
        }
        return;
      }

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setCurrentPosition((prev) => ({
            ...prev,
            row: prev.row > 0 ? prev.row - 1 : 9,
          }));
          break;
        case "ArrowDown":
          e.preventDefault();
          setCurrentPosition((prev) => ({
            ...prev,
            row: prev.row < 9 ? prev.row + 1 : 0,
          }));
          break;
        case "ArrowLeft":
          e.preventDefault();
          setCurrentPosition((prev) => ({
            ...prev,
            col: prev.col > 0 ? prev.col - 1 : 9,
          }));
          break;
        case "ArrowRight":
          e.preventDefault();
          setCurrentPosition((prev) => ({
            ...prev,
            col: prev.col < 9 ? prev.col + 1 : 0,
          }));
          break;
        case "Tab":
          e.preventDefault();
          setCurrentPosition((prev) => {
            const nextCol = (prev.col + 1) % 10;
            const nextRow = nextCol === 0 ? (prev.row + 1) % 10 : prev.row;
            return { row: nextRow, col: nextCol };
          });
          break;
        case "Enter":
          e.preventDefault();
          setCurrentPosition((prev) => ({
            ...prev,
            row: (prev.row + 1) % 10,
          }));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTimerRunning, currentPosition, answers]);

  const checkAnswer = (rowIndex, colIndex) => {
    const problem = mathProblems[rowIndex][colIndex];
    const key = `${rowIndex}-${colIndex}`;
    const userAnswer = parseInt(answers[key]);
    return userAnswer === problem.top * problem.bottom;
  };

  const handleInputChange = (rowIndex, colIndex, value) => {
    const key = `${rowIndex}-${colIndex}`;
    const numericValue = value.replace(/[^0-9]/g, "").slice(0, 3);
    setAnswers((prev) => ({
      ...prev,
      [key]: numericValue,
    }));
  };

  const handleInputFocus = (rowIndex, colIndex) => {
    setCurrentPosition({ row: rowIndex, col: colIndex });
  };

  const handleStartTimer = () => {
    if (!wasStopped) {
      setTimeLeft(60);
      setAnswers({});
      setBorders({});
      setHasAlerted(false);
    }
    setIsTimerRunning(true);
    setShowResults(false);
    setWasStopped(false);
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
    setWasStopped(true);
  };

  const handleSubmit = () => {
    setShowResults(true);
    setIsTimerRunning(false);
    
    // Count correct answers
    const correctCount = Object.keys(answers).filter(key => {
      const [rowIndex, colIndex] = key.split('-').map(Number);
      return checkAnswer(rowIndex, colIndex);
    }).length;
    
    const attemptedCount = Object.keys(answers).length;
    
    // Save trial results
    setTrialResults(prev => [
      ...prev, 
      {
        trialNumber: submissionCount + 1,
        attempted: attemptedCount,
        correct: correctCount
      }
    ]);
    
    setSubmissionCount(prevCount => prevCount + 1);

    const newBorders = {};
    mathProblems.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        const key = `${rowIndex}-${colIndex}`;
        if (answers[key] !== undefined) {
          if (checkAnswer(rowIndex, colIndex)) {
            newBorders[key] = {
              backgroundColor: "#e8f5e9",
              border: "1px solid #3cb371",
            };
          } else {
            newBorders[key] = {
              backgroundColor: "#ffebee",
              border: "1px solid #CF3434",
            };
          }
        }
      });
    });
    setBorders(newBorders);
    
    // After two submissions, award points and mark as completed
    if (submissionCount + 1 >= 2) {
      handleWorksheetComplete();
    }
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setTimeLeft(60);
    setIsTimerRunning(false);
    setCurrentPosition({ row: 0, col: 0 });
    setHasAlerted(false);
    setBorders({});
    setWasStopped(false);
    // Don't reset trial results or submission count when resetting for a new trial
  };

  const handlePrintVersion = () => {
    window.open(
      "https://docs.google.com/document/d/e/2PACX-1vT30fBA4j8N4aLyMyy3e0yIij_fYl9GdOqtOqvzaq3GH2E--OhIRK8M7kR0X3XqEuJGkWhTcKvSU8Cu/pub",
      "_blank"
    );
  };

  const handleGoBack = () => {
    window.history.back();
  };
  
  // Mark worksheet as completed and award full points
  const handleWorksheetComplete = () => {
    // Award full points (5 points) after two submissions
    const earnedPoints = 5;
    
    // Mark as completed
    setWorksheetCompleted(true);
    setPointsEarned(earnedPoints);
    
    // Update the backend
    const updatedProgress = { ...userProgress };
    
    // Ensure the path exists
    if (!updatedProgress.courses) updatedProgress.courses = {};
    if (!updatedProgress.courses[courseKey]) {
      updatedProgress.courses[courseKey] = { lessons: {}, title: "Psychology" };
    }
    if (!updatedProgress.courses[courseKey].lessons) {
      updatedProgress.courses[courseKey].lessons = {};
    }
    if (!updatedProgress.courses[courseKey].lessons[lessonNumber]) {
      updatedProgress.courses[courseKey].lessons[lessonNumber] = { 
        activities: {},
        title: "The Math Experiment"
      };
    }
    if (!updatedProgress.courses[courseKey].lessons[lessonNumber].activities) {
      updatedProgress.courses[courseKey].lessons[lessonNumber].activities = {};
    }
    
    // Set worksheet data
    updatedProgress.courses[courseKey].lessons[lessonNumber].activities.worksheet = {
      completed: true,
      earned: earnedPoints,
      points: 5, // Total possible points is 5
      type: "worksheet",
      title: "The Math Experiment"
    };
    
    // Update lesson points
    updatedProgress.courses[courseKey].lessons[lessonNumber].lessonPoints = earnedPoints;
    
    // Mark lesson as completed if video is also completed
    if (updatedProgress.courses[courseKey].lessons[lessonNumber].activities.video?.completed) {
      updatedProgress.courses[courseKey].lessons[lessonNumber].completed = true;
    }
    
    // Update course points
    let coursePoints = 0;
    Object.values(updatedProgress.courses[courseKey].lessons).forEach(lesson => {
      coursePoints += lesson.lessonPoints || 0;
    });
    updatedProgress.courses[courseKey].coursePoints = coursePoints;
    
    // Update total points
    let totalPoints = 0;
    Object.values(updatedProgress.courses).forEach(course => {
      totalPoints += course.coursePoints || 0;
    });
    updatedProgress.totalPoints = totalPoints;
    
    // Send to API
    call_api(updatedProgress, "points", "POST")
      .then(response => {
        if (response) {
          setUserProgress(updatedProgress);
          showStatus("✓ Experiment completed! You've earned full points!", 3000);
        }
      })
      .catch(error => {
        console.error("Update error:", error);
        showStatus("❌ Error saving progress", 3000);
      });
  };

  // Loading screen
  if (loading) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        background: "white", 
        margin: 0, 
        padding: "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #357717",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            animation: "spin 2s linear infinite",
            margin: "0 auto 20px"
          }}></div>
          <p>Loading worksheet content...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "white",
      margin: "0",
      padding: "32px",
      fontFamily: "Arial, sans-serif",
      position: "relative",
    }}>
      {/* Status message */}
      {statusMessage && (
        <div style={{
          position: "fixed",
          top: "150px",
          right: "20px",
          padding: "10px 15px",
          backgroundColor: statusMessage.includes("Error") ? "rgba(231, 76, 60, 0.8)" : "#357717",
          color: "white",
          borderRadius: "5px",
          fontWeight: "bold",
          zIndex: 1000,
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          animation: "fadeIn 0.3s ease-out",
          fontSize: "16px",
        }}>
          {statusMessage}
        </div>
      )}

      {/* Back button */}
      <button onClick={handleGoBack} style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        color: "white",
        border: "none",
        borderRadius: "50%",
        background: isHovering ? "#3cb371" : "#357717",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.3s ease",
        fontSize: "36px",
        fontWeight: "bold",
        transform: isHovering ? "scale(0.9)" : "scale(1)",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}>
        &#8592;
      </button>

      <div style={{ maxWidth: "896px", margin: "0 auto" }}>
        {/* Header */}
        <img 
          src={stemzLearningLogo} 
          alt="STEMZ Learning" 
          style={{
            maxWidth: "300px", 
            display: "block", 
            margin: "0 auto 30px"
          }} 
        />
        <h1 style={{
          color: "#254E17",
          fontSize: "48px",
          marginBottom: "10px",
          fontFamily: "Orbitron, sans-serif",
          textAlign: "center",
        }}>
          The Math Experiment
        </h1>
        <h2 style={{
          color: "#357717",
          fontSize: "36px",
          marginBottom: "30px",
          fontFamily: "Orbitron, sans-serif",
          textAlign: "center",
        }}>
          Psychology: Lesson 2
        </h2>

        {/* Progress status */}
        <div style={{
          marginBottom: "20px",
          padding: "10px 15px",
          borderRadius: "5px",
          backgroundColor: "#f0f0f0",
          textAlign: "center",
          borderLeft: worksheetCompleted ? "4px solid #3cb371" : "4px solid #ccc"
        }}>
          <span style={{
            fontWeight: "bold",
            marginRight: "15px",
            color: "#333333",
          }}>
            Worksheet:
          </span>
          <span style={{
            color: worksheetCompleted ? "#3cb371" : "#666666",
            fontWeight: worksheetCompleted ? "bold" : "normal",
          }}>
            {worksheetCompleted ? "Completed" : "Not Completed"}
          </span>
          <span style={{
            marginLeft: "15px",
            color: "#555555",
          }}>
            ({pointsEarned} {pointsEarned === 1 ? "point" : "points"})
          </span>
        </div>

        {/* Instructions */}
        <div style={{
          marginBottom: "30px",
          lineHeight: "1.6",
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ marginTop: 0 }}>Instructions:</h3>

          <p>
            <strong>
              Option 1: On the worksheet below, complete as many multiplication
              problems as you can within the 60-second time limit while
              following the video's instructions!
            </strong>
          </p>
          <p>For this psychology experiment, you'll need to complete two trials. <strong>You'll get full points after completing both trials</strong>, regardless of how many problems you solve correctly.</p>
          <p>You can use:</p>
          <ul>
            <li>
              <span style={{
                display: "inline-block",
                padding: "2px 8px",
                backgroundColor: "#eee",
                border: "1px solid #ccc",
                borderRadius: "3px",
                margin: "0 3px",
                fontSize: "12px"
              }}> ↑ </span>
              <span style={{
                display: "inline-block",
                padding: "2px 8px",
                backgroundColor: "#eee",
                border: "1px solid #ccc",
                borderRadius: "3px",
                margin: "0 3px",
                fontSize: "12px"
              }}> ↓ </span>
              <span style={{
                display: "inline-block",
                padding: "2px 8px",
                backgroundColor: "#eee",
                border: "1px solid #ccc",
                borderRadius: "3px",
                margin: "0 3px",
                fontSize: "12px"
              }}> ← </span>
              <span style={{
                display: "inline-block",
                padding: "2px 8px",
                backgroundColor: "#eee",
                border: "1px solid #ccc",
                borderRadius: "3px",
                margin: "0 3px",
                fontSize: "12px"
              }}> → </span>
              Arrow keys to navigate between boxes
            </li>
            <li>
              <span style={{
                display: "inline-block",
                padding: "2px 8px",
                backgroundColor: "#eee",
                border: "1px solid #ccc",
                borderRadius: "3px",
                margin: "0 3px",
                fontSize: "12px"
              }}>Tab</span>
              Move to next box
            </li>
            <li>
              <span style={{
                display: "inline-block",
                padding: "2px 8px",
                backgroundColor: "#eee",
                border: "1px solid #ccc",
                borderRadius: "3px",
                margin: "0 3px",
                fontSize: "12px"
              }}>Enter</span>
              Move to the box below
            </li>
            <li>
              <span style={{
                display: "inline-block",
                padding: "2px 8px",
                backgroundColor: "#eee",
                border: "1px solid #ccc",
                borderRadius: "3px",
                margin: "0 3px",
                fontSize: "12px"
              }}>0</span>-
              <span style={{
                display: "inline-block",
                padding: "2px 8px",
                backgroundColor: "#eee",
                border: "1px solid #ccc",
                borderRadius: "3px",
                margin: "0 3px",
                fontSize: "12px"
              }}>9 </span>
              to type numbers directly into the selected box
            </li>
            <li>
              <span style={{
                display: "inline-block",
                padding: "2px 8px",
                backgroundColor: "#eee",
                border: "1px solid #ccc",
                borderRadius: "3px",
                margin: "0 3px",
                fontSize: "12px"
              }}>Backspace </span>
              to delete the last number
            </li>
          </ul>

          <p>
            <strong>
              Option 2: Prefer a paper copy? Download the printable version
              below, set the timer and go!
            </strong>
          </p>
          <p>Remember to complete the experiment twice either way to get full points.</p>

          <button 
            onClick={handlePrintVersion} 
            style={{
              backgroundColor: "#357717",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              display: "block",
              margin: "20px auto",
              fontSize: "14px",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Print Paper Version
          </button>
        </div>
        
        {/* Submission counter */}
        <div style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "16px",
          color: submissionCount >= 2 ? "#3cb371" : "#333"
        }}>
          <strong>Trial count:</strong> {submissionCount} of 2
          {submissionCount >= 2 && !worksheetCompleted && (
            <span style={{ color: "#3cb371", marginLeft: "10px" }}>
              ✓ You've completed enough trials!
            </span>
          )}
          
          {/* Display results from previous trials */}
          {trialResults.length > 0 && (
            <div style={{
              marginTop: "15px",
              padding: "10px",
              backgroundColor: "#f9f9f9",
              borderRadius: "5px",
              display: "inline-block"
            }}>
              <h4 style={{ marginTop: 0, marginBottom: "10px" }}>Trial Results Comparison:</h4>
              <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
                {trialResults.map((result, index) => (
                  <div key={index} style={{ textAlign: "center" }}>
                    <strong>Trial {result.trialNumber}:</strong>
                    <div>Attempted: {result.attempted}</div>
                    <div style={{ color: "#3cb371" }}>Correct: {result.correct}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Timer */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "20px",
        }}>
          <Timer size={24} color="#254E17" />
          <span style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: timeLeft <= 10 ? "#CF3434" : "#254E17",
          }}>
            {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </span>
          <div style={{
            display: "flex",
            gap: "10px",
          }}>
            <button
              onClick={handleStartTimer}
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: isTimerRunning ? "default" : "pointer",
                transition: "all 0.3s ease",
                backgroundColor: isTimerRunning ? "#cccccc" : "#3cb371",
              }}
              disabled={isTimerRunning}
            >
              Start
            </button>
            <button
              onClick={handleStopTimer}
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: isTimerRunning ? "pointer" : "default",
                transition: "all 0.3s ease",
                backgroundColor: isTimerRunning ? "#CF3434" : "#cccccc",
              }}
              disabled={!isTimerRunning}
            >
              Stop
            </button>
          </div>
        </div>

        {/* Math problems grid */}
        {mathProblems.map((row, rowIndex) => (
          <div key={rowIndex} style={{
            display: "grid",
            gridTemplateColumns: "repeat(10, 1fr)",
            gap: "15px",
            marginBottom: "30px",
          }}>
            {row.map((problem, colIndex) => {
              const key = `${rowIndex}-${colIndex}`;
              const isCurrent =
                currentPosition.row === rowIndex &&
                currentPosition.col === colIndex;

              return (
                <div
                  key={colIndex}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "10px",
                    backgroundColor: "#f9f9f9",
                    ...(borders[key] || {}),
                    ...(isCurrent && isTimerRunning ? {
                      boxShadow: "0 0 0 2px #3cb371"
                    } : {}),
                  }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}>
                    <span style={{
                      fontSize: "18px",
                      marginRight: "5px",
                    }}>{problem.top}</span>
                    <span style={{
                      fontSize: "18px",
                      marginRight: "5px",
                    }}>×</span>
                    <span style={{
                      fontSize: "18px",
                      marginRight: "5px",
                    }}>{problem.bottom}</span>
                    <span style={{
                      fontSize: "18px",
                      marginRight: "5px",
                    }}>=</span>
                  </div>
                  <input
                    ref={inputRefs.current[rowIndex][colIndex]}
                    type="text"
                    value={answers[key] || ""}
                    onChange={(e) =>
                      handleInputChange(rowIndex, colIndex, e.target.value)
                    }
                    onFocus={() => handleInputFocus(rowIndex, colIndex)}
                    style={{
                      width: "50px",
                      padding: "5px",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                    disabled={!isTimerRunning}
                  />
                </div>
              );
            })}
          </div>
        ))}

        {/* Buttons */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "30px",
          marginBottom: "30px"
        }}>
          <button
            onClick={handleSubmit}
            style={{
              padding: "12px 25px",
              fontSize: "16px",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              backgroundColor: "#3cb371",
            }}
          >
            Check Answers
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: "12px 25px",
              fontSize: "16px",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              backgroundColor: "#CF3434",
            }}
          >
            Reset
          </button>
        </div>
        
        {/* Results and experiment status */}
        {showResults && (
          <div style={{
            marginTop: "30px",
            textAlign: "center",
            padding: "15px",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            marginBottom: "30px"
          }}>
            <h3>Trial {submissionCount} Results:</h3>
            <p>
              You attempted to solve {Object.keys(answers).length} problems.
            </p>
            <p>
              {Object.keys(answers).length > 0 ? (
                <>
                  You got {
                    Object.keys(answers).filter(key => {
                      const [rowIndex, colIndex] = key.split('-').map(Number);
                      return checkAnswer(rowIndex, colIndex);
                    }).length
                  } correct!
                </>
              ) : (
                "You didn't answer any problems this round."
              )}
            </p>
            {submissionCount < 2 ? (
              <p style={{ fontWeight: "bold" }}>
                Please complete one more trial to finish the experiment.
              </p>
            ) : (
              <div>
                <p style={{ color: "#3cb371", fontWeight: "bold" }}>
                  ✓ You've completed both trials for this experiment!
                </p>
                {!worksheetCompleted && (
                  <button
                    onClick={handleWorksheetComplete}
                    style={{
                      backgroundColor: "#3cb371",
                      color: "white",
                      padding: "12px 25px",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                      display: "block",
                      margin: "20px auto",
                      fontSize: "16px",
                      fontWeight: "bold",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    Complete Experiment & Earn Points
                  </button>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Completion message */}
        {worksheetCompleted && (
          <div style={{
            marginTop: "20px",
            marginBottom: "40px",
            textAlign: "center",
            padding: "15px",
            backgroundColor: "#e8f5e9",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
          }}>
            <p style={{
              color: "#3cb371",
              fontSize: "18px",
              fontWeight: "bold"
            }}>
              Experiment completed! You've earned all 5 points.
            </p>
          </div>
        )}
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
    </div>
  );
}