import React, { useState } from 'react';
import stemzLearningLogo from "../assets/logo.png";

const questions = [
  {
    id: 1,
    text: "Which of the following is the ancestor of a human?",
    options: [
      { letter: 'a', text: 'hippo' },
      { letter: 'b', text: 'dinosaur' },
      { letter: 'c', text: 'ape' },
      { letter: 'd', text: 'kangaroo' }
    ],
    correctAnswer: 'c'
  },
  {
    id: 2,
    text: "Which of the following is the descendant of the dinosaurs? (hint: look for similar traits that were not eliminated through evolution!)",
    options: [
      { letter: 'a', text: 'penguin' },
      { letter: 'b', text: 'crocodile' },
      { letter: 'c', text: 'elephant' },
      { letter: 'd', text: 'porcupine' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 3,
    text: "Which is an example of a neutral mutation for a lion?",
    options: [
      { letter: 'a', text: 'smaller teeth' },
      { letter: 'b', text: 'stronger legs' },
      { letter: 'c', text: 'sharper senses' },
      { letter: 'd', text: 'darker hair' }
    ],
    correctAnswer: 'd'
  },
  {
    id: 4,
    text: "Which islands did Charles Darwin travel to that led him to his discovery?",
    options: [
      { letter: 'a', text: 'Hawaiian Islands' },
      { letter: 'b', text: 'Canary Islands' },
      { letter: 'c', text: 'Caribbean Islands' },
      { letter: 'd', text: 'Galapagos Islands' }
    ],
    correctAnswer: 'd'
  },
  {
    id: 5,
    text: "Mosquitoes becoming immune to pesticides over time is an example of what?",
    options: [
      { letter: 'a', text: 'Harmful Mutation' },
      { letter: 'b', text: 'Biodiversity' },
      { letter: 'c', text: 'Evolution' },
      { letter: 'd', text: 'None of the Above' }
    ],
    correctAnswer: 'c'
  }
];

export default function ZooWorkSheet2() {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleOptionSelect = (questionId, letter) => {
    if (!showResults) {
      setSelectedOptions(prev => ({
        ...prev,
        [questionId]: letter
      }));
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedOptions({});
    setShowResults(false);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const getOptionStyle = (questionId, optionLetter) => {
    const baseStyle = {
      padding: '15px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      cursor: !showResults ? 'pointer' : 'default',
      transition: 'all 0.3s ease',
      backgroundColor: 'white',
      marginBottom: '8px'
    };

    if (!showResults && selectedOptions[questionId] === optionLetter) {
      return {
        ...baseStyle,
        backgroundColor: '#e8f5e9',
        border: '1px solid #3cb371'
      };
    }

    if (showResults) {
      if (selectedOptions[questionId] === optionLetter) {
        if (optionLetter === questions.find(q => q.id === questionId).correctAnswer) {
          return {
            ...baseStyle,
            backgroundColor: 'rgba(60, 179, 113, 0.2)',
            border: '1px solid #ddd'
          };
        } else {
          return {
            ...baseStyle,
            backgroundColor: 'rgba(207, 52, 52, 0.2)',
            border: '1px solid #ddd'
          };
        }
      }
    }

    return baseStyle;
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'white',
      margin: '0',
      padding: '32px',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
    },
    content: {
      maxWidth: '896px',
      margin: '0 auto',
    },
    logo: {
      maxWidth: '300px',
      marginBottom: '30px',
      display: 'block',
      margin: '0 auto 30px',
    },
    title: {
      color: '#254E17',
      fontSize: '48px',
      marginBottom: '10px',
      fontFamily: 'Orbitron, sans-serif',
      textAlign: 'center',
    },
    subtitle: {
      color: '#357717',
      fontSize: '36px',
      marginBottom: '30px',
      fontFamily: 'Orbitron, sans-serif',
      textAlign: 'center',
    },
    instructions: {
      marginBottom: '30px',
    },
    question: {
      marginBottom: '30px',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    questionText: {
      fontWeight: 'bold',
      marginBottom: '15px',
    },
    options: {
      display: 'grid',
      gap: '10px',
    },
    buttons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '30px',
    },
    button: {
      padding: '12px 25px',
      fontSize: '16px',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    submitButton: {
      backgroundColor: '#3cb371',
    },
    resetButton: {
      backgroundColor: '#CF3434',
    },
    backButton: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      background: isHovering ? '#3cb371' : '#357717',
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '36px',
      fontWeight: 'bold',
      transform: isHovering ? 'scale(0.9)' : 'scale(1)',
    },
    resultMessage: {
      textAlign: 'center',
      padding: '15px',
      marginTop: '20px',
      borderRadius: '5px',
    }
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
        <h1 style={styles.title}>Darwin's Theory of Evolution</h1>
        <h2 style={styles.subtitle}>Zoology: Lesson 2</h2>

        <div style={styles.instructions}>
          <h3>Instructions:</h3>
          <p>Click on the correct answer for each question.</p>
        </div>

        {questions.map((question) => (
          <div key={question.id} style={styles.question}>
            <div style={styles.questionText}>
              {question.id}. {question.text}
            </div>
            <div style={styles.options}>
              {question.options.map((option) => (
                <div
                  key={option.letter}
                  onClick={() => handleOptionSelect(question.id, option.letter)}
                  style={getOptionStyle(question.id, option.letter)}
                >
                  {option.letter}. {option.text}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={styles.buttons}>
          <button 
            onClick={handleSubmit}
            style={{...styles.button, ...styles.submitButton}}
            disabled={showResults}
          >
            Check Answers
          </button>
          <button 
            onClick={handleReset}
            style={{...styles.button, ...styles.resetButton}}
          >
            Reset
          </button>
        </div>

        {showResults && (
          <div style={{
            ...styles.resultMessage,
            backgroundColor: Object.entries(selectedOptions).every(
              ([id, answer]) => answer === questions.find(q => q.id === parseInt(id)).correctAnswer
            ) ? '#e8f5e9' : '#ffebee',
            color: Object.entries(selectedOptions).every(
              ([id, answer]) => answer === questions.find(q => q.id === parseInt(id)).correctAnswer
            ) ? '#3cb371' : '#CF3434',
          }}>
            <p style={{ fontWeight: 'bold' }}>
              {Object.entries(selectedOptions).every(
                ([id, answer]) => answer === questions.find(q => q.id === parseInt(id)).correctAnswer
              )
                ? 'Congratulations! All answers are correct!'
                : 'Some answers are incorrect. Please review and try again.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}