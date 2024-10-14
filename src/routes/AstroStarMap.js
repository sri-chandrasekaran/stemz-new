import React, { useState } from 'react';
import blankStarMap from '../assets/StarMap.svg';
import filledStarMap from '../assets/StarMapFilled.png';
import stemzLearningLogo from '../assets/logo.png';

const AstroStarMap = () => {
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
      textAlign: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    logo: {
      maxWidth: '300px',
      marginBottom: '20px',
    },
    title: {
      color: '#254E17',
      fontSize: '48px',
      marginBottom: '10px',
      fontFamily: 'Orbitron, sans-serif',
    },
    subtitle: {
      color: '#357717',
      fontSize: '36px',
      marginBottom: '30px',
      fontFamily: 'Orbitron, sans-serif',
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
    speechBubble: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: 'white',
      border: '3px solid #357717',
      borderRadius: '20px',
      padding: '10px 15px',
      maxWidth: '200px',
      fontSize: '16px',
      textAlign: 'center',
      color: '#357717',
      boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
      zIndex: 10,
    },
    speechBubbleTail: {
      content: '""',
      position: 'absolute',
      bottom: '-19px',
      right: '153px', 
      border: '10px solid transparent',
      borderTopColor: 'white',
      zIndex: 11,
    },
    speechBubbleTailBorder: {
      content: '""',
      position: 'absolute',
      bottom: '-26px',
      right: '150px',
      border: '13px solid transparent',
      borderTopColor: '#357717',
      zIndex: 9,
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
      <h1 style={styles.title}>Humans and Space</h1>
      <h2 style={styles.subtitle}>Astronomy: Lesson 3</h2>
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