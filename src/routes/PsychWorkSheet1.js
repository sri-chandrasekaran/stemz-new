import React, { useState, useRef, useEffect } from "react";
import stemzLearningLogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { call_api } from "../api";

// Configuration data
const terms = [
  { id: 'question', term: 'Question' },
  { id: 'hypothesis', term: 'Hypothesis' },
  { id: 'experiment', term: 'Experiment' },
  { id: 'analyze', term: 'Analyze' },
  { id: 'reflect', term: 'Reflect' },
];

const definitions = [
  { id: 'def1', text: 'Both teams will pick the "2 candies per person" card.' },
  { id: 'def2', text: 'My hypothesis was correct because I picked the "2 candies per person" card.' },
  { id: 'def3', text: 'Which card will both teams pick?' },
  { id: 'def4', text: 'Choosing either the "1 candy per person" card or the "2 candies per person" card and determining whether both teams get candy or just one.' },
  { id: 'def5', text: 'You picked one card over the other because you thought it would benefit you more than the other.' },
];

const correctMatches = {
  'question': 'def3',
  'hypothesis': 'def1',
  'experiment': 'def4',
  'analyze': 'def2',
  'reflect': 'def5',
};

const colors = ["#FFCB6B", "#CCBADA", "#45B7D1", "#FFA07A", "#98D8C8"];

