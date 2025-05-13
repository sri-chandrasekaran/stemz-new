import React, { useState, useRef, useEffect } from "react";
import stemzLearningLogo from "../../assets/logo.png";
import statsWorksheet4 from "../../assets/statsworksheet4.png";
import { useNavigate } from "react-router-dom";
import { call_api } from "../api";

// Correct answers for student counts
const correctCounts = {
  A: "10",
  B: "7",
  C: "3",
};

export default function StatWorkSheet4() {
  // Navigation
  const navigate = useNavigate();

  // State variables
  const [isHovering, setIsHovering] = useState(false);
  const [answers, setAnswers] = useState({
    graphType: "",
    reasoning: "",
    studentCounts: {
      A: "",
      B: "",
      C: "",
    },
  });
  const [showResults, setShowResults] = useState(false);
  const [answersChecked, setAnswersChecked] = useState(false);

  // Progress tracking states
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [worksheetCompleted, setWorksheetCompleted] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");

  // Constants for progress tracking
  const lessonNumber = "lesson4";
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

  const handleInputChange = (field, value) => {
    if (field.startsWith("studentCounts.")) {
      const grade = field.split(".")[1];
      setAnswers((prev) => ({
        ...prev,
        studentCounts: {
          ...prev.studentCounts,
          [grade]: value,
        },
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const checkAnswers = () => {
    setShowResults(true);
    setAnswersChecked(true);
  };

  const resetAnswers = () => {
    setAnswers({
      graphType: "",
      reasoning: "",
      studentCounts: {
        A: "",
        B: "",
        C: "",
      },
    });
    setShowResults(false);
    setAnswersChecked(false);
  };

  const isStudentCountCorrect = (grade) => {
    return answers.studentCounts[grade] === correctCounts[grade];
  };

  const areAllCountsCorrect = () => {
    return Object.keys(correctCounts).every((grade) =>
      isStudentCountCorrect(grade)
    );
  };

  const handleGoBack = () => {
    window.history.back();
  };

  // Mark worksheet as completed
  const handleComplete = () => {
    // Calculate points based on correct answers (up to 5 total points)
    let earnedPoints = 0;

    // Award points for question 1 (reasoning/graph type)
    if (answers.reasoning && answers.reasoning.trim().length > 0) {
      earnedPoints += 2; // 2 points for writing something meaningful
    }

    // Award points for question 2 (student counts)
    const correctCountsCount = Object.keys(correctCounts).filter((grade) =>
      isStudentCountCorrect(grade)
    ).length;

    // Scale the points: 0 correct = 0 points, 1 correct = 1 point, 2 correct = 2 points, 3 correct = 3 points
    earnedPoints += correctCountsCount;

    // Ensure maximum points is 5
    earnedPoints = Math.min(earnedPoints, 5);

    // Keep the highest score ever achieved
    const highestPoints = Math.max(earnedPoints, pointsEarned);

    // Mark as completed
    setWorksheetCompleted(true);
    setPointsEarned(highestPoints);

    // Update the backend
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
        title: "Create Your Own Graph",
      };
    }
    if (!updatedProgress.courses[courseKey].lessons[lessonNumber].activities) {
      updatedProgress.courses[courseKey].lessons[lessonNumber].activities = {};
    }

    // Get the current worksheet data
    const currentWorksheet =
      updatedProgress.courses[courseKey].lessons[lessonNumber].activities
        .worksheet || {};

    // Set worksheet data
    updatedProgress.courses[courseKey].lessons[
      lessonNumber
    ].activities.worksheet = {
      completed: true,
      earned: highestPoints,
      points: 5, // Total possible points is 5
      type: "worksheet",
      title: "Create Your Own Graph",
    };

    // Update lesson points
    updatedProgress.courses[courseKey].lessons[lessonNumber].lessonPoints =
      earnedPoints;

    // Mark lesson as completed if video is also completed
    if (
      updatedProgress.courses[courseKey].lessons[lessonNumber].activities.video
        ?.completed
    ) {
      updatedProgress.courses[courseKey].lessons[lessonNumber].completed = true;
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
          showStatus(
            `✓ Progress saved! You've earned ${earnedPoints} points!`,
            3000
          );
        }
      })
      .catch((error) => {
        console.error("Update error:", error);
        showStatus("❌ Error saving progress", 3000);
      });
  };

  // Check if completion button should be enabled - allow resubmission even when already completed
  const canCompleteWorksheet = () => {
    return answers.reasoning.trim().length > 0 && answersChecked;
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
          Create Your Own Graph!
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
          Statistics: Lesson 4
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
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "15px",
              color: "#254E17",
            }}
          >
            Materials Needed:
          </div>
          <ul
            style={{
              listStyleType: "disc",
              paddingLeft: "20px",
              marginBottom: "15px",
            }}
          >
            <li
              style={{
                marginBottom: "8px",
                lineHeight: "1.6",
              }}
            >
              Scratch Paper
            </li>
            <li
              style={{
                marginBottom: "8px",
                lineHeight: "1.6",
              }}
            >
              Coloring pencils/pens/crayons
            </li>
          </ul>

          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "15px",
              color: "#254E17",
            }}
          >
            Instructions:
          </div>
          <p
            style={{
              marginBottom: "8px",
              lineHeight: "1.6",
            }}
          >
            Look at the pie chart below. It shows the grades of 20 students in
            third grade. The teacher of the class wants to see how her students
            are doing more clearly. Turn the pie chart into a different type of
            graph where the teacher can more clearly see how many students are
            in each category.
          </p>
        </div>

        {/* Chart Image */}
        <div
          style={{
            maxWidth: "600px",
            margin: "30px auto",
            textAlign: "center",
          }}
        >
          <img
            src={statsWorksheet4}
            alt="Student's Grades Pie Chart"
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "auto",
              marginBottom: "30px",
            }}
          />
        </div>

        {/* Questions Section */}
        <div
          style={{
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {/* Question 1 */}
          <div
            style={{
              marginBottom: "20px",
              fontSize: "16px",
              lineHeight: "1.6",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                marginRight: "8px",
              }}
            >
              1.
            </span>
            What type of graph will you use? Why?
            <textarea
              value={answers.reasoning}
              onChange={(e) => handleInputChange("reasoning", e.target.value)}
              placeholder="Enter the type of graph and explain why you chose this type of graph"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "10px",
                marginBottom: "15px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                fontSize: "16px",
                height: "100px",
              }}
            />
          </div>

          {/* Question 2 */}
          <div
            style={{
              marginBottom: "20px",
              fontSize: "16px",
              lineHeight: "1.6",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                marginRight: "8px",
              }}
            >
              2.
            </span>
            How many students are in each grade category? (Total: 20 students)
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "15px",
                marginTop: "15px",
              }}
            >
              {["A", "B", "C"].map((grade) => (
                <div
                  key={grade}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <label
                    style={{
                      fontWeight: "bold",
                      marginBottom: "5px",
                    }}
                  >
                    Grade {grade}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={answers.studentCounts[grade]}
                    onChange={(e) =>
                      handleInputChange(
                        `studentCounts.${grade}`,
                        e.target.value
                      )
                    }
                    style={{
                      width: "60px",
                      padding: "8px",
                      borderRadius: "5px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                      ...(showResults && {
                        backgroundColor: isStudentCountCorrect(grade)
                          ? "#e8f5e9"
                          : "#ffebee",
                        border: isStudentCountCorrect(grade)
                          ? "1px solid #3cb371"
                          : "1px solid #CF3434",
                      }),
                    }}
                  />
                  {showResults && (
                    <div
                      style={{
                        color: isStudentCountCorrect(grade)
                          ? "#3cb371"
                          : "#CF3434",
                        marginTop: "5px",
                      }}
                    >
                      {isStudentCountCorrect(grade) ? "✓" : "✗"}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Results message for question 2 */}
            {showResults && (
              <div
                style={{
                  marginTop: "30px",
                  textAlign: "center",
                  padding: "15px",
                  backgroundColor: areAllCountsCorrect()
                    ? "#e8f5e9"
                    : "#ffebee",
                  borderRadius: "5px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              >
                <p
                  style={{
                    color: areAllCountsCorrect() ? "#3cb371" : "#CF3434",
                    fontSize: "18px",
                    fontWeight: "bold",
                    margin: 0,
                  }}
                >
                  {!answers.studentCounts.A &&
                  !answers.studentCounts.B &&
                  !answers.studentCounts.C
                    ? "Please enter student counts before checking answers."
                    : areAllCountsCorrect()
                    ? "Congratulations! Your student counts are correct."
                    : "Some counts are incorrect. Remember, we're looking at 20 students total."}
                </p>
              </div>
            )}
          </div>

          {/* Question 3 */}
          <div
            style={{
              marginBottom: "20px",
              fontSize: "16px",
              lineHeight: "1.6",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                marginRight: "8px",
              }}
            >
              3.
            </span>
            Create your graph!
          </div>

          {/* Check/Reset Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              marginBottom: "30px",
            }}
          >
            <button
              onClick={checkAnswers}
              style={{
                backgroundColor: "#3cb371",
                color: "white",
                padding: "12px 25px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                marginRight: "10px",
                fontSize: "16px",
                transition: "all 0.3s ease",
              }}
            >
              Check Answers
            </button>
            <button
              onClick={resetAnswers}
              style={{
                backgroundColor: "#CF3434",
                color: "white",
                padding: "12px 25px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                transition: "all 0.3s ease",
              }}
            >
              Reset
            </button>
          </div>

          {/* Complete Worksheet Button */}
          <button
            onClick={handleComplete}
            disabled={!canCompleteWorksheet()}
            style={{
              backgroundColor: canCompleteWorksheet() ? "#3cb371" : "#cccccc",
              color: "white",
              padding: "15px 30px",
              borderRadius: "5px",
              border: "none",
              cursor: canCompleteWorksheet() ? "pointer" : "default",
              display: "block",
              margin: "40px auto 20px",
              fontSize: "18px",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
              width: "80%",
              maxWidth: "400px",
            }}
          >
            {worksheetCompleted && !canCompleteWorksheet()
              ? "Worksheet Completed ✓"
              : worksheetCompleted && canCompleteWorksheet()
              ? "Submit again for a better score"
              : canCompleteWorksheet()
              ? "I've completed this worksheet"
              : "Complete all questions first"}
          </button>

          {worksheetCompleted && (
            <p
              style={{
                textAlign: "center",
                color: "#3cb371",
                marginTop: "10px",
              }}
            >
              Great job completing this activity! You've earned {pointsEarned}{" "}
              out of 5 possible points.
              {canCompleteWorksheet() &&
                " You can try again to improve your score!"}
            </p>
          )}

          <div
            style={{
              marginTop: "40px",
              textAlign: "center",
              color: "#666",
              fontSize: "16px",
            }}
          >
            Go back to the slides once you've finished.
          </div>
        </div>
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
