import React from 'react';
import stemzLearningLogo from "../../assets/logo.png";

const colorCodes = [
  { color: 'Red', pieces: 2, tips: '' },
  { color: 'Blue', pieces: 3, tips: '' },
  { color: 'Green', pieces: 4, tips: '' },
  { color: 'Purple', pieces: 6, tips: 'Cut in half then cut each piece in 3' },
  { color: 'Black', pieces: 8, tips: 'Cut into 4 pieces then cut each piece in half' },
];

const handleDownload = () => {
  window.open('https://docs.google.com/document/d/e/2PACX-1vQqKPBJD-85m_sQdbX__cWr0pS2SNtdPQubY2gr6r3_00jc9zWbn5cfOEUx8Ffs_xM9Fs8H29KCC_vc/pub', '_blank');
};

const CircleDiagram = ({ slices }) => {
  const midX = 50;
  const midY = 50;
  const radius = 40;
  
  const getSlicePath = (slice, total) => {
    const startAngle = (slice * 360) / total;
    const endAngle = ((slice + 1) * 360) / total;
    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (endAngle - 90) * Math.PI / 180;
    
    const x1 = midX + radius * Math.cos(startRad);
    const y1 = midY + radius * Math.sin(startRad);
    const x2 = midX + radius * Math.cos(endRad);
    const y2 = midY + radius * Math.sin(endRad);
    
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
    
    return `M ${midX} ${midY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      {Array.from({ length: slices }, (_, i) => (
        <path
          key={i}
          d={getSlicePath(i, slices)}
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
      ))}
    </svg>
  );
};

export default function StatWorkSheet1() {
  const [isHovering, setIsHovering] = React.useState(false);

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
    instructions: {
      marginBottom: '30px',
      lineHeight: '1.6',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '30px',
    },
    th: {
      border: '1px solid #ddd',
      padding: '12px',
      backgroundColor: '#f5f5f5',
      textAlign: 'left',
    },
    td: {
      border: '1px solid #ddd',
      padding: '12px',
    },
    circlesContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
      marginTop: '30px',
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
    instructions: {
      marginBottom: '30px',
      lineHeight: '1.6',
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '10px',
    },
    
    printButton: {
      backgroundColor: '#357717',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      display: 'block',
      margin: '20px auto',
      fontSize: '12px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },

    mainContent: {
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '10px',
      marginBottom: '20px',
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
        <h1 style={styles.title}>Fraction Game</h1>
        <h2 style={styles.subtitle}>Statistics: Lesson 1</h2>

        <div style={styles.instructions}>
          <h3>Instructions:</h3>
          <p>If you are able, print the page with circles on it. If not, you can draw it yourself.</p>
          
          <p><strong>Option 1: Draw your own circles</strong></p>
          <ul>
            <li>Draw and trace 5 circles on paper. Color the circles in the colors listed below.</li>
            <li>Cut the circles out, you should have 5 circles colored red, blue, purple, black, and green.</li>
            <li>Cut the circles according to the color code below (ex. Cut the red circle into 2, the blue circle into 3, ext.)</li>
          </ul>

          <p><strong>Option 2: Use the printed version</strong></p>
          <ul>
            <li>Color the circles based on the color code below (ex. Color the circle split in 2, red; color the circle split in 3, blue; ext.)</li>
            <li>Cut along the black lines. You should have 5 circles. One should be cut into 2 pieces, one into 3 pieces, one into 4 pieces, one into 6 pieces, and one into 8 pieces.</li>
          </ul>

          <button
            onClick={handleDownload}
            style={styles.printButton}
          >
            Download PDF Version
          </button>

        </div>

        <div style={styles.mainContent}>
          <h3>Color Code</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Color</th>
                <th style={styles.th}>Cut into this many equal pieces</th>
                <th style={styles.th}>Tips</th>
              </tr>
            </thead>
            <tbody>
              {colorCodes.map((item, index) => (
                <tr key={index}>
                  <td style={{...styles.td, color: item.color === 'Black' ? 'black' : item.color.toLowerCase()}}>
                    <strong>{item.color}</strong>
                  </td>
                  <td style={styles.td}>Cut into {item.pieces} pieces</td>
                  <td style={styles.td}>{item.tips}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.circlesContainer}>
            <CircleDiagram slices={2} />
            <CircleDiagram slices={3} />
            <CircleDiagram slices={4} />
            <CircleDiagram slices={6} />
            <CircleDiagram slices={8} />
          </div>
        </div>


      </div>
    </div>
  );
}