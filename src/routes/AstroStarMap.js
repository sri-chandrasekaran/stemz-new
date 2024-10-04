import React, { useState } from 'react';
import blankStarMap from '../assets/StarMap.svg';
import filledStarMap from '../assets/StarMapFilled.png';
import stemzLearningLogo from '../assets/logo.png'; // Make sure this path is correct

const AstroStarMap = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  const toggleMap = () => {
    setIsRevealed(!isRevealed);
  };

  const styles = {
    container: {
      textAlign: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    logo: {
      maxWidth: '300px',
      marginBottom: '20px',
    },
    title: {
      color: '#2e8b57',
      fontSize: '48px',
      marginBottom: '10px',
    },
    subtitle: {
      color: '#3cb371',
      fontSize: '36px',
      marginBottom: '30px',
    },
    starMapContainer: {
      position: 'relative',
      width: '100%',
      maxWidth: '991px',
      margin: '0 auto',
      cursor: 'pointer',
    },
    starMap: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: 'auto',
      transition: 'opacity 0.5s ease-in-out',
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
  };

  return (
    <div style={styles.container}>
      <img src={stemzLearningLogo} alt="STEMZ Learning" style={styles.logo} />
      <h1 style={styles.title}>Humans and Space</h1>
      <h2 style={styles.subtitle}>Astronomy: Lesson 3</h2>
      <div style={styles.starMapContainer} onClick={toggleMap}>
        <img 
          src={blankStarMap} 
          alt="Star Map" 
          style={{
            ...styles.starMap,
            ...(isRevealed ? styles.starMapFadeOut : {})
          }}
        />
        <img 
          src={filledStarMap} 
          alt="Star Map with Constellations" 
          style={{
            ...styles.starMap,
            ...styles.starMapFilled,
            ...(isRevealed ? styles.starMapFilledFadeIn : {})
          }}
        />
      </div>
    </div>
  );
};

export default AstroStarMap;