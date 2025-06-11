import React, { useState, useRef, useEffect } from "react";
import stemzLearningLogo from "../../assets/logo.png";
import { useWorksheetProgress } from "../../hooks/useWorksheetProgress";
import { LoadingScreen } from "../../components/LoadingScreen";
import { StatusMessage } from "../../components/StatusMessage";
import { BackButton } from "../../components/BackButton";
import { updateProgress } from "../../utils/updateProgress";

// Original Worksheet
// https://docs.google.com/document/d/e/2PACX-1vRUirVOL8YLkxol0nTrImCblQ0sB-Xu2LbLwvxLluYWSEPicxO7NpKWZ8avM_bjvTNsYJUGGffU_w8m/pub
const scavengerItems = [
  { id: "flower", name: "Flower", image: "🌻🌷" },
  { id: "squirrel", name: "Squirrel", image: "🐿️🐿️" },
  { id: "clover", name: "Clover", image: "☘️🍀" },
  { id: "bird", name: "Bird", image: "🐦‍⬛🐦" },
  { id: "pinecone", name: "Pinecone", image: "🌲🌰" },
  { id: "bee", name: "Bee", image: "🐝🐝" },
  { id: "tree", name: "Tree", image: "🌳🌴" },
  { id: "rock", name: "Rock", image: "🪨🪨" },
  { id: "grass", name: "Grass", image: "🌱🌿" },
  { id: "water", name: "Water", image: "💧🌧️" },
  { id: "nest", name: "Nest", image: "🪹🪺" },
  { id: "ant", name: "Ant", image: "🐜🐜" },
];

const reflectionQuestions = [
  "What item was the most difficult to find?",
  "Which item was the easiest to find?",
  "How many of these objects have you seen before?",
  "While doing the scavenger hunt, how many different animals did you find?",
];

export default function EsWorkSheet1() {
  // State variables
  const [foundItems, setFoundItems] = useState({});
  const [reflectionAnswers, setReflectionAnswers] = useState({});
  const [isHovering, setIsHovering] = useState(false);

  // Use the custom hook for progress tracking
  const {
    userProgress,
    setUserProgress,
    loading,
    worksheetCompleted,
    setWorksheetCompleted,
    pointsEarned,
    setPointsEarned,
    statusMessage,
    showStatus,
  } = useWorksheetProgress("environmentalScience", "lesson1");

  const handleCheckItem = (itemId) => {
    setFoundItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleReflectionAnswer = (questionIndex, answer) => {
    setReflectionAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleDownload = () => {
    window.open(
      "https://docs.google.com/document/d/e/2PACX-1vRUirVOL8YLkxol0nTrImCblQ0sB-Xu2LbLwvxLluYWSEPicxO7NpKWZ8avM_bjvTNsYJUGGffU_w8m/pub",
      "_blank"
    );
  };

  // Mark worksheet as completed
  const handleComplete = async () => {
    // Always award full points (5) for this activity since it's self-reported
    const earnedPoints = 5;

    // Mark as completed
    setWorksheetCompleted(true);
    setPointsEarned(earnedPoints);

    // Update progress using the utility function
    const updatedProgress = await updateProgress(
      userProgress,
      "environmentalScience",
      "lesson1",
      earnedPoints,
      "Nature Scavenger Hunt",
      showStatus
    );

    if (updatedProgress) {
      setUserProgress(updatedProgress);
    }
  };

  // Loading screen
  if (loading) {
    return <LoadingScreen />;
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
      <StatusMessage message={statusMessage} />
      <BackButton />

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
          Nature Scavenger Hunt
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
          Environmental Science: Lesson 1
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
          <h3>Instructions:</h3>
          <p>
            <strong>Option 1: Fill out the online worksheet</strong>
          </p>
          <ul>
            <li>Find each item on the list provided.</li>
            <li>Check off each item on the worksheet once you find them.</li>
            <li>Answer the reflection questions after completing your hunt.</li>
            <li>
              Click "I've completed this worksheet" when you're done to earn
              points.
            </li>
          </ul>

          <p>
            <strong>
              Option 2: Prefer a paper copy? Download the printable version
              below
            </strong>
          </p>

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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {scavengerItems.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                textAlign: "center",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                {item.image}
              </div>
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
        <div
          style={{
            marginTop: "40px",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Reflection:</h3>
          {reflectionQuestions.map((question, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <label>
                {index + 1}. {question}
              </label>
              <input
                type="text"
                value={reflectionAnswers[index] || ""}
                onChange={(e) => handleReflectionAnswer(index, e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginTop: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
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
          {worksheetCompleted
            ? "Worksheet Completed ✓"
            : "I've completed this worksheet"}
        </button>

        {worksheetCompleted && (
          <p
            style={{
              textAlign: "center",
              color: "#3cb371",
              marginTop: "10px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Great job completing this activity! You've earned all 5 points.
          </p>
        )}
      </div>
    </div>
  );
}