export default function PsychWorkSheet1() {
  // Navigation
  const navigate = useNavigate();

  // State variables
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [clickedTerms, setClickedTerms] = useState({});
  const [isHovering, setIsHovering] = useState(false);

  // Progress tracking states
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [worksheetCompleted, setWorksheetCompleted] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [savingPoints, setSavingPoints] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Constants for progress tracking
  const lessonNumber = "lesson1";
  const courseKey = "psychology";

  // Refs
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const termsRef = useRef({});
  const defsRef = useRef({});
  const statusTimeoutRef = useRef(null);

  // Show status message with auto-fade
  const showStatus = (message, duration = 3000) => {
    setStatusMessage(message);
    if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
    statusTimeoutRef.current = setTimeout(() => setStatusMessage(""), duration);
  };

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

  // Helper functions
  const getTermForDefinition = (defId) => {
    return Object.entries(matches).find(([_, value]) => value === defId)?.[0];
  };

  const isDefinitionMatched = (defId) => {
    return Object.values(matches).some(matchedDefId => matchedDefId === defId);
  };

  const isAllCorrect = () => {
    if (Object.keys(matches).length !== terms.length) return false;
    return Object.keys(matches).every(termId => correctMatches[termId] === matches[termId]);
  };

  const handleTermClick = (termId) => {
    setSelectedTerm(termId);
    setClickedTerms(prev => ({ ...prev, [termId]: true }));
  };

  const handleDefinitionClick = (defId) => {
    if (!selectedTerm) return;
    if (matches[selectedTerm] === defId) return;
    if (isDefinitionMatched(defId) && getTermForDefinition(defId) !== selectedTerm) return;

    setMatches(prev => ({
      ...prev,
      [selectedTerm]: defId,
    }));
  };

  // Check answers and award partial credit
  const checkAnswers = () => {
    setShowResults(true);
    
    // First check if all terms are matched
    if (Object.keys(matches).length !== terms.length) return;
    
    // Count correct matches
    let correctCount = 0;
    Object.keys(matches).forEach(termId => {
      if (correctMatches[termId] === matches[termId]) {
        correctCount++;
      }
    });
    
    // Award points based on correct answers (1 point per correct answer)
    const earnedPoints = correctCount;
    
    // Always mark as completed with partial credit
    setWorksheetCompleted(true);
    setPointsEarned(earnedPoints);
    
    // Update the backend
    setTimeout(() => {
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
          title: "Psychology & Scientific Method"
        };
      }
      if (!updatedProgress.courses[courseKey].lessons[lessonNumber].activities) {
        updatedProgress.courses[courseKey].lessons[lessonNumber].activities = {};
      }
      
      // Set worksheet data
      updatedProgress.courses[courseKey].lessons[lessonNumber].activities.worksheet = {
        completed: true,
        earned: earnedPoints,
        points: terms.length,
        type: "worksheet",
        title: "Turning the Game into an Experiment"
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
            showStatus("✓ Progress saved!", 3000);
          }
        })
        .catch(error => {
          console.error("Update error:", error);
          showStatus("❌ Error saving progress", 3000);
        });
    }, 500);
  };

  const resetQuiz = () => {
    setMatches({});
    setShowResults(false);
    setSelectedTerm(null);
    setClickedTerms({});
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  // Draw the connection lines
  const drawLines = () => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Object.entries(matches).forEach(([termId, defId]) => {
      const termElement = termsRef.current[termId];
      const defElement = defsRef.current[defId];
      if (termElement && defElement) {
        const termRect = termElement.getBoundingClientRect();
        const defRect = defElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const startX = termRect.right - containerRect.left;
        const startY = termRect.top + termRect.height / 2 - containerRect.top;
        const endX = defRect.left - containerRect.left;
        const endY = defRect.top + defRect.height / 2 - containerRect.top;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = colors[terms.findIndex((t) => t.id === termId)];
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  };

  // Setup resize handler
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (canvasRef.current && containerRef.current) drawLines();
    });
    return () => window.removeEventListener("resize", drawLines);
  }, []);

  // Redraw lines when matches change
  useEffect(() => {
    const timer = setTimeout(() => drawLines(), 200);
    return () => clearTimeout(timer);
  }, [matches, showResults]);

  // Styling for items
  const getItemStyle = (id, isDefinition = false) => {
    if (showResults) {
      if (isDefinition) {
        const matchedTerm = Object.keys(matches).find(term => matches[term] === id);
        return matchedTerm && correctMatches[matchedTerm] === id
          ? { backgroundColor: "#3cb371", color: "#ffffff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }
          : { backgroundColor: "#CF3434", color: "#ffffff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" };
      } else {
        return matches[id] === correctMatches[id] 
          ? { backgroundColor: "#3cb371", color: "#ffffff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" } 
          : { backgroundColor: "#CF3434", color: "#ffffff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" };
      }
    }
    if (isDefinition) {
      const matchedTerm = getTermForDefinition(id);
      if (matchedTerm) {
        const isCurrentSelectedTerm = matchedTerm === selectedTerm;
        return {
          backgroundColor: colors[terms.findIndex(t => t.id === matchedTerm)],
          color: "#ffffff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          cursor: isCurrentSelectedTerm ? "pointer" : "not-allowed",
          opacity: isCurrentSelectedTerm ? "1" : "0.9"
        };
      }
      return {
        backgroundColor: "#f0f0f0",
        color: "#333333",
        border: "1px solid #cccccc",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        cursor: "pointer"
      };
    } else {
      return clickedTerms[id]
        ? { 
            backgroundColor: colors[terms.findIndex(t => t.id === id)],
            color: "#ffffff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            border: "2px solid #333333"
          } 
        : { backgroundColor: "#f0f0f0", color: "#333333", border: "1px solid #cccccc", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" };
    }
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
          Turning the Game into an Experiment
        </h1>
        <h2 style={{
          color: "#357717",
          fontSize: "36px",
          marginBottom: "30px",
          fontFamily: "Orbitron, sans-serif",
          textAlign: "center",
        }}>
          Psychology: Lesson 1
        </h2>

        {/* Main container */}
        <div ref={containerRef} style={{
          position: "relative",
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          padding: "20px",
        }}>
          {/* Progress status inside main container */}
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
            lineHeight: "1.6",
            backgroundColor: "#f5f5f5",
            padding: "15px",
            borderRadius: "5px",
            marginBottom: "20px",
          }}>
            <h3 style={{ color: "#333333", marginTop: 0 }}>Instructions:</h3>
            <p style={{ margin: 0 }}>
              The game we played was fun, but how can psychologists use it to conduct an experiment? 
              Match each scientific method step with its correct example.
            </p>
          </div>

          {/* Terms and definitions */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}>
            {/* Steps column */}
            <div style={{ width: "45%", paddingLeft: "20px" }}>
              <h3 style={{ color: "#333333", marginBottom: "15px" }}>
                Steps
              </h3>
              {terms.map((term) => (
                <div
                  key={term.id}
                  ref={(el) => (termsRef.current[term.id] = el)}
                  onClick={() => handleTermClick(term.id)}
                  style={{
                    padding: "12px 15px",
                    margin: "10px 0",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontWeight: "bold",
                    ...getItemStyle(term.id),
                  }}
                >
                  {term.term}
                </div>
              ))}
            </div>

            {/* Examples column */}
            <div style={{ width: "45%" }}>
              <h3 style={{ color: "#333333", marginBottom: "15px" }}>
                Examples
              </h3>
              {definitions.map((def) => (
                <div
                  key={def.id}
                  ref={(el) => (defsRef.current[def.id] = el)}
                  onClick={() => handleDefinitionClick(def.id)}
                  style={{
                    padding: "12px 15px",
                    margin: "10px 0",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    ...getItemStyle(def.id, true),
                  }}
                >
                  {def.text}
                </div>
              ))}
            </div>
          </div>

          {/* Canvas for drawing lines */}
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          />

          {/* Buttons */}
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button
              onClick={checkAnswers}
              style={{
                padding: "12px 25px",
                fontSize: "16px",
                backgroundColor: "#3cb371",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "15px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
              }}
            >
              Check Answers
            </button>
            <button
              onClick={resetQuiz}
              style={{
                padding: "12px 25px",
                fontSize: "16px",
                backgroundColor: "#CF3434",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
              }}
            >
              Reset Quiz
            </button>
          </div>

          {/* Results message */}
          {showResults && (
            <div
              style={{
                marginTop: "30px",
                textAlign: "center",
                padding: "15px",
                backgroundColor: isAllCorrect() ? "#e8f5e9" : "#ffebee",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <p
                style={{
                  color: isAllCorrect() ? "#3cb371" : "#CF3434",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {isAllCorrect()
                  ? `Congratulations! All answers are correct.`
                  : Object.keys(matches).length < terms.length
                  ? "Please match all items before checking answers."
                  : "Some answers are incorrect or missing. Review and try again for full points!"}
              </p>
            </div>
          )}
        </div>
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