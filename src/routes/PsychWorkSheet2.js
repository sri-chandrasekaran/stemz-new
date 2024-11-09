import React, { useState, useEffect, useRef } from "react";
import { Timer } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import stemzLearningLogo from "../assets/logo.png";

const mathProblems = [
  // Row 1
  [
    { top: 1, bottom: 5 },
    { top: 3, bottom: 8 },
    { top: 9, bottom: 7 },
    { top: 5, bottom: 2 },
    { top: 7, bottom: 7 },
    { top: 9, bottom: 5 },
    { top: 6, bottom: 4 },
    { top: 4, bottom: 5 },
    { top: 9, bottom: 4 },
    { top: 5, bottom: 9 },
  ],
  // Row 2
  [
    { top: 2, bottom: 1 },
    { top: 8, bottom: 9 },
    { top: 1, bottom: 9 },
    { top: 8, bottom: 6 },
    { top: 9, bottom: 6 },
    { top: 1, bottom: 4 },
    { top: 8, bottom: 1 },
    { top: 8, bottom: 3 },
    { top: 7, bottom: 7 },
    { top: 6, bottom: 9 },
  ],
  // Row 3
  [
    { top: 1, bottom: 8 },
    { top: 8, bottom: 4 },
    { top: 7, bottom: 3 },
    { top: 7, bottom: 5 },
    { top: 8, bottom: 8 },
    { top: 2, bottom: 9 },
    { top: 7, bottom: 7 },
    { top: 1, bottom: 6 },
    { top: 3, bottom: 9 },
    { top: 3, bottom: 9 },
  ],
  // Row 4
  [
    { top: 8, bottom: 9 },
    { top: 1, bottom: 2 },
    { top: 5, bottom: 8 },
    { top: 9, bottom: 2 },
    { top: 4, bottom: 8 },
    { top: 7, bottom: 6 },
    { top: 4, bottom: 2 },
    { top: 6, bottom: 6 },
    { top: 2, bottom: 2 },
    { top: 8, bottom: 2 },
  ],
  // Row 5
  [
    { top: 8, bottom: 1 },
    { top: 9, bottom: 1 },
    { top: 7, bottom: 6 },
    { top: 5, bottom: 6 },
    { top: 3, bottom: 3 },
    { top: 3, bottom: 4 },
    { top: 6, bottom: 8 },
    { top: 7, bottom: 8 },
    { top: 6, bottom: 1 },
    { top: 4, bottom: 3 },
  ],
  // Row 6
  [
    { top: 8, bottom: 5 },
    { top: 6, bottom: 7 },
    { top: 6, bottom: 7 },
    { top: 3, bottom: 7 },
    { top: 7, bottom: 9 },
    { top: 6, bottom: 8 },
    { top: 3, bottom: 2 },
    { top: 8, bottom: 7 },
    { top: 9, bottom: 6 },
    { top: 4, bottom: 6 },
  ],
  // Row 7
  [
    { top: 1, bottom: 1 },
    { top: 9, bottom: 8 },
    { top: 9, bottom: 3 },
    { top: 9, bottom: 5 },
    { top: 6, bottom: 5 },
    { top: 9, bottom: 7 },
    { top: 9, bottom: 8 },
    { top: 4, bottom: 7 },
    { top: 5, bottom: 1 },
    { top: 2, bottom: 4 },
  ],
  // Row 8
  [
    { top: 1, bottom: 3 },
    { top: 2, bottom: 8 },
    { top: 7, bottom: 4 },
    { top: 6, bottom: 6 },
    { top: 2, bottom: 7 },
    { top: 9, bottom: 9 },
    { top: 6, bottom: 3 },
    { top: 7, bottom: 8 },
    { top: 7, bottom: 1 },
    { top: 3, bottom: 6 },
  ],
  // Row 9
  [
    { top: 4, bottom: 4 },
    { top: 7, bottom: 9 },
    { top: 6, bottom: 2 },
    { top: 4, bottom: 9 },
    { top: 4, bottom: 1 },
    { top: 5, bottom: 4 },
    { top: 5, bottom: 3 },
    { top: 8, bottom: 8 },
    { top: 2, bottom: 6 },
    { top: 8, bottom: 7 },
  ],
  // Row 10
  [
    { top: 5, bottom: 5 },
    { top: 1, bottom: 7 },
    { top: 3, bottom: 1 },
    { top: 8, bottom: 5 },
    { top: 2, bottom: 5 },
    { top: 7, bottom: 5 },
    { top: 6, bottom: 9 },
    { top: 5, bottom: 7 },
    { top: 2, bottom: 3 },
    { top: 3, bottom: 5 },
  ],
];

