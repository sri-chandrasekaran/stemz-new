import React, { useState, useRef, useEffect } from 'react';
import stemzLearningLogo from "../assets/logo.png"; 
import { createWorksheetProgress, fetchWorksheetProgress, updateWorksheetProgress } from "../worksheet";

const worksheetId = "circuit-worksheet-1";
let existing_progress = await fetchWorksheetProgress(worksheetId);

const terms = [
  { id: 'capacitor', term: 'Capacitor' },
  { id: 'resistors', term: 'Resistors' },
  { id: 'diodes', term: 'Diodes' },
  { id: 'conductors', term: 'Conductors' },
  { id: 'inductors', term: 'Inductors' },
];

const definitions = [
  { id: 'def1', text: 'Part of an electric circuit that limits the power of an electric current in a circuit.' },
  { id: 'def2', text: 'An object that allows the flow of electric current, in one or more directions.' },
  { id: 'def3', text: 'Electrical part that is in charge of storing electrical energy in the form of magnetic energy.' },
  { id: 'def4', text: 'Devices used to store electrical energy in an electric field.' },
  { id: 'def5', text: 'An electronic piece that conducts current in a singular direction.' },
];

const correctMatches = {
  'capacitor': 'def4',
  'resistors': 'def1',
  'diodes': 'def5',
  'conductors': 'def2',
  'inductors': 'def3',
};

const colors = [
  '#FFCB6B', '#CCBADA', '#45B7D1', '#FFA07A', '#98D8C8'
];

export default function CircuitWorkSheet1() {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [clickedTerms, setClickedTerms] = useState({});
  const [isHovering, setIsHovering] = useState(false);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const termsRef = useRef({});
  const defsRef = useRef({});

  // Fetch existing progress when the component mounts
  useEffect(() => {
    const fetchProgress = async () => {
      const progressData = await fetchWorksheetProgress(worksheetId); // Adjust userEmail and worksheetId as needed
      if (progressData && Object.keys(progressData).length > 0) {
        setMatches(progressData.progress || {}); // Default to an empty object if progress is null
        Object.keys(progressData.progress || {}).forEach(termId => {
          handleTermClick(termId); // Mark each term as clicked
        });
      }
    };

    fetchProgress();
  }, []); // Empty dependency array to run only once on mount

  const handleTermClick = (termId) => {
    setSelectedTerm(termId);
    setClickedTerms(prev => ({ ...prev, [termId]: true }));
  };

  const handleDefinitionClick = (defId) => {
    if (!selectedTerm) return;

    // No multi to one matches
    if (matches[selectedTerm] === defId) return;

    if (isDefinitionMatched(defId) && getTermForDefinition(defId) !== selectedTerm) return;

    setMatches(prev => ({
        ...prev,
        [selectedTerm]: defId
    }));
  };

  const checkAnswers = async () => {
    setShowResults(true);
    if (existing_progress) {
      await updateWorksheetProgress(worksheetId, matches);
    } else {
      await createWorksheetProgress(worksheetId, matches);
      existing_progress = await fetchWorksheetProgress(worksheetId);
    }
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
        const matchedTerm = Object.keys(matches || {}).find(term => matches[term] === id);
        return matchedTerm && correctMatches[matchedTerm] === id
          ? { backgroundColor: '#3cb371', color: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }
          : { backgroundColor: '#CF3434', color: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' };
      } else {
        return (matches || {})[id] === correctMatches[id] 
          ? { backgroundColor: '#3cb371', color: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } 
          : { backgroundColor: '#CF3434', color: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' };
      }
    }
    if (isDefinition) {
      const matchedTerm = Object.keys(matches || {}).find(term => matches[term] === id);
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
        <h1 style={styles.title}>Circuit Components Quiz</h1>
        <h2 style={styles.subtitle}>Circuit: Lesson 2</h2>

        <div ref={containerRef} style={{ position: 'relative', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '20px' }}>
          <p style={{ textAlign: 'center', color: '#666666', marginBottom: '30px' }}>Match each circuit component with its correct definition. Click "Check Answers" when you're done.</p>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ width: '45%', paddingLeft: '20px' }}>
              <h3 style={{ color: '#333333', marginBottom: '15px' }}>Components</h3>
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
              <h3 style={{ color: '#333333', marginBottom: '15px' }}>Definitions</h3>
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
                : 'Some answers are incorrect or missing. Please review and try again.'}
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}