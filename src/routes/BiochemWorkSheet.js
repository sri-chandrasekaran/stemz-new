import React, { useState } from "react";
import stemzLearningLogo from "../assets/logo.png"; // Ensure this path is correct

const BiochemistryLesson = () => {
  const [isProteinsExpanded, setIsProteinsExpanded] = useState(false);
  const [isCarbohydratesExpanded, setIsCarbohydratesExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const toggleProteins = () => setIsProteinsExpanded(prev => !prev);
  const toggleCarbohydrates = () => setIsCarbohydratesExpanded(prev => !prev);

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
    sectionStyle: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: '24px',
      overflow: 'hidden',
    },
    buttonStyle: {
      width: '100%',
      textAlign: 'left',
      padding: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'linear-gradient(to right, #357717, #254E17)',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
    },
    arrowStyle: (isExpanded) => ({
      width: '10px',
      height: '10px',
      borderTop: '2px solid white',
      borderRight: '2px solid white',
      transform: isExpanded ? 'rotate(-135deg)' : 'rotate(45deg)',
    }),
    contentStyle: {
      padding: '24px',
      backgroundColor: '#f9f9f9',
      borderBottom: '4px solid #357717',
    },
  };

  const Section = ({ title, content, isExpanded, onToggle }) => (
    <div style={styles.sectionStyle}>
      <button style={styles.buttonStyle} onClick={onToggle}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>{title}</h3>
        <div style={styles.arrowStyle(isExpanded)}></div>
      </button>
      {isExpanded && (
        <div style={styles.contentStyle}>
          {content}
        </div>
      )}
    </div>
  );

  const ListItem = ({ children }) => (
    <li style={{ 
      display: 'flex', 
      alignItems: 'flex-start', 
      marginBottom: '12px',
      color: '#444',
      fontSize: '16px',
      lineHeight: '1.5'
    }}>
      <div style={{ 
        flexShrink: 0, 
        width: '8px', 
        height: '8px', 
        marginTop: '8px', 
        marginRight: '12px', 
        borderRadius: '50%', 
        backgroundColor: '#254E17' 
      }}></div>
      <span>{children}</span>
    </li>
  );

  const headingStyle = {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#357717',
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
        <h1 style={styles.title}>Proteins and Carbohydrates</h1>
        <h2 style={styles.subtitle}>Biochemistry: Lesson 2</h2>

        <Section
          title="Proteins"
          isExpanded={isProteinsExpanded}
          onToggle={toggleProteins}
          content={
            <div style={{ color: '#374151' }}>
              <div style={{ marginBottom: '24px' }}>
                <h4 style={headingStyle}>What are proteins?</h4>
                <p style={{ lineHeight: '1.5' }}>
                  Proteins are long chains of amino acids. There are thousands of different proteins in the human body. They provide all sorts of functions to help us survive.
                </p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={headingStyle}>What are amino acids?</h4>
                <p style={{ lineHeight: '1.5' }}>
                  Amino acids are special organic molecules used by living organisms to make proteins. The main elements in amino acids are carbon, hydrogen, oxygen, and nitrogen. There are twenty different kinds of amino acids that combine to make proteins in our bodies. Our bodies can actually make some amino acids, but the rest we must get from our food.
                </p>
              </div>

              <div>
                <h4 style={headingStyle}>Different Types of Proteins</h4>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <ListItem><strong>Structural</strong> - Many proteins provide structure for our bodies. This includes collagen which is found in cartilage and tendons.</ListItem>
                  <ListItem><strong>Defensive</strong> - Proteins help protect us from diseases. They make up antibodies that fight off foreign invaders such as bacteria and other toxic substances.</ListItem>
                  <ListItem><strong>Transport</strong> - Proteins can help to carry essential nutrients around our bodies. One example is hemoglobin which carries oxygen in our red blood cells.</ListItem>
                  <ListItem><strong>Catalysts</strong> - Some proteins, such as enzymes, act as catalysts to assist in chemical reactions. They help us to break up and digest our food so it can be used by our cells.</ListItem>
                </ul>
              </div>
            </div>
          }
        />

        <Section
          title="Carbohydrates"
          isExpanded={isCarbohydratesExpanded}
          onToggle={toggleCarbohydrates}
          content={
            <div style={{ color: '#374151' }}>
              <div style={{ marginBottom: '24px' }}>
                <h4 style={headingStyle}>What do they do?</h4>
                <p style={{ lineHeight: '1.5' }}>
                  Carbohydrates are important to the daily lives of living organisms. They store energy (starches), provide energy for cells (glucose), and provide structure to plants and some animals.
                </p>
              </div>

              <div>
                <h4 style={headingStyle}>Types of Carbohydrates</h4>
                <p style={{ marginBottom: '16px', lineHeight: '1.5' }}>
                  Carbohydrates are sometimes referred to as saccharides. The different types of carbohydrates all have the word "saccharide" in them.
                </p>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <ListItem><strong>Monosaccharides</strong> -  Monosaccharides are the simplest form of carbohydrates. They include sugars such as glucose and fructose. Monosaccharides often taste sweet and dissolve in water. Glucose is a common carbohydrate found in plants and is the main product of photosynthesis.</ListItem>
                  <ListItem><strong>Disaccharides</strong> -  Disaccharides are formed from two Monosaccharides. They are also known as sugars such as sucrose and lactose. Lactose is the carbohydrate found in milk.</ListItem>
                  <ListItem><strong>Oligosaccharides</strong> -  Oligosaccharides are formed from a small number (usually three to six) of monosaccharides.</ListItem>
                  <ListItem><strong>Polysaccharides</strong> -  Polysaccharides are long carbohydrate molecules. They are often called complex carbohydrates.</ListItem>
                </ul>
                <h4 style={headingStyle}> There are four important types of complex carbohydrates:</h4>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <ListItem><strong>Starches</strong> -  Starches are a way that many plants store energy. We can then eat starches and our bodies will use the energy.</ListItem>
                  <ListItem><strong>Glycogen</strong> -  Animals use glycogen to store energy. It is stored in the liver and the muscles to be used when needed.</ListItem>
                  <ListItem><strong>Cellulose</strong> -  Cellulose is used in plants as a structural molecule. It can't be digested by animals.</ListItem>
                  <ListItem><strong>Chitin</strong> -  Chitin is used as a structural molecule in fungi and arthropods.</ListItem>
                </ul>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default BiochemistryLesson;