import React, { useState, useEffect } from "react";
import stemzLearningLogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { call_api } from "../api";

const colorCodes = [
  { color: "Red", pieces: 2, tips: "" },
  { color: "Blue", pieces: 3, tips: "" },
  { color: "Green", pieces: 4, tips: "" },
  { color: "Purple", pieces: 6, tips: "Cut in half then cut each piece in 3" },
  {
    color: "Black",
    pieces: 8,
    tips: "Cut into 4 pieces then cut each piece in half",
  },
];

const handleDownload = () => {
  window.open(
    "https://docs.google.com/document/d/e/2PACX-1vQqKPBJD-85m_sQdbX__cWr0pS2SNtdPQubY2gr6r3_00jc9zWbn5cfOEUx8Ffs_xM9Fs8H29KCC_vc/pub",
    "_blank"
  );
};

const CircleDiagram = ({ slices }) => {
  const midX = 50;
  const midY = 50;
  const radius = 40;

  const getSlicePath = (slice, total) => {
    const startAngle = (slice * 360) / total;
    const endAngle = ((slice + 1) * 360) / total;
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;

    const x1 = midX + radius * Math.cos(startRad);
    const y1 = midY + radius * Math.sin(startRad);
    const x2 = midX + radius * Math.cos(endRad);
    const y2 = midY + radius * Math.sin(endRad);

    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

    return `M ${midX} ${midY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      {Array.from({ length: slices }, (_, i) => (
        <path
          key={i}
          d={getSlicePath(i, slices)}
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
      ))}
    </svg>
  );
};

export default function StatWorkSheet1() {
  const [isHovering, setIsHovering] = useState(false);
  const [completionTimer, setCompletionTimer] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [completionStatus, setCompletionStatus] = useState(
    "Please stay on this page & continue reading to earn worksheet points..."
  );
  const [countdown, setCountdown] = useState(300);
  const [showStatusMessage, setShowStatusMessage] = useState(true);
  const [statusFading, setStatusFading] = useState(false);
  const navigate = useNavigate();

  // Constants
  const courseKey = "statistics";
  const lessonNumber = "lesson1";
  const WORKSHEET_POINTS = 5;

  // Log function for debugging
  const log = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[WS ${timestamp}] ${message}`);
  };

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
        setCompletionStatus(
          `Please stay on this page & continue reading to earn worksheet points... (${countdown}s)`
        );
      }, 1000);

      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      // When countdown reaches 0, mark as completed
      markWorksheetAsCompleted();
    }
  }, [countdown]);

  // Auto-complete the worksheet after countdown reaches 0
  useEffect(() => {
    log("Worksheet loaded, countdown started");

    // Cleanup function
    return () => {
      log("Cleaning up timers");
      if (completionTimer) {
        clearTimeout(completionTimer);
      }
    };
  }, []);

  // Function to fade out status message
  const fadeOutStatusMessage = () => {
    setStatusFading(true);
    setTimeout(() => {
      setShowStatusMessage(false);
      setStatusFading(false);
    }, 500); // Match this to the CSS transition time
  };

  // Function to mark worksheet as completed and update backend
  const markWorksheetAsCompleted = async () => {
    if (completed) return;

    log("Marking worksheet as completed");
    setCompleted(true);
    setCompletionStatus("✓ Marking worksheet as completed...");

    try {
      // Get current progress data
      log("Fetching current progress data");
      const userProgress = await call_api(null, "points", "GET");

      if (!userProgress) {
        log("No user progress data returned");
        setCompletionStatus("❌ Error: Could not fetch user progress");

        // Fade out after showing error for a bit longer
        setTimeout(() => fadeOutStatusMessage(), 30000);
        return;
      }

      log("Progress data received, updating worksheet completion");

      // Create a deep clone of the userProgress
      const updatedProgress = JSON.parse(JSON.stringify(userProgress));

      // Ensure all needed objects exist
      if (!updatedProgress.courses[courseKey]) {
        updatedProgress.courses[courseKey] = { lessons: {} };
      }

      if (!updatedProgress.courses[courseKey].lessons[lessonNumber]) {
        updatedProgress.courses[courseKey].lessons[lessonNumber] = {
          activities: {},
        };
      }

      if (
        !updatedProgress.courses[courseKey].lessons[lessonNumber].activities
      ) {
        updatedProgress.courses[courseKey].lessons[lessonNumber].activities =
          {};
      }

      // Ensure worksheet activity exists
      if (
        !updatedProgress.courses[courseKey].lessons[lessonNumber].activities
          .worksheet
      ) {
        updatedProgress.courses[courseKey].lessons[
          lessonNumber
        ].activities.worksheet = {};
      }

      // Update worksheet progress
      updatedProgress.courses[courseKey].lessons[
        lessonNumber
      ].activities.worksheet.completed = true;
      updatedProgress.courses[courseKey].lessons[
        lessonNumber
      ].activities.worksheet.earned = WORKSHEET_POINTS;

      // Update lesson points
      const videoPoints =
        updatedProgress.courses[courseKey].lessons[lessonNumber].activities
          .video?.earned || 0;
      updatedProgress.courses[courseKey].lessons[lessonNumber].lessonPoints =
        videoPoints + WORKSHEET_POINTS;

      // Check if lesson is completed
      const isVideoCompleted =
        updatedProgress.courses[courseKey].lessons[lessonNumber].activities
          .video?.completed || false;

      // Only mark lesson as complete if both video and worksheet are complete
      updatedProgress.courses[courseKey].lessons[lessonNumber].completed =
        isVideoCompleted && true; // worksheet is now completed

      // Recalculate course points
      let coursePoints = 0;
      Object.values(updatedProgress.courses[courseKey].lessons).forEach(
        (lesson) => {
          coursePoints += lesson.lessonPoints || 0;
        }
      );
      updatedProgress.courses[courseKey].coursePoints = coursePoints;

      // Check if course is completed
      const allLessonsCompleted = Object.values(
        updatedProgress.courses[courseKey].lessons
      ).every((lesson) => lesson.completed);
      updatedProgress.courses[courseKey].completed = allLessonsCompleted;

      // Recalculate total points
      let totalPoints = 0;
      Object.values(updatedProgress.courses).forEach((course) => {
        totalPoints += course.coursePoints || 0;
      });
      updatedProgress.totalPoints = totalPoints;

      log("Sending updated progress to backend");
      setCompletionStatus("✓ Saving progress...");

      // Send to backend
      const response = await call_api(updatedProgress, "points", "POST");

      if (response) {
        log("Points updated successfully");
        setCompletionStatus("✓ Worksheet completed! (5 points earned)");

        // Fade out the status message after 300 seconds
        setTimeout(() => fadeOutStatusMessage(), 30000);
      }
    } catch (error) {
      console.error("Error updating worksheet completion:", error);
      setCompletionStatus("❌ Error updating progress");

      // Fade out after showing error for a bit longer
      setTimeout(() => fadeOutStatusMessage(), 30000);
    }
  };

  const handleGoBack = () => {
    log("Back button clicked");

    // Ensure worksheet is marked as completed before navigating back
    if (!completed) {
      // markWorksheetAsCompleted();
    }

    // Wait briefly to ensure the update has been sent
    setTimeout(() => {
      window.history.back();
    }, 500);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "white",
      margin: "0",
      padding: "32px",
      fontFamily: "Arial, sans-serif",
      position: "relative",
    },
    content: {
      maxWidth: "896px",
      margin: "0 auto",
    },
    logo: {
      maxWidth: "300px",
      marginBottom: "30px",
      display: "block",
      margin: "0 auto 30px",
    },
    title: {
      color: "#254E17",
      fontSize: "48px",
      marginBottom: "10px",
      fontFamily: "Orbitron, sans-serif",
      textAlign: "center",
    },
    subtitle: {
      color: "#357717",
      fontSize: "36px",
      marginBottom: "30px",
      fontFamily: "Orbitron, sans-serif",
      textAlign: "center",
    },
    instructions: {
      marginBottom: "30px",
      lineHeight: "1.6",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "30px",
    },
    th: {
      border: "1px solid #ddd",
      padding: "12px",
      backgroundColor: "#f5f5f5",
      textAlign: "left",
    },
    td: {
      border: "1px solid #ddd",
      padding: "12px",
    },
    circlesContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center",
      marginTop: "30px",
    },
    backButton: {
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
    },
    instructions: {
      marginBottom: "30px",
      lineHeight: "1.6",
      backgroundColor: "#f9f9f9",
      padding: "20px",
      borderRadius: "10px",
    },
    printButton: {
      backgroundColor: "#357717",
      color: "white",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      display: "block",
      margin: "20px auto",
      fontSize: "12px",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    mainContent: {
      backgroundColor: "#f9f9f9",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "20px",
    },
    completionStatus: {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "10px 15px",
      backgroundColor: completed
        ? "rgba(53, 119, 23, 0.8)"
        : "rgba(41, 128, 185, 0.8)",
      color: "white",
      borderRadius: "5px",
      fontWeight: "bold",
      zIndex: 1000,
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      fontSize: "16px",
      opacity: statusFading ? 0 : 1,
      transform: statusFading ? "translateY(-10px)" : "translateY(0)",
      transition: "opacity 0.5s ease, transform 0.5s ease",
      display: showStatusMessage ? "block" : "none",
    },
  };

  return (
    <div style={styles.container}>
      <button
        onClick={handleGoBack}
        style={styles.backButton}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        &#8592;
      </button>

      {/* Completion status notification */}
      <div style={styles.completionStatus}>{completionStatus}</div>

      <div style={styles.content}>
        <img src={stemzLearningLogo} alt="STEMZ Learning" style={styles.logo} />
        <h1 style={styles.title}>Fraction Game</h1>
        <h2 style={styles.subtitle}>Statistics: Lesson 1</h2>

        <div style={styles.instructions}>
          <h3>Instructions:</h3>
          <p>
            If you are able, print the page with circles on it. If not, you can
            draw it yourself.
          </p>

          <p>
            <strong>Option 1: Draw your own circles</strong>
          </p>
          <ul>
            <li>
              Draw and trace 5 circles on paper. Color the circles in the colors
              listed below.
            </li>
            <li>
              Cut the circles out, you should have 5 circles colored red, blue,
              purple, black, and green.
            </li>
            <li>
              Cut the circles according to the color code below (ex. Cut the red
              circle into 2, the blue circle into 3, ext.)
            </li>
          </ul>

          <p>
            <strong>Option 2: Use the printed version</strong>
          </p>
          <ul>
            <li>
              Color the circles based on the color code below (ex. Color the
              circle split in 2, red; color the circle split in 3, blue; ext.)
            </li>
            <li>
              Cut along the black lines. You should have 5 circles. One should
              be cut into 2 pieces, one into 3 pieces, one into 4 pieces, one
              into 6 pieces, and one into 8 pieces.
            </li>
          </ul>

          <button onClick={handleDownload} style={styles.printButton}>
            Download PDF Version
          </button>
        </div>

        <div style={styles.mainContent}>
          <h3>Color Code</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Color</th>
                <th style={styles.th}>Cut into this many equal pieces</th>
                <th style={styles.th}>Tips</th>
              </tr>
            </thead>
            <tbody>
              {colorCodes.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{
                      ...styles.td,
                      color:
                        item.color === "Black"
                          ? "black"
                          : item.color.toLowerCase(),
                    }}
                  >
                    <strong>{item.color}</strong>
                  </td>
                  <td style={styles.td}>Cut into {item.pieces} pieces</td>
                  <td style={styles.td}>{item.tips}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.circlesContainer}>
            <CircleDiagram slices={2} />
            <CircleDiagram slices={3} />
            <CircleDiagram slices={4} />
            <CircleDiagram slices={6} />
            <CircleDiagram slices={8} />
          </div>
        </div>
      </div>
    </div>
  );
}
