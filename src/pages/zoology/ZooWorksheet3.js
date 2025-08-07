import React, { useState, useRef, useEffect } from "react";
import stemzLearningLogo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { call_api } from "../../api";

const animals = ["Elephants", "Lion", "Crocodile", "Horses"];
const columnAnimals = ["Mosquito", "Cheetah", "Giraffe", "Birds"];

const relationshipTypes = [
  { value: "mutualism", label: "Mutualism (both benefit)", color: "#90EE90" },
  {
    value: "commensalism",
    label: "Commensalism (one benefits, other neutral)",
    color: "#87CEEB",
  },
  { value: "predation", label: "Predation (one eats other)", color: "#FFB6C1" },
  {
    value: "parasitism",
    label: "Parasitism (one benefits, other is harmed)",
    color: "#DDA0DD",
  },
  {
    value: "competition",
    label: "Competition (competing for resources)",
    color: "#F0E68C",
  },
  {
    value: "neutralism",
    label: "Neutralism (unaffected by each other)",
    color: "#D3D3D3",
  },
];

// Correct answers for the relationships
const correctAnswers = {
  "Elephants-Mosquito": "parasitism",
  "Elephants-Cheetah": "neutralism",
  "Elephants-Giraffe": "competition",
  "Elephants-Birds": "commensalism",
  "Lion-Mosquito": "parasitism",
  "Lion-Cheetah": "competition",
  "Lion-Giraffe": "predation",
  "Lion-Birds": "neutralism",
  "Crocodile-Mosquito": "parasitism",
  "Crocodile-Cheetah": "neutralism",
  "Crocodile-Giraffe": "predation",
  "Crocodile-Birds": "commensalism",
  "Horses-Mosquito": "parasitism",
  "Horses-Cheetah": "predation",
  "Horses-Giraffe": "competition",
  "Horses-Birds": "mutualism",
};

const correctKeystoneSpecies = "Elephants";

