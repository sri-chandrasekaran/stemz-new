import React, { useState, useRef, useEffect } from 'react';
import stemzLearningLogo from "../../assets/logo.png";

const terms = [
  { id: 'zoology', term: 'Zoology' },
  { id: 'taxonomy', term: 'Taxonomy' },
  { id: 'binomial', term: 'Binomial Naming System' },
  { id: 'herbivore', term: 'Herbivore' },
  { id: 'vertebrate', term: 'Vertebrate' },
  { id: 'tetrapod', term: 'Tetrapod' },
  { id: 'reptiles', term: 'Reptiles' },
  { id: 'fungi', term: 'Fungi' },
];

const definitions = [
  { id: 'def1', text: 'Animal that has 4 legs or descended from a 4-legged ancestor.' },
  { id: 'def2', text: 'The scientific study of naming and classifying groups of living organisms based on their characteristics.' },
  { id: 'def3', text: 'Animals that eat plants and vegetation.' },
  { id: 'def4', text: 'Vertebrate animals that have scales and lay their eggs on land.' },
  { id: 'def5', text: 'Animals with a spinal cord.' },
  { id: 'def6', text: 'Feeding on organic matter; not animals, plants, or bacteria.' },
  { id: 'def7', text: 'A system zoologists use to name species.' },
  { id: 'def8', text: 'The scientific study of the classification, structure, distribution, behavior, and physiology of animals.' },
];

const correctMatches = {
  'zoology': 'def8', 
  'taxonomy': 'def2', 
  'binomial': 'def7', 
  'herbivore': 'def3',
  'vertebrate': 'def5',
  'tetrapod': 'def1', 
  'reptiles': 'def4', 
  'fungi': 'def6',
};

const colors = [
  '#FFCB6B', '#CCBADA', '#45B7D1', '#FFA07A', '#98D808', 
  '#AFAFFF', '#AFBF29', '#CD2233'
];

export default function ZooWorkSheet1() {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [clickedTerms, setClickedTerms] = useState({});
  const [isHovering, setIsHovering] = useState(false);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const termsRef = useRef({});
  const defsRef = useRef({});


  const getTermForDefinition = (defId) => {
    return Object.entries(matches).find(([_, value]) => value === defId)?.[0];
  };

  const isDefinitionMatched = (defId) => {
      return Object.values(matches).some(matchedDefId => matchedDefId === defId);
  };

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
      const matchedTerm = getTermForDefinition(id);
      if (matchedTerm) {
        const isCurrentSelectedTerm = matchedTerm === selectedTerm;
        return {
          backgroundColor: colors[terms.findIndex(t => t.id === matchedTerm)],
          color: '#ffffff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          cursor: isCurrentSelectedTerm ? 'pointer' : 'not-allowed',
          opacity: isCurrentSelectedTerm ? '1' : '0.9'
        };
      }
      return {
        backgroundColor: '#f0f0f0',
        color: '#333333',
        border: '1px solid #cccccc',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        cursor: 'pointer'
      };
    }else {
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
        <h1 style={styles.title}>Categories</h1>
        <h2 style={styles.subtitle}>Zoology: Lesson 1</h2>

        <div ref={containerRef} style={{ position: 'relative', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '20px' }}>
          <p style={{ textAlign: 'center', color: '#666666', marginBottom: '30px' }}>
            Match the term to the correct definition. You will find the definitions as we go through the lesson.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ width: '45%', paddingLeft: '20px' }}>
              <h3 style={{ color: '#333333', marginBottom: '15px' }}>Terms</h3>
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
              {Object.keys(matches).length === 0 
                ? "Please match some terms before checking answers."
                : Object.keys(matches).length === terms.length && 
                  Object.keys(matches).every((termId) => correctMatches[termId] === matches[termId])
                  ? 'Congratulations! All answers are correct.'
                  : Object.keys(matches).length < terms.length
                    ? 'Please match all terms before checking answers.'
                    : 'Some matches are incorrect. Please review and try again.'}
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}