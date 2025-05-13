import React, { useState, useRef, useEffect } from "react";
import stemzLearningLogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { call_api } from "../api";

// Original Worksheet
// https://docs.google.com/document/d/e/2PACX-1vRUirVOL8YLkxol0nTrImCblQ0sB-Xu2LbLwvxLluYWSEPicxO7NpKWZ8avM_bjvTNsYJUGGffU_w8m/pub
const scavengerItems = [
  { id: 'flower', name: 'Flower', image: '🌻🌷' },
  { id: 'squirrel', name: 'Squirrel', image: '🐿️🐿️' },
  { id: 'clover', name: 'Clover', image: '☘️🍀' },
  { id: 'bird', name: 'Bird', image: '🐦‍⬛🐦' },
  { id: 'pinecone', name: 'Pinecone', image: '🌲🌰' },
  { id: 'bee', name: 'Bee', image: '🐝🐝' },
  { id: 'tree', name: 'Tree', image: '🌳🌴' },
  { id: 'rock', name: 'Rock', image: '🪨🪨' },
  { id: 'grass', name: 'Grass', image: '🌱🌿' },
  { id: 'water', name: 'Water', image: '💧🌧️' },
  { id: 'nest', name: 'Nest', image: '🪹🪺' },
  { id: 'ant', name: 'Ant', image: '🐜🐜' }
];

const reflectionQuestions = [
  "What item was the most difficult to find?",
  "Which item was the easiest to find?",
  "How many of these objects have you seen before?",
  "While doing the scavenger hunt, how many different animals did you find?"
];

export default function EsWorkSheet1() {
  // Navigation
  const navigate = useNavigate();

  // State variables
  const [foundItems, setFoundItems] = useState({});
  const [reflectionAnswers, setReflectionAnswers] = useState({});
  const [isHovering, setIsHovering] = useState(false);
  
  // Progress tracking states
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [worksheetCompleted, setWorksheetCompleted] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");

  // Constants for progress tracking
  const lessonNumber = "lesson1";
  const courseKey = "environmentalScience";
  
  // Refs
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

  const handleCheckItem = (itemId) => {
    setFoundItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleReflectionAnswer = (questionIndex, answer) => {
    setReflectionAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleDownload = () => {
    window.open('https://docs.google.com/document/d/e/2PACX-1vRUirVOL8YLkxol0nTrImCblQ0sB-Xu2LbLwvxLluYWSEPicxO7NpKWZ8avM_bjvTNsYJUGGffU_w8m/pub', '_blank');
  };

  // Mark worksheet as completed
  const handleComplete = () => {
    // Always award full points (5) for this activity since it's self-reported
    const earnedPoints = 5;
    
    // Mark as completed
    setWorksheetCompleted(true);
    setPointsEarned(earnedPoints);
    
    // Update the backend
    const updatedProgress = { ...userProgress };
    
    // Ensure the path exists
    if (!updatedProgress.courses) updatedProgress.courses = {};
    if (!updatedProgress.courses[courseKey]) {
      updatedProgress.courses[courseKey] = { lessons: {}, title: "Environmental Science" };
    }
    if (!updatedProgress.courses[courseKey].lessons) {
      updatedProgress.courses[courseKey].lessons = {};
    }
    if (!updatedProgress.courses[courseKey].lessons[lessonNumber]) {
      updatedProgress.courses[courseKey].lessons[lessonNumber] = { 
        activities: {},
        title: "Nature Scavenger Hunt"
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
      title: "Nature Scavenger Hunt"
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
          showStatus("✓ Progress saved! You've earned 5 points!", 3000);
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
          Nature Scavenger Hunt
        </h1>
        <h2 style={{
          color: "#357717",
          fontSize: "36px",
          marginBottom: "30px",
          fontFamily: "Orbitron, sans-serif",
          textAlign: "center",
        }}>
          Environmental Science: Lesson 1
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
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          padding: "20px",
          marginBottom: "30px"
        }}>
          <h3>Instructions:</h3>
          <p><strong>Option 1: Fill out the online worksheet</strong></p>
          <ul>
            <li>Find each item on the list provided.</li>
            <li>Check off each item on the worksheet once you find them.</li>
            <li>Answer the reflection questions after completing your hunt.</li>
            <li>Click "I've completed this worksheet" when you're done to earn points.</li>
          </ul>

          <p><strong>Option 2: Prefer a paper copy? Download the printable version below</strong></p>

          <button
            onClick={handleDownload}
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
            Download PDF Version
          </button>
        </div>

        {/* Scavenger Hunt Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "20px"
        }}>
          {scavengerItems.map((item) => (
            <div key={item.id} style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              textAlign: "center",
              backgroundColor: "#ffffff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}>
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>{item.image}</div>
              <div>{item.name}</div>
              <input
                type="checkbox"
                checked={foundItems[item.id] || false}
                onChange={() => handleCheckItem(item.id)}
                style={{ width: "20px", height: "20px", margin: "10px auto 0" }}
              />
            </div>
          ))}
        </div>

        {/* Reflection Section */}
        <div style={{
          marginTop: "40px",
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          <h3>Reflection:</h3>
          {reflectionQuestions.map((question, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <label>{index + 1}. {question}</label>
              <input
                type="text"
                value={reflectionAnswers[index] || ''}
                onChange={(e) => handleReflectionAnswer(index, e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginTop: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd"
                }}
              />
            </div>
          ))}
        </div>

        {/* Complete Worksheet Button */}
        <button
          onClick={handleComplete}
          disabled={worksheetCompleted}
          style={{
            backgroundColor: worksheetCompleted ? "#cccccc" : "#3cb371",
            color: "white",
            padding: "15px 30px",
            borderRadius: "5px",
            border: "none",
            cursor: worksheetCompleted ? "default" : "pointer",
            display: "block",
            margin: "40px auto 20px",
            fontSize: "18px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          }}
        >
          {worksheetCompleted ? "Worksheet Completed ✓" : "I've completed this worksheet"}
        </button>
        
        {worksheetCompleted && (
          <p style={{ textAlign: "center", color: "#3cb371", marginTop: "10px", fontSize: "18px", fontWeight: "bold" }}>  
            Great job completing this activity! You've earned all 5 points.
          </p>
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