import React from "react";

export const CompleteButton = ({ completed, onClick }) => (
  <>
    <button
      onClick={onClick}
      disabled={completed}
      style={{
        backgroundColor: completed ? "#cccccc" : "#3cb371",
        color: "white",
        padding: "15px 30px",
        borderRadius: "5px",
        border: "none",
        cursor: completed ? "default" : "pointer",
        display: "block",
        margin: "40px auto 20px",
        fontSize: "18px",
        fontWeight: "bold",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
      }}
    >
      {completed ? "Worksheet Completed ✓" : "I've completed this worksheet"}
    </button>

    {completed && (
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
  </>
);
