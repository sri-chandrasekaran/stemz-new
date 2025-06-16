import React from "react";

export const LoadingScreen = () => (
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
