import React, { useState, useEffect } from "react";
import mercury from "../../assets/mercury.png";
import jupiter from "../../assets/jupiter.png";
import venus from "../../assets/venus.png";
import saturn from "../../assets/saturn.png";
import earth from "../../assets/earth.png";
import mars from "../../assets/mars.png";
import uranus from "../../assets/uranus.png";
import neptune from "../../assets/neptune.png";
import stemzLearningLogo from "../../assets/logo.png";
import { call_api } from "../../api";
import { useNavigate } from "react-router-dom";

const planets = [
  {
    name: "Mercury",
    description:
      "Mercury's surface is covered with craters. It is the closest planet to the Sun, but has very little atmosphere. This makes Mercury very hot on the side where it faces the Sun, and very cold on the side away from the Sun. Mercury orbits the Sun quickly, but rotates around itself very slowly. This creates very short years and very long days.",
    image: mercury,
    isWide: false,
  },
  {
    name: "Venus",
    description:
      "Venus is similar to Earth in size and density. It has a large iron core and silicate mantle. It has very thick clouds, which reflect sunlight well. This makes it very bright, and easy for us to observe in space. The clouds are full of carbon dioxide and acid, which traps heat very well. This makes Venus the hottest planet.  The lack of impact craters tell us that the planet's surface keeps changing, perhaps due to volcanic eruptions. The rotation is also very slow, creating very long days.",
    image: venus,
    isWide: false,
  },
  {
    name: "Earth",
    description:
      "Earth revolves around the Sun once every 365.25 days – this is known as one Earth year. Earth is the fifth largest planet of the Solar System, and is the largest terrestrial planet. The surface of Earth is covered by water, around 71%, only 29% of Earth's surface is covered by land.",
    image: earth,
    isWide: false,
  },
  {
    name: "Mars",
    description:
      "Mars is very similar to Earth, except it is smaller, colder, and drier. The red color of Mars comes from the amount of iron oxide in its soil. The planet contains a large amount of massive volcanoes. There is also ice on Mars, suggesting that water may have existed on this planet before. Mars has a weak atmosphere, and a lower atmospheric temperature. Mars has two moons, named Phobos and Deimos.",
    image: mars,
    isWide: false,
  },
  {
    name: "Jupiter",
    description:
      "Jupiter is the largest object in the solar system, besides the Sun. It is made mostly of hydrogen and helium, making it much less dense than the Earth. Due to its orbit, a year on Jupiter is 12 times longer than a year on Earth. There are many storms on the planet, caused by ammonia clouds. One of the largest storms is the Great Red Spot, which has existed on the planet for more than 300 years.",
    image: jupiter,
    isWide: true,
  },
  {
    name: "Saturn",
    description:
      "Saturn is a gas giant, known for its large rings. It is the second largest planet in the solar system, and also the least dense. Due to its orbit, a year on Saturn is 30 times longer than a year on Earth. Saturn's rings are made of particles such as water, ice, dust, and rocks. They are held together by the gravitational force of Saturn and its moons. Saturn has 7 moons that are all relatively small.",
    image: saturn,
    isWide: true,
  },
  {
    name: "Uranus",
    description:
      "Uranus is a large gas giant, making it less dense than the Earth. Due to its orbit, a year on Uranus is 84 times longer than a year on Earth. The methane clouds on the planet give Uranus a blue-green color. It has a faint set of rings that show how the planet rotates horizontally, instead of rotating vertically. Uranus has 27 moons, most of them named after characters from Shakespeare's plays.",
    image: uranus,
    isWide: false,
  },
  {
    name: "Neptune",
    description:
      "Neptune is slightly smaller than Uranus, and the furthest away from the Sun. Due to its orbit, a year on Neptune is 165 times longer than a year on Earth. Frozen methane gives Neptune its blue color. Dark spots on Neptune are gaps in the methane clouds. The winds on Neptune are extremely harsh, reaching up to speeds of 1100 km/h. Neptune's core is extremely hot, but the temperatures at the surface are one of the coldest in the solar system. Neptune has 13 moons, but only Triton is spherical in shape.",
    image: neptune,
    isWide: false,
  },
];

const planetColors = {
  Mercury: "#888888",
  Venus: "#db9112",
  Earth: "#4169e1",
  Mars: "#ff4500",
  Jupiter: "#7a511b",
  Saturn: "#f4a460",
  Uranus: "#40e0d0",
  Neptune: "#4169e1",
};

const AstroWorksheet1 = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
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
  const lessonNumber = "lesson1";
  const WORKSHEET_POINTS = 5;

  // Log function for debugging
  const log = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[WS ${timestamp}] ${message}`);
  };

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      updatedProgress.courses[courseKey].lessons[lessonNumber].completed =
        isVideoCompleted;

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

  // Handle going back to the video page
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
      textAlign: "center",
      padding: "15px",
      fontFamily: "Arial, sans-serif",
      backgroundImage: "url(path/to/space-background.jpg)",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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
    planetList: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "30px",
      width: "95%",
      maxWidth: "1400px",
    },
    card: {
      border: "3px solid #357717",
      borderRadius: "20px",
      padding: "10px",
      display: "flex",
      alignItems: "center",
      width: isMobile ? "100%" : "calc(50% - 15px)",
      height: "375px",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(5px)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    imageContainer: {
      width: "250px",
      height: "250px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginRight: "20px",
      overflow: "hidden",
    },
    planetImage: {
      width: "150px",
      height: "150px",
      objectFit: "contain",
      animation: "$float 3s ease-in-out infinite",
      transition: "transform 0.3s ease",
    },
    widePlanetImage: {
      width: "170px",
      height: "130px",
      objectFit: "contain",
      animation: "$float 3s ease-in-out infinite",
      transition: "transform 0.3s ease",
    },
    contentContainer: {
      flex: 1,
      textAlign: "left",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      justifyContent: "space-between",
    },
    planetName: {
      color: "#357717",
      fontSize: "32px",
      marginBottom: "10px",
      fontFamily: "Orbitron, sans-serif",
    },
    description: {
      fontSize: "16px",
      color: "#000",
      flexGrow: 1,
      overflowY: "auto",
      lineHeight: "1.5",
    },
    logo: {
      maxWidth: "300px",
      marginBottom: "30px",
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
      <h1 style={styles.title}>The Solar System</h1>
      <h2 style={styles.subtitle}>Astronomy: Lesson 1</h2>
      <div style={styles.planetList}>
        {planets.map((planet, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              borderColor: planetColors[planet.name],
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0px 4px 20px rgba(255, 255, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={styles.imageContainer}>
              <img
                src={planet.image}
                alt={planet.name}
                style={
                  planet.isWide ? styles.widePlanetImage : styles.planetImage
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </div>
            <div style={styles.contentContainer}>
              <h3
                style={{
                  ...styles.planetName,
                  color: planetColors[planet.name],
                }}
              >
                {planet.name}
              </h3>
              <p style={styles.description}>{planet.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AstroWorksheet1;
