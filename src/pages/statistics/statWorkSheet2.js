import React, { useState, useRef, useEffect } from "react";
import stemzLearningLogo from "../../assets/logo.png";
import fractionMenu from "../../assets/fractionmenu.png";
import { useNavigate } from "react-router-dom";
import { call_api } from "../api";

const menuItems = {
  salads: [
    { name: 'Strawberry Blueberry Salad', price: 9.00 },
    { name: 'Banana Mandarin Salad', price: 11.00 },
    { name: 'Arugula Mandarin Salad', price: 15.00 }
  ],
  mainMeals: [
    { name: 'Pizza', price: 18.00 },
    { name: 'BLT Sandwich', price: 21.00 },
    { name: 'Sushi', price: 24.00 }
  ],
  desserts: [
    { name: 'Chocolate Bar', price: 6.00 },
    { name: 'Ice Cream Scoop', price: 10.00 },
    { name: 'Dozen Doughnuts', price: 17.00 }
  ]
};

const discounts = {
  salads: 30,
  mainMeals: 20,
  desserts: 45
};

const questions = [
  {
    id: 1,
    text: "What is the original price of Sushi?",
    correctAnswer: "24.00",
    answerPrefix: "$",
    answerSuffix: ""
  },
  {
    id: 2,
    text: "How much does a Banana Mandarin Salad cost after the 30% discount?",
    correctAnswer: "7.70",
    answerPrefix: "$",
    answerSuffix: ""
  },
  {
    id: 3,
    text: "If you buy one Ice Cream Scoop and one Pizza, what is your total cost after discounts?",
    correctAnswer: "19.90",
    answerPrefix: "$",
    answerSuffix: ""
  }
];

