import React, { useState, useRef, useEffect } from "react";
import stemzLearningLogo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { call_api } from "../../api";

// Configuration data
const questions = [
  {
    id: 1,
    text: "Which of the following is the ancestor of a human?",
    options: [
      { letter: "a", text: "hippo" },
      { letter: "b", text: "dinosaur" },
      { letter: "c", text: "ape" },
      { letter: "d", text: "kangaroo" },
    ],
    correctAnswer: "c",
  },
  {
    id: 2,
    text: "Which of the following is the descendant of the dinosaurs? (hint: look for similar traits that were not eliminated through evolution!)",
    options: [
      { letter: "a", text: "penguin" },
      { letter: "b", text: "crocodile" },
      { letter: "c", text: "elephant" },
      { letter: "d", text: "porcupine" },
    ],
    correctAnswer: "b",
  },
  {
    id: 3,
    text: "Which is an example of a neutral mutation for a lion?",
    options: [
      { letter: "a", text: "smaller teeth" },
      { letter: "b", text: "stronger legs" },
      { letter: "c", text: "sharper senses" },
      { letter: "d", text: "darker hair" },
    ],
    correctAnswer: "d",
  },
  {
    id: 4,
    text: "Which islands did Charles Darwin travel to that led him to his discovery?",
    options: [
      { letter: "a", text: "Hawaiian Islands" },
      { letter: "b", text: "Canary Islands" },
      { letter: "c", text: "Caribbean Islands" },
      { letter: "d", text: "Galapagos Islands" },
    ],
    correctAnswer: "d",
  },
  {
    id: 5,
    text: "Mosquitoes becoming immune to pesticides over time is an example of what?",
    options: [
      { letter: "a", text: "Harmful Mutation" },
      { letter: "b", text: "Biodiversity" },
      { letter: "c", text: "Evolution" },
      { letter: "d", text: "None of the Above" },
    ],
    correctAnswer: "c",
  },
];

