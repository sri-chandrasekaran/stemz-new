import React, { useState, useRef, useEffect } from 'react';
import stemzLearningLogo from "../assets/logo.png";

const terms = [
  { id: 'question', term: 'Question' },
  { id: 'hypothesis', term: 'Hypothesis' },
  { id: 'experiment', term: 'Experiment' },
  { id: 'analyze', term: 'Analyze' },
  { id: 'reflect', term: 'Reflect' },
];

const definitions = [
  { id: 'def1', text: 'Both teams will pick the "2 candies per person" card.' },
  { id: 'def2', text: 'My hypothesis was correct because I picked the "2 candies per person" card.' },
  { id: 'def3', text: 'Which card will both teams pick?' },
  { id: 'def4', text: 'Choosing either the "1 candy per person" card or the "2 candies per person" card and determining whether both teams get candy or just one.' },
  { id: 'def5', text: 'You picked one card over the other because you thought it would benefit you more than the other.' },
];

const correctMatches = {
  'question': 'def3',
  'hypothesis': 'def1',
  'experiment': 'def4',
  'analyze': 'def2',
  'reflect': 'def5',
};

const colors = [
  '#FFCB6B', '#CCBADA', '#45B7D1', '#FFA07A', '#98D8C8'
];

export default function PsychWorkSheet1() {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [clickedTerms, setClickedTerms] = useState({});
  const [isHovering, setIsHovering] = useState(false);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const termsRef = useRef({});
  const defsRef = useRef({});

  const handleTermClick = (termId) => {
    setSelectedTerm(termId);
    setClickedTerms(prev => ({ ...prev, [termId]: true }));
  };

  const handleDefinitionClick = (defId) => {
    if (selectedTerm) {
      setMatches(prev => ({
        ...prev,
        [selectedTerm]: defId
      }));
    }
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setMatches({});
    setShowResults(false);
    setSelectedTerm(null);
    setClickedTerms({});
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const getItemStyle = (id, isDefinition = false) => {
    if (showResults) {
      if (isDefinition) {
        const matchedTerm = Object.keys(matches).find(term => matches[term] === id);
        return matchedTerm && correctMatches[matchedTerm] === id
          ? { backgroundColor: '#3cb371', color: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }
          : { backgroundColor: '#CF3434', color: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' };
      } else {
        return matches[id] === correctMatches[id] 
          ? { backgroundColor: '#3cb371', color: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } 
          : { backgroundColor: '#CF3434', color: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' };
      }
    }
    if (isDefinition) {
      const matchedTerm = Object.keys(matches).find(term => matches[term] === id);
      return matchedTerm 
        ? { 
            backgroundColor: colors[terms.findIndex(t => t.id === matchedTerm)],
            color: '#ffffff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          } 
        : { backgroundColor: '#f0f0f0', color: '#333333', border: '1px solid #cccccc', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' };
    } else {
      return clickedTerms[id]
        ? { 
            backgroundColor: colors[terms.findIndex(t => t.id === id)],
            color: '#ffffff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            border: '2px solid #333333'
          } 
        : { backgroundColor: '#f0f0f0', color: '#333333', border: '1px solid #cccccc', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' };
    }
  };

  useEffect(() => {
    const drawLines = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      Object.entries(matches).forEach(([termId, defId]) => {
        const termElement = termsRef.current[termId];
        const defElement = defsRef.current[defId];
        if (termElement && defElement) {
          const termRect = termElement.getBoundingClientRect();
          const defRect = defElement.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          const startX = termRect.right - containerRect.left;
          const startY = termRect.top + termRect.height / 2 - containerRect.top;
          const endX = defRect.left - containerRect.left;
          const endY = defRect.top + defRect.height / 2 - containerRect.top;

          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = colors[terms.findIndex(t => t.id === termId)];
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
    };

    drawLines();
    window.addEventListener('resize', drawLines);
    return () => window.removeEventListener('resize', drawLines);
  }, [matches, showResults]);

  const styles = {
    instructions: {
      lineHeight: '1.6',
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '10px',
      maxWidth: '991px',
      margin: '0 auto 30px',
      textAlign: 'left',
    },
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
        <h1 style={styles.title}>Turning the Game into an Experiment</h1>
        <h2 style={styles.subtitle}>Psychology: Lesson 1</h2>


        <div ref={containerRef} style={{ position: 'relative', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '20px' }}>
        <div style={styles.instructions}>
          <h3>Instructions:</h3>
        </div>
          <p style={{ textAlign: 'center', color: '#666666', marginBottom: '30px' }}>
            The game we played was fun, but how can psychologists use it to conduct an experiment? Match each scientific method step with its correct example.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ width: '45%', paddingLeft: '20px' }}>
              <h3 style={{ color: '#333333', marginBottom: '15px' }}>Steps</h3>
              {terms.map((term) => (
                <div
                  key={term.id}
                  ref={el => termsRef.current[term.id] = el}
                  onClick={() => handleTermClick(term.id)}
                  style={{
                    padding: '12px 15px',
                    margin: '10px 0',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: 'bold',
                    ...getItemStyle(term.id)
                  }}
                >
                  {term.term}
                </div>
              ))}
            </div>
            
            <div style={{ width: '45%' }}>
              <h3 style={{ color: '#333333', marginBottom: '15px' }}>Examples</h3>
              {definitions.map((def) => (
                <div
                  key={def.id}
                  ref={el => defsRef.current[def.id] = el}
                  onClick={() => handleDefinitionClick(def.id)}
                  style={{
                    padding: '12px 15px',
                    margin: '10px 0',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    ...getItemStyle(def.id, true)
                  }}
                >
                  {def.text}
                </div>
              ))}
            </div>
          </div>
          
          <canvas 
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          />
          
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
              onClick={checkAnswers}
              style={{
                padding: '12px 25px',
                fontSize: '16px',
                backgroundColor: '#3cb371',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '15px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
            >
              Check Answers
            </button>
            <button
              onClick={resetQuiz}
              style={{
                padding: '12px 25px',
                fontSize: '16px',
                backgroundColor: '#CF3434',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
            >
              Reset Quiz
            </button>
          </div>
          
          {showResults && (
          <div style={{ 
            marginTop: '30px', 
            textAlign: 'center', 
            padding: '15px', 
            backgroundColor: Object.keys(matches).length === terms.length && 
              Object.keys(matches).every((termId) => correctMatches[termId] === matches[termId])
              ? '#e8f5e9'  
              : '#ffebee', 
            borderRadius: '5px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)' 
          }}>
            <p style={{ 
              color: Object.keys(matches).length === terms.length && 
                Object.keys(matches).every((termId) => correctMatches[termId] === matches[termId])
                ? '#3cb371'  
                : '#CF3434',
              fontSize: '18px', 
              fontWeight: 'bold' 
            }}>
              {Object.keys(matches).length === terms.length && 
              Object.keys(matches).every((termId) => correctMatches[termId] === matches[termId])
                ? 'Congratulations! All answers are correct.'
                : Object.keys(matches).length === 0 
                  ? 'Please match all items before checking answers.'
                  : 'Some answers are incorrect. Please review and try again.'}
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}