export default function ZooWorkSheet4() {
  // Navigation
  const navigate = useNavigate();

  // State variables
  const [relationships, setRelationships] = useState({});
  const [keystoneSpecies, setKeystoneSpecies] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({});
  const [isHovering, setIsHovering] = useState(false);

  // Progress tracking states
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [worksheetCompleted, setWorksheetCompleted] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");

  // Constants for progress tracking
  const lessonNumber = "lesson4";
  const courseKey = "zoology";

  // Refs
  const statusTimeoutRef = useRef(null);

  // Show status message with auto-fade
  const showStatus = (message, duration = 3000) => {
    setStatusMessage(message);
    if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
    statusTimeoutRef.current = setTimeout(() => setStatusMessage(""), duration);
  };

  const saveWorksheetResponsesToDB = async (earnedPoints, correctCount, totalQuestions) => {
    try {
      showStatus("Saving worksheet responses...");
      
      // Prepare relationship answers
      const relationshipAnswers = [];
      animals.forEach((rowAnimal) => {
        columnAnimals.forEach((colAnimal) => {
          const key = `${rowAnimal}-${colAnimal}`;
          const userAnswer = relationships[key];
          const correctAnswer = correctAnswers[key];
          
          relationshipAnswers.push({
            questionId: `${courseKey}_lesson${lessonNumber}_relationship_${key}`,
            questionText: `What is the relationship between ${rowAnimal} and ${colAnimal}?`,
            selectedAnswer: relationshipTypes.find(rt => rt.value === userAnswer)?.label || "No answer selected",
            selectedValue: userAnswer || "No answer selected",
            correctAnswer: relationshipTypes.find(rt => rt.value === correctAnswer)?.label || "",
            correctValue: correctAnswer,
            correct: userAnswer === correctAnswer
          });
        });
      });
  
      // Add keystone species question
      const keystoneAnswer = {
        questionId: `${courseKey}_lesson${lessonNumber}_keystone_species`,
        questionText: "Which animal is most likely to be a keystone species?",
        selectedAnswer: keystoneSpecies || "No answer selected",
        correctAnswer: correctKeystoneSpecies,
        correct: keystoneSpecies === correctKeystoneSpecies
      };
  
      // Combine all answers
      const allAnswers = [...relationshipAnswers, keystoneAnswer];
  
      // Prepare worksheet attempt data
      const worksheetAttemptData = {
        attemptNumber: 1, // You might want to increment this based on existing attempts
        answers: allAnswers,
        score: earnedPoints,
        total: 5, // maxPossiblePoints for worksheet
        correctCount: correctCount,
        totalQuestions: totalQuestions,
        percentCorrect: Math.round((correctCount / totalQuestions) * 100),
        submittedAt: new Date(),
        // Additional data specific to this worksheet
        relationships: relationships,
        keystoneSpecies: keystoneSpecies,
        correctKeystoneSpecies: correctKeystoneSpecies
      };
  
      console.log('Saving worksheet response data:', worksheetAttemptData);
  
      // Save to backend
      const saveResponse = await call_api(
        worksheetAttemptData,
        `studentresponses/${courseKey}/lesson/${lessonNumber}/worksheet`,
        "POST"
      );
  
      if (saveResponse && saveResponse.success) {
        console.log('✅ Worksheet responses saved to backend successfully');
        showStatus("✓ Worksheet responses saved!");
        return true;
      } else {
        console.log('❌ Failed to save worksheet responses to backend');
        showStatus("❌ Error saving worksheet responses");
        return false;
      }
    } catch (error) {
      console.error('Error saving worksheet responses:', error);
      showStatus("❌ Error saving worksheet responses");
      return false;
    }
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

  const handleRelationshipChange = (rowAnimal, colAnimal, value) => {
    if (!showResults) {
      setRelationships((prev) => ({
        ...prev,
        [`${rowAnimal}-${colAnimal}`]: value,
      }));
    }
  };

  const handleKeystoneSelect = (animal) => {
    if (!showResults) {
      setKeystoneSpecies(animal);
    }
  };

  const checkAnswer = (rowAnimal, colAnimal) => {
    const key = `${rowAnimal}-${colAnimal}`;
    const userAnswer = relationships[key];
    return userAnswer === correctAnswers[key];
  };

  const handleCheckAnswers = () => {
    // Make sure all relationships are filled in and a keystone species is selected
    if (
      Object.keys(relationships).length <
        animals.length * columnAnimals.length ||
      !keystoneSpecies
    ) {
      // Show results even if incomplete, but with appropriate message
      const newResults = {};
      animals.forEach((rowAnimal) => {
        columnAnimals.forEach((colAnimal) => {
          const key = `${rowAnimal}-${colAnimal}`;
          if (relationships[key]) {
            newResults[key] = checkAnswer(rowAnimal, colAnimal);
          }
        });
      });
      setResults(newResults);
      setShowResults(true);
      return;
    }

    const newResults = {};
    animals.forEach((rowAnimal) => {
      columnAnimals.forEach((colAnimal) => {
        const key = `${rowAnimal}-${colAnimal}`;
        newResults[key] = checkAnswer(rowAnimal, colAnimal);
      });
    });
    setResults(newResults);
    setShowResults(true);

    // Calculate points based on correct answers
    let correctCount = 0;

    // Count correct relationships
    Object.values(newResults).forEach((isCorrect) => {
      if (isCorrect) correctCount++;
    });

    // Add point for correct keystone species
    if (keystoneSpecies === correctKeystoneSpecies) {
      correctCount++;
    }

    // Calculate points (scale to 5 total possible points)
    // Total possible correct answers: 16 relationships + 1 keystone = 17
    const totalPossibleCorrect = animals.length * columnAnimals.length + 1;
    const earnedPoints = Math.round((correctCount / totalPossibleCorrect) * 5);

    // Mark as completed and save progress
    setWorksheetCompleted(true);
    setPointsEarned(earnedPoints);

    saveWorksheetResponsesToDB(earnedPoints, correctCount, totalPossibleCorrect);

    // Save progress to backend
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
        title: "Animal Behaviors",
      };
    }
    if (!updatedProgress.courses[courseKey].lessons[lessonNumber].activities) {
      updatedProgress.courses[courseKey].lessons[lessonNumber].activities = {};
    }

    // Get current worksheet data to check for highest score
    const currentWorksheet =
      updatedProgress.courses[courseKey].lessons[lessonNumber].activities
        .worksheet || {};
    const highestPoints = Math.max(earnedPoints, currentWorksheet.earned || 0);

    // Set worksheet data
    updatedProgress.courses[courseKey].lessons[
      lessonNumber
    ].activities.worksheet = {
      completed: true,
      earned: highestPoints,
      points: 5, // Total possible points is 5
      type: "worksheet",
      title: "Animal Behaviors",
    };

    // Update lesson points
    updatedProgress.courses[courseKey].lessons[lessonNumber].lessonPoints =
      highestPoints;

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

  const handleReset = () => {
    setRelationships({});
    setKeystoneSpecies(null);
    setShowResults(false);
    setResults({});
  };

  const handleGoBack = () => {
    window.history.back();
  };

  // Calculate percentage of correct answers for display
  const calculateCorrectPercentage = () => {
    if (!showResults) return 0;

    // If nothing is filled in, return 0
    if (Object.keys(results).length === 0) return 0;

    const totalQuestions = animals.length * columnAnimals.length + 1; // Relationships + keystone
    let correctCount = 0;

    // Count correct relationships
    Object.values(results).forEach((isCorrect) => {
      if (isCorrect) correctCount++;
    });

    // Add point for correct keystone species
    if (keystoneSpecies === correctKeystoneSpecies) {
      correctCount++;
    }

    return Math.round((correctCount / totalQuestions) * 100);
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

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
          Animal Behaviors
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
          Zoology: Lesson 4
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
            marginBottom: "30px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Instructions:</h3>
          <ul>
            <li>
              Identify the symbiotic relationship between the animals.
              <ul>
                <li>
                  In each box, select the symbiotic relationship between the
                  animals in each row/column.
                </li>
              </ul>
            </li>
            <li>
              Click on the animal that is most likely to be a keystone species.
            </li>
          </ul>
        </div>

        {/* Definitions */}
        <div
          style={{
            marginBottom: "30px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Helpful Definitions:</h3>
          <h4>Symbiotic relationships:</h4>
          {relationshipTypes.map((type) => (
            <div
              key={type.value}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "10px",
                  borderRadius: "4px",
                  backgroundColor: type.color,
                }}
              ></div>
              <div>{type.label}</div>
            </div>
          ))}
          <h4>
            Keystone species: a species that other species in the ecosystem
            depend on a lot
          </h4>
        </div>

        {/* Relationship Table */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "30px",
            marginBottom: "30px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "15px",
                  border: "1px solid #ddd",
                  backgroundColor: "#f5f5f5",
                  textAlign: "center",
                }}
              >
                Safari Ecosystem
              </th>
              {columnAnimals.map((animal) => (
                <th
                  key={animal}
                  style={{
                    padding: "15px",
                    border: "1px solid #ddd",
                    backgroundColor: "#f5f5f5",
                    textAlign: "center",
                  }}
                >
                  {animal}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {animals.map((rowAnimal) => (
              <tr key={rowAnimal}>
                <td
                  style={{
                    padding: "15px",
                    border: "1px solid #ddd",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    ...(keystoneSpecies === rowAnimal
                      ? {
                          backgroundColor: "#FFD700",
                          fontWeight: "bold",
                        }
                      : {}),
                    ...(showResults && keystoneSpecies === rowAnimal
                      ? keystoneSpecies === correctKeystoneSpecies
                        ? {
                            background:
                              "linear-gradient(#e8f5e9, #e8f5e9), #FFD700",
                          }
                        : {
                            background:
                              "linear-gradient(#ffebee, #ffebee), #FFD700",
                          }
                      : {}),
                  }}
                  onClick={() => handleKeystoneSelect(rowAnimal)}
                >
                  {rowAnimal}
                </td>
                {columnAnimals.map((colAnimal) => {
                  const key = `${rowAnimal}-${colAnimal}`;
                  const relationship = relationships[key];
                  const relationshipColor = relationship
                    ? relationshipTypes.find((t) => t.value === relationship)
                        ?.color
                    : "white";

                  return (
                    <td
                      key={colAnimal}
                      style={{
                        padding: "15px",
                        border: "1px solid #ddd",
                        position: "relative",
                        transition: "all 0.3s ease",
                        background: showResults
                          ? `linear-gradient(${
                              results[key] ? "#e8f5e9" : "#ffebee"
                            }, ${
                              results[key] ? "#e8f5e9" : "#ffebee"
                            }), ${relationshipColor}`
                          : relationshipColor,
                      }}
                    >
                      <select
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          backgroundColor: "transparent",
                        }}
                        value={relationship || ""}
                        onChange={(e) =>
                          handleRelationshipChange(
                            rowAnimal,
                            colAnimal,
                            e.target.value
                          )
                        }
                        disabled={showResults}
                      >
                        <option value="">Select relationship...</option>
                        {relationshipTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          <button
            onClick={handleCheckAnswers}
            style={{
              padding: "12px 25px",
              fontSize: "16px",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: !showResults ? "pointer" : "default",
              transition: "all 0.3s ease",
              backgroundColor: !showResults ? "#3cb371" : "#cccccc",
            }}
            disabled={showResults}
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

        {/* Results message */}
        {showResults && (
          <div
            style={{
              marginTop: "30px",
              textAlign: "center",
              padding: "15px",
              backgroundColor:
                Object.values(results).every(Boolean) &&
                keystoneSpecies === correctKeystoneSpecies
                  ? "#e8f5e9"
                  : "#ffebee",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              marginBottom: "30px",
            }}
          >
            <p
              style={{
                color:
                  Object.values(results).every(Boolean) &&
                  keystoneSpecies === correctKeystoneSpecies
                    ? "#3cb371"
                    : "#CF3434",
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {!Object.keys(relationships).length
                ? "Please fill in all relationships and keystone species."
                : Object.keys(relationships).length <
                  animals.length * columnAnimals.length
                ? "Please fill in all relationships and keystone species."
                : !keystoneSpecies
                ? "Please select a keystone species before checking."
                : Object.values(results).every(Boolean) &&
                  keystoneSpecies === correctKeystoneSpecies
                ? "Congratulations! All answers are correct!"
                : "Some answers are incorrect. Review the highlighted answers."}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "15px",
                marginTop: "15px",
              }}
            >
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "#357717",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                {calculateCorrectPercentage()}%
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "5px",
                }}
              >
                <div>
                  <strong>Your Score:</strong> {pointsEarned} out of 5 points
                </div>
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      backgroundColor: "#e8f5e9",
                      marginRight: "5px",
                      borderRadius: "2px",
                    }}
                  ></span>
                  Correct answers
                </div>
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      backgroundColor: "#ff90ee",
                      marginRight: "5px",
                      borderRadius: "2px",
                    }}
                  ></span>
                  Incorrect answers
                </div>
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      backgroundColor: "#FFD700",
                      marginRight: "5px",
                      borderRadius: "2px",
                    }}
                  ></span>
                  Selected keystone species
                </div>
              </div>
            </div>
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