export default function ZooWorkSheet2() {
  // Navigation
  const navigate = useNavigate();

  // State variables
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Progress tracking states
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [worksheetCompleted, setWorksheetCompleted] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");

  // Constants for progress tracking
  const lessonNumber = "lesson2";
  const courseKey = "zoology";

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
              const savedCompleted =
                lesson.activities.worksheet.completed || false;
              const savedPoints = lesson.activities.worksheet.earned || 0;

              setWorksheetCompleted(savedCompleted);
              setPointsEarned(savedPoints);
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
  }, [isAuthenticated, courseKey, lessonNumber]);

  const handleOptionSelect = (questionId, letter) => {
    if (!showResults) {
      setSelectedOptions((prev) => ({
        ...prev,
        [questionId]: letter,
      }));
    }
  };

  // Check answers and award partial credit
  const handleSubmit = () => {
    setShowResults(true);

    // First check if all questions are answered
    if (Object.keys(selectedOptions).length !== questions.length) return;

    // Count correct answers
    let correctCount = 0;
    questions.forEach((question) => {
      if (selectedOptions[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    // Award points based on correct answers (scaled to 5 total points)
    const totalPossiblePoints = 5;
    const earnedPoints = Math.round(
      (correctCount / questions.length) * totalPossiblePoints
    );

    // Mark as completed with partial credit
    setWorksheetCompleted(true);
    setPointsEarned(earnedPoints);

    // Update the backend
    setTimeout(() => {
      const updatedProgress = { ...userProgress };

      // Ensure the path exists
      if (!updatedProgress.courses) updatedProgress.courses = {};
      if (!updatedProgress.courses[courseKey]) {
        updatedProgress.courses[courseKey] = { lessons: {}, title: "Zoology" };
      }
      if (!updatedProgress.courses[courseKey].lessons) {
        updatedProgress.courses[courseKey].lessons = {};
      }
      if (!updatedProgress.courses[courseKey].lessons[lessonNumber]) {
        updatedProgress.courses[courseKey].lessons[lessonNumber] = {
          activities: {},
          title: "Darwin's Theory of Evolution",
        };
      }
      if (
        !updatedProgress.courses[courseKey].lessons[lessonNumber].activities
      ) {
        updatedProgress.courses[courseKey].lessons[lessonNumber].activities =
          {};
      }

      // Set worksheet data
      updatedProgress.courses[courseKey].lessons[
        lessonNumber
      ].activities.worksheet = {
        completed: true,
        earned: earnedPoints,
        points: 5, // Total possible points is 5
        type: "worksheet",
        title: "Evolution Quiz",
      };

      // Update lesson points
      updatedProgress.courses[courseKey].lessons[lessonNumber].lessonPoints =
        earnedPoints;

      // Mark lesson as completed if video is also completed
      if (
        updatedProgress.courses[courseKey].lessons[lessonNumber].activities
          .video?.completed
      ) {
        updatedProgress.courses[courseKey].lessons[
          lessonNumber
        ].completed = true;
      }

      // Update course points
      let coursePoints = 0;
      Object.values(updatedProgress.courses[courseKey].lessons).forEach(
        (lesson) => {
          coursePoints += lesson.lessonPoints || 0;
        }
      );
      updatedProgress.courses[courseKey].coursePoints = coursePoints;

      // Update total points
      let totalPoints = 0;
      Object.values(updatedProgress.courses).forEach((course) => {
        totalPoints += course.coursePoints || 0;
      });
      updatedProgress.totalPoints = totalPoints;

      // Send to API
      call_api(updatedProgress, "points", "POST")
        .then((response) => {
          if (response) {
            setUserProgress(updatedProgress);
            showStatus("✓ Progress saved!", 3000);
          }
        })
        .catch((error) => {
          console.error("Update error:", error);
          showStatus("❌ Error saving progress", 3000);
        });
    }, 500);
  };

  const handleReset = () => {
    setSelectedOptions({});
    setShowResults(false);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const getOptionStyle = (questionId, optionLetter) => {
    const baseStyle = {
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      cursor: !showResults ? "pointer" : "default",
      transition: "all 0.3s ease",
      backgroundColor: "white",
      marginBottom: "8px",
    };

    if (!showResults && selectedOptions[questionId] === optionLetter) {
      return {
        ...baseStyle,
        backgroundColor: "#e8f5e9",
        border: "1px solid #3cb371",
      };
    }

    if (showResults) {
      const question = questions.find((q) => q.id === questionId);
      if (optionLetter === question.correctAnswer) {
        return {
          ...baseStyle,
          backgroundColor: "rgba(60, 179, 113, 0.2)",
          border: "1px solid #3cb371",
        };
      } else if (selectedOptions[questionId] === optionLetter) {
        return {
          ...baseStyle,
          backgroundColor: "rgba(207, 52, 52, 0.2)",
          border: "1px solid #CF3434",
        };
      }
    }

    return baseStyle;
  };

  // Check if all answers are correct
  const isAllCorrect = () => {
    if (Object.keys(selectedOptions).length !== questions.length) return false;
    return questions.every(
      (question) => selectedOptions[question.id] === question.correctAnswer
    );
  };

  // Loading screen
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "white",
          margin: 0,
          padding: "32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #357717",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              animation: "spin 2s linear infinite",
              margin: "0 auto 20px",
            }}
          ></div>
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
    <div
      style={{
        minHeight: "100vh",
        background: "white",
        margin: "0",
        padding: "32px",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      {/* Status message */}
      {statusMessage && (
        <div
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

      {/* Back button */}
      <button
        onClick={handleGoBack}
        style={{
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
        onMouseLeave={() => setIsHovering(false)}
      >
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
            margin: "0 auto 30px",
          }}
        />
        <h1
          style={{
            color: "#254E17",
            fontSize: "48px",
            marginBottom: "10px",
            fontFamily: "Orbitron, sans-serif",
            textAlign: "center",
          }}
        >
          Darwin's Theory of Evolution
        </h1>
        <h2
          style={{
            color: "#357717",
            fontSize: "36px",
            marginBottom: "30px",
            fontFamily: "Orbitron, sans-serif",
            textAlign: "center",
          }}
        >
          Zoology: Lesson 2
        </h2>

        {/* Progress status */}
        <div
          style={{
            marginBottom: "20px",
            padding: "10px 15px",
            borderRadius: "5px",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
            borderLeft: worksheetCompleted
              ? "4px solid #3cb371"
              : "4px solid #ccc",
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              marginRight: "15px",
              color: "#333333",
            }}
          >
            Worksheet:
          </span>
          <span
            style={{
              color: worksheetCompleted ? "#3cb371" : "#666666",
              fontWeight: worksheetCompleted ? "bold" : "normal",
            }}
          >
            {worksheetCompleted ? "Completed" : "Not Completed"}
          </span>
          <span
            style={{
              marginLeft: "15px",
              color: "#555555",
            }}
          >
            ({pointsEarned} {pointsEarned === 1 ? "point" : "points"})
          </span>
        </div>

        {/* Instructions */}
        <div
          style={{
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            padding: "20px",
            marginBottom: "30px",
          }}
        >
          <h3 style={{ color: "#333333", marginTop: 0, marginBottom: "10px" }}>
            Instructions:
          </h3>
          <p style={{ margin: 0 }}>
            Click on the correct answer for each question.
          </p>
        </div>

        {/* Questions */}
        {questions.map((question) => (
          <div
            key={question.id}
            style={{
              marginBottom: "30px",
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              {question.id}. {question.text}
            </div>
            <div
              style={{
                display: "grid",
                gap: "10px",
              }}
            >
              {question.options.map((option) => (
                <div
                  key={option.letter}
                  onClick={() => handleOptionSelect(question.id, option.letter)}
                  style={getOptionStyle(question.id, option.letter)}
                >
                  {option.letter}. {option.text}
                </div>
              ))}
            </div>
            {showResults && (
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "14px",
                  color:
                    selectedOptions[question.id] === question.correctAnswer
                      ? "#3cb371"
                      : "#CF3434",
                }}
              >
                {selectedOptions[question.id] === question.correctAnswer
                  ? "✓ Correct!"
                  : `✗ The correct answer is ${question.correctAnswer}.`}
              </div>
            )}
          </div>
        ))}

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <button
            onClick={handleSubmit}
            disabled={showResults}
            style={{
              padding: "12px 25px",
              fontSize: "16px",
              backgroundColor: showResults ? "#cccccc" : "#3cb371",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: showResults ? "default" : "pointer",
              transition: "all 0.3s ease",
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
              transition: "all 0.3s ease",
            }}
          >
            Reset
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
              {Object.keys(selectedOptions).length === 0
                ? "Please answer some questions before checking."
                : isAllCorrect()
                ? "Congratulations! All answers are correct!"
                : Object.keys(selectedOptions).length < questions.length
                ? "Please answer all questions before checking."
                : "Some answers are incorrect. Please review and try again."}
            </p>
            {!isAllCorrect() &&
              Object.keys(selectedOptions).length === questions.length && (
                <p style={{ color: "#555", marginBottom: 0 }}>
                  You got{" "}
                  {
                    questions.filter(
                      (q) => selectedOptions[q.id] === q.correctAnswer
                    ).length
                  }{" "}
                  out of {questions.length} correct.
                </p>
              )}
          </div>
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
    </div>
  );
}
