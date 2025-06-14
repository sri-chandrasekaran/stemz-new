import React, { useState } from "react";

export const BackButton = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <button
      onClick={() => window.history.back()}
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
  );
};
