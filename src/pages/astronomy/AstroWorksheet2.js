import React, { useState, useEffect } from "react";
import blankStarMap from "../../assets/StarMap.svg";
import filledStarMap from "../../assets/StarMapFilled.png";
import stemzLearningLogo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { call_api } from "../api";

const AstroWorksheet2 = () => {
  const [isRevealed, setIsRevealed] = useState(false);
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
  const courseKey = "astronomy";
  const lessonNumber = "lesson3";
  const WORKSHEET_POINTS = 5;

  // Log function for debugging
  const log = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[WS ${timestamp}] ${message}`);
  };

  const handleDownload = () => {
    window.open(
      "https://docs.google.com/document/d/e/2PACX-1vRzjSp4DciyO8OjCR_k_nf_4_cbGIzLCWkt7mRAHScRbpH_lqS5D_Q3hvxnseVt6P0KvVcKnSnSNEMe/pub",
      "_blank"
    );
  };

  const toggleMap = () => {
    setIsRevealed(!isRevealed);
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
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
    },
    logo: {
      maxWidth: "300px",
      marginBottom: "20px",
      textAlign: "center",
    },
    title: {
      color: "#254E17",
      fontSize: "48px",
      marginBottom: "10px",
      fontFamily: "Orbitron, sans-serif",
    },
    subtitle: {
      color: "#357717",
      fontSize: "36px",
      marginBottom: "30px",
      fontFamily: "Orbitron, sans-serif",
    },
    starMapContainer: {
      position: "relative",
      width: "100%",
      maxWidth: "991px",
      margin: "0 auto",
      cursor: "pointer",
    },
    starMap: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "auto",
      transition: "opacity 0.5s ease-in-out",
    },
    starMapFilled: {
      opacity: 0,
    },
    starMapFadeOut: {
      opacity: 0,
    },
    starMapFilledFadeIn: {
      opacity: 1,
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
    speechBubble: {
      position: "absolute",
      top: "10px",
      right: "10px",
      backgroundColor: "white",
      border: "3px solid #357717",
      borderRadius: "20px",
      padding: "10px 15px",
      maxWidth: "200px",
      fontSize: "16px",
      textAlign: "center",
      color: "#357717",
      boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
      zIndex: 10,
    },
    speechBubbleTail: {
      content: '""',
      position: "absolute",
      bottom: "-19px",
      right: "153px",
      border: "10px solid transparent",
      borderTopColor: "white",
      zIndex: 11,
    },
    speechBubbleTailBorder: {
      content: '""',
      position: "absolute",
      bottom: "-26px",
      right: "150px",
      border: "13px solid transparent",
      borderTopColor: "#357717",
      zIndex: 9,
    },
    instructions: {
      marginBottom: "30px",
      lineHeight: "1.6",
      backgroundColor: "#f9f9f9",
      padding: "20px",
      borderRadius: "10px",
      maxWidth: "991px",
      margin: "0 auto 30px",
      textAlign: "left",
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

      <img src={stemzLearningLogo} alt="STEMZ Learning" style={styles.logo} />
      <h1 style={styles.title}>Star Map</h1>
      <h2 style={styles.subtitle}>Astronomy: Lesson 3</h2>

      <div style={styles.instructions}>
        <h3>Instructions:</h3>
        <ul>
          <li>
            Watch the video carefully and try to identify the constellations
            shown.
          </li>
          <li>Click on the image to reveal the answers and check your work.</li>
          <li>Click again to hide the answers. Happy searching!</li>
        </ul>

        <p
          style={{
            textAlign: "center",
            color: "#666666",
            fontSize: "14px",
            marginTop: "10px",
          }}
        >
          Prefer to practice on paper? Download the printable version below
        </p>

        <button onClick={handleDownload} style={styles.printButton}>
          Download PDF Version
        </button>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.starMapContainer} onClick={toggleMap}>
          <div style={styles.speechBubble}>
            Click on the image to reveal all answers!
            <div style={styles.speechBubbleTail}></div>
            <div style={styles.speechBubbleTailBorder}></div>
          </div>
          <img
            src={blankStarMap}
            alt="Star Map"
            style={{
              ...styles.starMap,
              ...(isRevealed ? styles.starMapFadeOut : {}),
            }}
          />
          <img
            src={filledStarMap}
            alt="Star Map with Constellations"
            style={{
              ...styles.starMap,
              ...styles.starMapFilled,
              ...(isRevealed ? styles.starMapFilledFadeIn : {}),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AstroWorksheet2;
