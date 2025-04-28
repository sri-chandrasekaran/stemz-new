import React, { useState } from 'react';
import stemzLearningLogo from "../../assets/logo.png";

const animals = ['Elephants', 'Lion', 'Crocodile', 'Horses'];
const columnAnimals = ['Mosquito', 'Cheetah', 'Giraffe', 'Birds'];

const relationshipTypes = [
  { value: 'mutualism', label: 'Mutualism (both benefit)', color: '#90EE90' },
  { value: 'commensalism', label: 'Commensalism (one benefits, other neutral)', color: '#87CEEB' },
  { value: 'predation', label: 'Predation (one eats other)', color: '#FFB6C1' },
  { value: 'parasitism', label: 'Parasitism (one benefits, other is harmed)', color: '#DDA0DD' },
  { value: 'competition', label: 'Competition (competing for resources)', color: '#F0E68C' },
  { value: 'neutralism', label: 'Neutralism (unaffected by each other)', color: '#D3D3D3' }
];

// TODO: Subjected to revision, correct answers may vary depending on the context
const correctAnswers = {
  'Elephants-Mosquito': 'parasitism',
  'Elephants-Cheetah': 'neutralism',
  'Elephants-Giraffe': 'competition',
  'Elephants-Birds': 'commensalism',
  'Lion-Mosquito': 'parasitism',
  'Lion-Cheetah': 'competition',
  'Lion-Giraffe': 'predation',
  'Lion-Birds': 'neutralism',
  'Crocodile-Mosquito': 'parasitism',
  'Crocodile-Cheetah': 'neutralism',
  'Crocodile-Giraffe': 'predation',
  'Crocodile-Birds': 'commensalism',
  'Horses-Mosquito': 'parasitism',
  'Horses-Cheetah': 'predation',
  'Horses-Giraffe': 'competition',
  'Horses-Birds': 'mutualism'
};

const correctKeystoneSpecies = 'Elephants';

