import React, { useState } from "react";
import stemzLearningLogo from "../assets/logo.png";
import statsWorksheet4 from "../assets/statsworksheet4.png";

export default function StatWorkSheet4() {
  const [isHovering, setIsHovering] = useState(false);
  const [answers, setAnswers] = useState({
    graphType: "",
    reasoning: "",
    studentCounts: {
      A: "",
      B: "",
      C: "",
      D: "",
      F: "",
    },
  });
  const [showResults, setShowResults] = useState(false);

  // Correct answers for student counts
  const correctCounts = {
    A: "3",
    B: "7",
    C: "10",
  };

  const handleInputChange = (field, value) => {
    if (field.startsWith("studentCounts.")) {
      const grade = field.split(".")[1];
      setAnswers((prev) => ({
        ...prev,
        studentCounts: {
          ...prev.studentCounts,
          [grade]: value,
        },
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const resetAnswers = () => {
    setAnswers({
      graphType: "",
      reasoning: "",
      studentCounts: {
        A: "",
        B: "",
        C: "",
        D: "",
        F: "",
      },
    });
    setShowResults(false);
  };

  const isStudentCountCorrect = (grade) => {
    return answers.studentCounts[grade] === correctCounts[grade];
  };

  const areAllCountsCorrect = () => {
    return Object.keys(correctCounts).every((grade) =>
      isStudentCountCorrect(grade)
    );
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
    section: {
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "15px",
      color: "#254E17",
    },
    list: {
      listStyleType: "disc",
      paddingLeft: "20px",
      marginBottom: "15px",
    },
    listItem: {
      marginBottom: "8px",
      lineHeight: "1.6",
    },
    chartContainer: {
      maxWidth: "600px",
      margin: "30px auto",
      textAlign: "center",
    },
    chart: {
      width: "100%",
      maxWidth: "500px",
      height: "auto",
      marginBottom: "30px",
    },
    question: {
      marginBottom: "20px",
      fontSize: "16px",
      lineHeight: "1.6",
    },
    questionNumber: {
      fontWeight: "bold",
      marginRight: "8px",
    },
    footer: {
      marginTop: "40px",
      textAlign: "center",
      color: "#666",
      fontSize: "16px",
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
    textField: {
      width: "100%",
      padding: "10px",
      marginTop: "10px",
      marginBottom: "15px",
      borderRadius: "5px",
      border: "1px solid #ddd",
      fontSize: "16px",
    },
    studentCountsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: "15px",
      marginTop: "15px",
    },
    gradeInput: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    gradeLabel: {
      fontWeight: "bold",
      marginBottom: "5px",
    },
    numberInput: {
      width: "60px",
      padding: "8px",
      borderRadius: "5px",
      border: "1px solid #ddd",
      textAlign: "center",
    },
    checkButton: {
      backgroundColor: "#3cb371",
      color: "white",
      padding: "12px 25px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      marginRight: "10px",
      fontSize: "16px",
      transition: "all 0.3s ease",
    },
    resetButton: {
      backgroundColor: "#CF3434",
      color: "white",
      padding: "12px 25px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      transition: "all 0.3s ease",
    },
    buttonsContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
    },
    correct: {
      backgroundColor: "#e8f5e9",
      border: "1px solid #3cb371",
    },
    incorrect: {
      backgroundColor: "#ffebee",
      border: "1px solid #CF3434",
    },
    resultMessage: {
      textAlign: "center",
      marginTop: "15px",
      padding: "10px",
      borderRadius: "5px",
      fontWeight: "bold",
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
        <h1 style={styles.title}>Create Your Own Graph!</h1>
        <h2 style={styles.subtitle}>Statistics: Lesson 4</h2>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>Materials Needed:</div>
          <ul style={styles.list}>
            <li style={styles.listItem}>Scratch Paper</li>
            <li style={styles.listItem}>Coloring pencils/pens/crayons</li>
          </ul>

          <div style={styles.sectionTitle}>Instructions:</div>
          <p style={styles.listItem}>
            Look at the pie chart below. It shows the grades of 20 students in
            third grade. The teacher of the class wants to see how her students
            are doing more clearly. Turn the pie chart into a different type of
            graph where the teacher can more clearly see how many students are
            in each category.
          </p>
        </div>

        <div style={styles.chartContainer}>
          <img
            src={statsWorksheet4}
            alt="Student's Grades Pie Chart"
            style={styles.chart}
          />
        </div>
        <div style={styles.section}>
          <div style={styles.question}>
            <span style={styles.questionNumber}>1.</span>
            What type of graph will you use? Why?
            <textarea
              value={answers.reasoning}
              onChange={(e) => handleInputChange("reasoning", e.target.value)}
              placeholder="Enter the type of graph and explain why you chose this type of graph"
              style={{ ...styles.textField, height: "100px" }}
            />
          </div>

          <div style={styles.question}>
            <span style={styles.questionNumber}>2.</span>
            How many students are in each grade category? (Total: 20 students)
            <div style={styles.studentCountsGrid}>
              {["A", "B", "C"].map((grade) => (
                <div key={grade} style={styles.gradeInput}>
                  <label style={styles.gradeLabel}>Grade {grade}</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={answers.studentCounts[grade]}
                    onChange={(e) =>
                      handleInputChange(
                        `studentCounts.${grade}`,
                        e.target.value
                      )
                    }
                    style={{
                      ...styles.numberInput,
                      ...(showResults && {
                        ...(isStudentCountCorrect(grade)
                          ? styles.correct
                          : styles.incorrect),
                      }),
                    }}
                  />
                  {showResults && (
                    <div
                      style={{
                        color: isStudentCountCorrect(grade)
                          ? "#3cb371"
                          : "#CF3434",
                      }}
                    >
                      {isStudentCountCorrect(grade) ? "✓" : "✗"}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {showResults && (
            <div style={{ 
              marginTop: '30px', 
              textAlign: 'center', 
              padding: '15px', 
              backgroundColor: areAllCountsCorrect()
                ? '#e8f5e9'  
                : '#ffebee',
              borderRadius: '5px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }}>
              <p style={{ 
                color: areAllCountsCorrect()
                  ? '#3cb371'  
                  : '#CF3434', 
                fontSize: '18px', 
                fontWeight: 'bold' 
              }}>
                {!answers.studentCounts.A && !answers.studentCounts.B && !answers.studentCounts.C
                  ? "Please enter student counts before checking answers."
                  : areAllCountsCorrect()
                    ? "Congratulations! Your student counts are correct."
                    : "Some counts are incorrect. Remember, we're looking at 20 students total."}
              </p>
            </div>
          )}
          </div>

          <div style={styles.buttonsContainer}>
            <button onClick={checkAnswers} style={styles.checkButton}>
              Check Answers
            </button>
            <button onClick={resetAnswers} style={styles.resetButton}>
              Reset
            </button>
          </div>

          <div style={styles.question}>
            <span style={styles.questionNumber}>3.</span>
            Create your graph!
          </div>

          <div style={styles.footer}>
            Go back to the slides once you've finished.
          </div>
        </div>
      </div>
    </div>
  );
}