export default function StatWorkSheet3() {
  // Navigation
  const navigate = useNavigate();

  // State variables
  const [selectedItems, setSelectedItems] = useState({
    salad: '',
    mainMeal: '',
    dessert: ''
  });
  const [isHovering, setIsHovering] = useState(false);
  const [total, setTotal] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  
  // Progress tracking states
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [worksheetCompleted, setWorksheetCompleted] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");

  // Constants for progress tracking
  const lessonNumber = "lesson3";
  const courseKey = "statistics";
  
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

  const calculateTotal = (selections) => {
    let sum = 0;
    
    if (selections.salad) {
      const saladPrice = menuItems.salads.find(item => item.name === selections.salad).price;
      sum += saladPrice * (1 - discounts.salads/100);
    }
    
    if (selections.mainMeal) {
      const mainPrice = menuItems.mainMeals.find(item => item.name === selections.mainMeal).price;
      sum += mainPrice * (1 - discounts.mainMeals/100);
    }
    
    if (selections.dessert) {
      const dessertPrice = menuItems.desserts.find(item => item.name === selections.dessert).price;
      sum += dessertPrice * (1 - discounts.desserts/100);
    }
    
    return sum.toFixed(2);
  };

  const handleSelection = (category, itemName) => {
    const newSelections = {
      ...selectedItems,
      [category]: itemName
    };
    setSelectedItems(newSelections);
    setTotal(calculateTotal(newSelections));
  };

  const handleAnswerChange = (questionId, value) => {
    if (!showResults) {
      setUserAnswers(prev => ({
        ...prev,
        [questionId]: value
      }));
    }
  };

  // Check answers and award partial credit
  const handleCheckAnswers = () => {
    setShowResults(true);
    
    // Count correct answers
    let correctCount = 0;
    questions.forEach(question => {
      const userAnswer = userAnswers[question.id] || "";
      if (Math.abs(parseFloat(userAnswer) - parseFloat(question.correctAnswer)) < 0.01) {
        correctCount++;
      }
    });
    
    // Award points based on correct answers (scaled to 5 total points)
    const totalPossiblePoints = 5;
    const earnedPoints = Math.round((correctCount / questions.length) * totalPossiblePoints);
    
    // Mark as completed with partial credit
    setWorksheetCompleted(true);
    setPointsEarned(earnedPoints);
    
    // Update the backend
    setTimeout(() => {
      const updatedProgress = { ...userProgress };
      
      // Ensure the path exists
      if (!updatedProgress.courses) updatedProgress.courses = {};
      if (!updatedProgress.courses[courseKey]) {
        updatedProgress.courses[courseKey] = { lessons: {}, title: "Statistics" };
      }
      if (!updatedProgress.courses[courseKey].lessons) {
        updatedProgress.courses[courseKey].lessons = {};
      }
      if (!updatedProgress.courses[courseKey].lessons[lessonNumber]) {
        updatedProgress.courses[courseKey].lessons[lessonNumber] = { 
          activities: {},
          title: "Fraction Restaurant"
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
        title: "Fractions & Discounts"
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
            showStatus(`✓ Progress saved! You've earned ${earnedPoints} points!`, 3000);
          }
        })
        .catch(error => {
          console.error("Update error:", error);
          showStatus("❌ Error saving progress", 3000);
        });
    }, 500);
  };

  const handleReset = () => {
    setSelectedItems({ salad: '', mainMeal: '', dessert: '' });
    setTotal(0);
    setUserAnswers({});
    setShowResults(false);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const isAnswerCorrect = (questionId) => {
    const question = questions.find(q => q.id === questionId);
    const userAnswer = userAnswers[questionId] || "";
    return Math.abs(parseFloat(userAnswer) - parseFloat(question.correctAnswer)) < 0.01;
  };

  const getCorrectAnswerCount = () => {
    return questions.filter(question => isAnswerCorrect(question.id)).length;
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
          Fraction Restaurant
        </h1>
        <h2 style={{
          color: "#357717",
          fontSize: "36px",
          marginBottom: "30px",
          fontFamily: "Orbitron, sans-serif",
          textAlign: "center",
        }}>
          Statistics: Lesson 3
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
          <h3 style={{ marginTop: 0 }}>Materials Needed:</h3>
          <ul>
            <li>Scratch paper</li>
          </ul>
          
          <h3>Instructions:</h3>
          <p>Look at the menu from Fractions Restaurant and answer the questions below. The menu shows original prices, and all items are discounted:</p>
          <ul>
            <li>All salads are {discounts.salads}% off</li>
            <li>Main meals are {discounts.mainMeals}% off</li>
            <li>Desserts are {discounts.desserts}% off</li>
          </ul>

          <img 
            src={fractionMenu} 
            alt="Fraction Restaurant Menu" 
            style={{
              width: "100%",
              maxWidth: "600px",
              margin: "20px auto",
              display: "block",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          />
        </div>

        {/* Menu Display */}
        <div style={{
          backgroundColor: "#e8f5e9",
          borderRadius: "15px",
          padding: "20px",
          marginBottom: "30px"
        }}>
          <h3>Restaurant Menu</h3>
          
          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ display: "flex", alignItems: "center" }}>
              Salads
              <span style={{
                backgroundColor: "#ff4444",
                color: "white",
                padding: "5px 10px",
                borderRadius: "15px",
                marginLeft: "10px",
                fontSize: "14px"
              }}>
                {discounts.salads}% OFF!
              </span>
            </h4>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px"
            }}>
              {menuItems.salads.map((item) => (
                <div key={item.name} style={{
                  padding: "15px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  textAlign: "center"
                }}>
                  <div>{item.name}</div>
                  <div style={{ fontWeight: "bold", color: "#357717" }}>${item.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ display: "flex", alignItems: "center" }}>
              Main Meals
              <span style={{
                backgroundColor: "#ff4444",
                color: "white",
                padding: "5px 10px",
                borderRadius: "15px",
                marginLeft: "10px",
                fontSize: "14px"
              }}>
                {discounts.mainMeals}% OFF!
              </span>
            </h4>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px"
            }}>
              {menuItems.mainMeals.map((item) => (
                <div key={item.name} style={{
                  padding: "15px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  textAlign: "center"
                }}>
                  <div>{item.name}</div>
                  <div style={{ fontWeight: "bold", color: "#357717" }}>${item.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 style={{ display: "flex", alignItems: "center" }}>
              Desserts
              <span style={{
                backgroundColor: "#ff4444",
                color: "white",
                padding: "5px 10px",
                borderRadius: "15px",
                marginLeft: "10px",
                fontSize: "14px"
              }}>
                {discounts.desserts}% OFF!
              </span>
            </h4>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px"
            }}>
              {menuItems.desserts.map((item) => (
                <div key={item.name} style={{
                  padding: "15px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  textAlign: "center"
                }}>
                  <div>{item.name}</div>
                  <div style={{ fontWeight: "bold", color: "#357717" }}>${item.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Questions */}
        <div style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          <h3>Answer the following questions:</h3>
          
          {questions.map((question) => (
            <div key={question.id} style={{
              marginBottom: "20px",
              padding: "15px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}>
              <div style={{
                fontWeight: "bold",
                marginBottom: "10px"
              }}>
                {question.id}. {question.text}
              </div>
              
              <div style={{ display: "flex", alignItems: "center" }}>
                {question.answerPrefix && (
                  <span style={{ marginRight: "5px" }}>{question.answerPrefix}</span>
                )}
                <input
                  type="number"
                  step="0.01"
                  value={userAnswers[question.id] || ""}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  style={{
                    padding: "8px 12px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                    width: "120px"
                  }}
                  disabled={showResults}
                />
                {question.answerSuffix && (
                  <span style={{ marginLeft: "5px" }}>{question.answerSuffix}</span>
                )}
              </div>
              
              {showResults && (
                <div style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  backgroundColor: isAnswerCorrect(question.id) ? "rgba(60, 179, 113, 0.2)" : "rgba(207, 52, 52, 0.2)",
                  color: isAnswerCorrect(question.id) ? "#3cb371" : "#CF3434",
                  fontWeight: "bold"
                }}>
                  {isAnswerCorrect(question.id)
                    ? "✓ Correct!"
                    : `✗ The correct answer is ${question.answerPrefix}${question.correctAnswer}${question.answerSuffix}.`}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "40px"
        }}>
          <button
            onClick={handleCheckAnswers}
            disabled={showResults}
            style={{
              padding: "12px 25px",
              fontSize: "16px",
              backgroundColor: showResults ? "#cccccc" : "#3cb371",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: showResults ? "default" : "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease"
            }}
          >
            Check Answers
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: "12px 25px",
              fontSize: "16px",
              backgroundColor: "#CF3434",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease"
            }}
          >
            Reset
          </button>
        </div>

        {/* Results message */}
        {showResults && (
          <div style={{
            marginTop: "30px",
            textAlign: "center",
            padding: "15px",
            backgroundColor: getCorrectAnswerCount() === questions.length ? "#e8f5e9" : "#ffebee",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            marginBottom: "30px"
          }}>
            <p style={{
              color: getCorrectAnswerCount() === questions.length ? "#3cb371" : "#CF3434",
              fontSize: "18px",
              fontWeight: "bold"
            }}>
              {getCorrectAnswerCount() === 0
                ? "No correct answers. Review the material and try again!"
                : getCorrectAnswerCount() === questions.length
                  ? "Congratulations! All answers are correct!"
                  : `You got ${getCorrectAnswerCount()} out of ${questions.length} questions correct.`}
            </p>
            <p style={{ marginBottom: 0 }}>
              You earned {pointsEarned} out of 5 possible points.
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