import React, { useState } from "react";
import blankStarMap from "../../assets/StarMap.svg";
import filledStarMap from "../../assets/StarMapFilled.png";
import stemzLearningLogo from "../../assets/logo.png";

const handleDownload = () => {
  window.open(
    "https://docs.google.com/document/d/e/2PACX-1vRzjSp4DciyO8OjCR_k_nf_4_cbGIzLCWkt7mRAHScRbpH_lqS5D_Q3hvxnseVt6P0KvVcKnSnSNEMe/pub",
    "_blank"
  );
};

const AstroWorksheet2 = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const toggleMap = () => {
    setIsRevealed(!isRevealed);
  };

  const handleGoBack = () => {
    window.history.back();
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