export default function PsychWorkSheet2() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ row: 0, col: 0 });
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef([]);

  // Initialize input refs
  useEffect(() => {
    inputRefs.current = Array(10)
      .fill(0)
      .map(() => Array(10).fill(null));
  }, []);

  // Timer logic
  useEffect(() => {
    let intervalId;
    if (isTimerRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
      setShowResults(true);
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning, timeLeft]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isTimerRunning) return;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setCurrentPosition((prev) => ({
            ...prev,
            row: prev.row > 0 ? prev.row - 1 : 9,
          }));
          break;
        case "ArrowDown":
          e.preventDefault();
          setCurrentPosition((prev) => ({
            ...prev,
            row: prev.row < 9 ? prev.row + 1 : 0,
          }));
          break;
        case "ArrowLeft":
          e.preventDefault();
          setCurrentPosition((prev) => ({
            ...prev,
            col: prev.col > 0 ? prev.col - 1 : 9,
          }));
          break;
        case "ArrowRight":
          e.preventDefault();
          setCurrentPosition((prev) => ({
            ...prev,
            col: prev.col < 9 ? prev.col + 1 : 0,
          }));
          break;
        case "Enter":
          e.preventDefault();
          if (inputRefs.current[currentPosition.row][currentPosition.col]) {
            inputRefs.current[currentPosition.row][currentPosition.col].focus();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTimerRunning, currentPosition]);

  const handleInputChange = (rowIndex, colIndex, value) => {
    const key = `${rowIndex}-${colIndex}`;
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const checkAnswer = (rowIndex, colIndex) => {
    const problem = mathProblems[rowIndex][colIndex];
    const key = `${rowIndex}-${colIndex}`;
    const userAnswer = parseInt(answers[key]);
    return userAnswer === problem.top * problem.bottom;
  };

  const handleStartTimer = () => {
    setTimeLeft(60);
    setIsTimerRunning(true);
    setShowResults(false);
    setAnswers({});
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    setTimeLeft(60);
    setIsTimerRunning(false);
    setShowResults(false);
    setAnswers({});
  };

  const handleSubmit = () => {
    setShowResults(true);
    setIsTimerRunning(false);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setTimeLeft(60);
    setIsTimerRunning(false);
  };

  const handleGoBack = () => {
    window.history.back();
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
    problemGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(10, 1fr)",
      gap: "15px",
      marginBottom: "30px",
    },
    problem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "10px",
      backgroundColor: "#f9f9f9",
    },
    multiplication: {
      display: "flex",
      alignItems: "center",
      marginBottom: "5px",
    },
    number: {
      fontSize: "18px",
      marginRight: "5px",
    },
    input: {
      width: "50px",
      padding: "5px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      textAlign: "center",
    },
    buttons: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginTop: "30px",
    },
    button: {
      padding: "12px 25px",
      fontSize: "16px",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    submitButton: {
      backgroundColor: "#3cb371",
    },
    resetButton: {
      backgroundColor: "#CF3434",
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
    correct: {
      backgroundColor: "#e8f5e9",
      borderColor: "#3cb371",
    },
    incorrect: {
      backgroundColor: "#ffebee",
      borderColor: "#CF3434",
    },
    timerContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      marginBottom: "20px",
    },
    timerDisplay: {
      fontSize: "24px",
      fontWeight: "bold",
      color: timeLeft <= 10 ? "#CF3434" : "#254E17",
    },
    timerButtons: {
      display: "flex",
      gap: "10px",
    },
    timerButton: {
      padding: "8px 16px",
      fontSize: "14px",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    pdfLink: {
      display: "block",
      textAlign: "center",
      marginTop: "20px",
      color: "#357717",
      textDecoration: "none",
      fontSize: "16px",
    },
    currentBox: {
      boxShadow: "0 0 0 2px #3cb371",
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

      <div style={styles.content}>
        <img src={stemzLearningLogo} alt="STEMZ Learning" style={styles.logo} />
        <h1 style={styles.title}>The Math Experiment</h1>
        <h2 style={styles.subtitle}>Psychology: Week 2</h2>

        <div style={styles.timerContainer}>
          <Timer size={24} color="#254E17" />
          <span style={styles.timerDisplay}>
            {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </span>
          <div style={styles.timerButtons}>
            <button
              onClick={handleStartTimer}
              style={{ ...styles.timerButton, backgroundColor: "#3cb371" }}
              disabled={isTimerRunning}
            >
              Start
            </button>
            <button
              onClick={handleStopTimer}
              style={{ ...styles.timerButton, backgroundColor: "#CF3434" }}
              disabled={!isTimerRunning}
            >
              Stop
            </button>
            <button
              onClick={handleResetTimer}
              style={{ ...styles.timerButton, backgroundColor: "#357717" }}
            >
              Reset
            </button>
          </div>
        </div>

        {timeLeft === 0 && (
          <Alert className="mb-4">
            <AlertDescription>
              Time's up! Your answers have been automatically submitted.
            </AlertDescription>
          </Alert>
        )}

        {mathProblems.map((row, rowIndex) => (
          <div key={rowIndex} style={styles.problemGrid}>
            {row.map((problem, colIndex) => {
              const key = `${rowIndex}-${colIndex}`;
              const answered = answers[key] !== undefined;
              const correct = showResults && checkAnswer(rowIndex, colIndex);
              const isCurrent =
                currentPosition.row === rowIndex &&
                currentPosition.col === colIndex;

              return (
                <div
                  key={colIndex}
                  style={{
                    ...styles.problem,
                    ...(showResults && answered
                      ? correct
                        ? styles.correct
                        : styles.incorrect
                      : {}),
                    ...(isCurrent && isTimerRunning ? styles.currentBox : {}),
                  }}
                >
                  <div style={styles.multiplication}>
                    <span style={styles.number}>{problem.top}</span>
                    <span style={styles.number}>×</span>
                    <span style={styles.number}>{problem.bottom}</span>
                    <span style={styles.number}>=</span>
                  </div>
                  <input
                    ref={(el) => (inputRefs.current[rowIndex][colIndex] = el)}
                    type="number"
                    value={answers[key] || ""}
                    onChange={(e) =>
                      handleInputChange(rowIndex, colIndex, e.target.value)
                    }
                    style={styles.input}
                    disabled={!isTimerRunning}
                  />
                </div>
              );
            })}
          </div>
        ))}

        <div style={styles.buttons}>
          <button
            onClick={handleSubmit}
            style={{ ...styles.button, ...styles.submitButton }}
          >
            Check Answers
          </button>
          <button
            onClick={handleReset}
            style={{ ...styles.button, ...styles.resetButton }}
          >
            Reset
          </button>
        </div>

        <a
          href="/path-to-pdf.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.pdfLink}
        >
          Prefer to do this by hand? Download the PDF version here
        </a>
      </div>
    </div>
  );
}