export default function AnimalBehaviors() {
  const [relationships, setRelationships] = useState({});
  const [keystoneSpecies, setKeystoneSpecies] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({});
  const [isHovering, setIsHovering] = useState(false);

  const handleRelationshipChange = (rowAnimal, colAnimal, value) => {
    if (!showResults) {
      setRelationships(prev => ({
        ...prev,
        [`${rowAnimal}-${colAnimal}`]: value
      }));
    }
  };

  const handleKeystoneSelect = (animal) => {
    if (!showResults) {
      setKeystoneSpecies(animal);
    }
  };

  const checkAnswer = (rowAnimal, colAnimal) => {
    const key = `${rowAnimal}-${colAnimal}`;
    const userAnswer = relationships[key];
    return userAnswer === correctAnswers[key];
  };

  const handleCheckAnswers = () => {
    const newResults = {};
    animals.forEach(rowAnimal => {
      columnAnimals.forEach(colAnimal => {
        const key = `${rowAnimal}-${colAnimal}`;
        newResults[key] = checkAnswer(rowAnimal, colAnimal);
      });
    });
    setResults(newResults);
    setShowResults(true);
  };

  const handleReset = () => {
    setRelationships({});
    setKeystoneSpecies(null);
    setShowResults(false);
    setResults({});
  };

  const handleGoBack = () => {
    window.history.back();
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
      maxWidth: '1200px',
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
    definitions: {
      marginBottom: '30px',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
    },
    relationshipType: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
    },
    colorBox: {
      width: '20px',
      height: '20px',
      marginRight: '10px',
      borderRadius: '4px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '30px',
      marginBottom: '30px',
    },
    th: {
      padding: '15px',
      border: '1px solid #ddd',
      backgroundColor: '#f5f5f5',
      textAlign: 'center',
    },
    td: {
      padding: '15px',
      border: '1px solid #ddd',
      position: 'relative',
      transition: 'all 0.3s ease',
    },
    select: {
      width: '100%',
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      backgroundColor: 'transparent',
    },
    animalCell: {
      padding: '15px',
      border: '1px solid #ddd',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    keystoneHighlight: {
      backgroundColor: '#FFD700',
      fontWeight: 'bold',
    },
    keystoneCorrect: {
      background: 'linear-gradient(#e8f5e9, #e8f5e9), #FFD700',
    },
    keystoneIncorrect: {
      background: 'linear-gradient(#ffebee, #ffebee), #FFD700',
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
      backgroundColor: '#e8f5e9',
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
        <h1 style={styles.title}>Animal Behaviors</h1>
        <h2 style={styles.subtitle}>Zoology: Lesson 4</h2>

        <div style={styles.definitions}>
          <h3>Instructions:</h3>
          <ul>
            <li>Identify the symbiotic relationship between the animals.
              <ul>
                <li>In each box, write the symbiotic relationship between the animals in each row/column.</li>
              </ul>
            </li>
            <li>Click on the animal that is most likely to be a keystone species.</li>
          </ul>
        </div>

        <div style={styles.definitions}>
          <h3>Helpful Definitions:</h3>
          <h4>Symbiotic relationships:</h4>
          {relationshipTypes.map(type => (
            <div key={type.value} style={styles.relationshipType}>
              <div style={{...styles.colorBox, backgroundColor: type.color}}></div>
              <div>{type.label}</div>
            </div>
          ))}
          <h4>Keystone species: a species that other species in the ecosystem depend on a lot</h4>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Safari Ecosystem</th>
              {columnAnimals.map(animal => (
                <th key={animal} style={styles.th}>{animal}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {animals.map(rowAnimal => (
              <tr key={rowAnimal}>
                <td 
                  style={{
                    ...styles.animalCell,
                    ...(keystoneSpecies === rowAnimal ? styles.keystoneHighlight : {}),
                    ...(showResults && keystoneSpecies === rowAnimal ? 
                      (keystoneSpecies === correctKeystoneSpecies ? 
                        styles.keystoneCorrect : styles.keystoneIncorrect) : {})
                  }}
                  onClick={() => handleKeystoneSelect(rowAnimal)}
                >
                  {rowAnimal}
                </td>
                {columnAnimals.map(colAnimal => {
                  const key = `${rowAnimal}-${colAnimal}`;
                  const relationship = relationships[key];
                  const relationshipColor = relationship ? 
                    relationshipTypes.find(t => t.value === relationship)?.color : 
                    'white';
                  
                  return (
                    <td 
                      key={colAnimal} 
                      style={{
                        ...styles.td,
                        background: showResults
                          ? `linear-gradient(${
                              results[key] 
                                ? '#e8f5e9' 
                                : '#ffebee'
                            }, ${
                              results[key] 
                                ? '#e8f5e9' 
                                : '#ffebee'
                            }), ${relationshipColor}`
                          : relationshipColor,
                      }}
                    >
                      <select
                        style={styles.select}
                        value={relationship || ''}
                        onChange={(e) => handleRelationshipChange(rowAnimal, colAnimal, e.target.value)}
                        disabled={showResults}
                      >
                        <option value="">Select relationship...</option>
                        {relationshipTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.buttons}>
          <button 
            onClick={handleCheckAnswers}
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
          marginTop: '30px', 
          textAlign: 'center', 
          padding: '15px', 
          backgroundColor: (
            Object.values(results).every(Boolean) && 
            keystoneSpecies === correctKeystoneSpecies
          ) ? '#e8f5e9' : '#ffebee',
          borderRadius: '5px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <p style={{ 
            color: (
              Object.values(results).every(Boolean) && 
              keystoneSpecies === correctKeystoneSpecies
            ) ? '#3cb371' : '#CF3434',
            fontSize: '18px', 
            fontWeight: 'bold' 
          }}>
            {!Object.keys(relationships).length 
              ? "Please fill in all relationships and keystone species."
              : Object.keys(relationships).length < (animals.length * columnAnimals.length)
                ? "Please fill in all relationships and keystone species."
                : !keystoneSpecies
                  ? "Please select a keystone species before checking."
                  : Object.values(results).every(Boolean) && keystoneSpecies === correctKeystoneSpecies
                    ? 'Congratulations! All answers are correct!'
                    : 'Some answers are incorrect. Please review and try again.'}
          </p>
        </div>
      )}
      </div>
    </div>
  );
}