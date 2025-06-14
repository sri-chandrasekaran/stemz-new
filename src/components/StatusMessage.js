import React from "react";

export const StatusMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "150px",
        right: "20px",
        padding: "10px 15px",
        backgroundColor: message.includes("Error")
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
      {message}
      <style>{`
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
      `}</style>
    </div>
  );
};
