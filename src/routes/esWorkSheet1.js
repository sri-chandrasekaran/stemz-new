import React, { useState } from 'react';
import stemzLearningLogo from "../assets/logo.png";

// Original Worksheet
// https://docs.google.com/document/d/e/2PACX-1vRUirVOL8YLkxol0nTrImCblQ0sB-Xu2LbLwvxLluYWSEPicxO7NpKWZ8avM_bjvTNsYJUGGffU_w8m/pub
const scavengerItems = [
  { id: 'flower', name: 'Flower', image: '🌻🌷' },
  { id: 'squirrel', name: 'Squirrel', image: '🐿️🐿️' },
  { id: 'clover', name: 'Clover', image: '☘️🍀' },
  { id: 'bird', name: 'Bird', image: '🐦‍⬛🐦' },
  { id: 'pinecone', name: 'Pinecone', image: '🌲🌰' },
  { id: 'bee', name: 'Bee', image: '🐝🐝' },
  { id: 'tree', name: 'Tree', image: '🌳🌴' },
  { id: 'rock', name: 'Rock', image: '🪨🪨' },
  { id: 'grass', name: 'Grass', image: '🌱🌿' },
  { id: 'water', name: 'Water', image: '💧🌧️' },
  { id: 'nest', name: 'Nest', image: '🪹🪺' },
  { id: 'ant', name: 'Ant', image: '🐜🐜' }
];

const reflectionQuestions = [
  "What item was the most difficult to find?",
  "Which item was the easiest to find?",
  "How many of these objects have you seen before?",
  "While doing the scavenger hunt, how many different animals did you find?"
];

export default function EsWorkSheet1() {
  const [foundItems, setFoundItems] = useState({});
  const [reflectionAnswers, setReflectionAnswers] = useState({});
  const [isHovering, setIsHovering] = useState(false);

  const handleCheckItem = (itemId) => {
    setFoundItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleReflectionAnswer = (questionIndex, answer) => {
    setReflectionAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleDownload = () => {
    window.open('https://docs.google.com/document/d/e/2PACX-1vRUirVOL8YLkxol0nTrImCblQ0sB-Xu2LbLwvxLluYWSEPicxO7NpKWZ8avM_bjvTNsYJUGGffU_w8m/pub', '_blank');
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
    materialsSection: {
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      padding: '20px',
      marginBottom: '30px',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      marginTop: '20px',
    },
    itemCard: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      textAlign: 'center',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    itemImage: {
      fontSize: '40px',
      marginBottom: '10px',
    },
    checkbox: {
      width: '20px',
      height: '20px',
      margin: '10px auto 0',
    },
    reflectionSection: {
      marginTop: '40px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      padding: '20px',
    },
    reflectionInput: {
      width: '100%',
      padding: '8px',
      marginTop: '8px',
      borderRadius: '4px',
      border: '1px solid #ddd',
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
        <h1 style={styles.title}>Nature Scavenger Hunt</h1>
        <h2 style={styles.subtitle}>Environmental Science：Lesson 1 </h2>

        <div style={styles.materialsSection}>
        <h3>Instructions:</h3>
        <p><strong>Option 1: Fill out the online worksheet</strong></p>
        <ul>
          <li>Find each item on the list provided.</li>
          <li>Check off each item on the worksheet once you find them.</li>
          <li>Answer the reflection questions after completing your hunt.</li>
        </ul>


        <p><strong>Option 2: Prefer a paper copy? Download the printable version below</strong></p>

        <button
          onClick={handleDownload}
          style={styles.printButton}
        >
          Download PDF Version
        </button>
      </div>

        <div style={styles.gridContainer}>
          {scavengerItems.map((item) => (
            <div key={item.id} style={styles.itemCard}>
              <div style={styles.itemImage}>{item.image}</div>
              <div>{item.name}</div>
              <input
                type="checkbox"
                checked={foundItems[item.id] || false}
                onChange={() => handleCheckItem(item.id)}
                style={styles.checkbox}
              />
            </div>
          ))}
        </div>

        <div style={styles.reflectionSection}>
          <h3>Reflection:</h3>
          {reflectionQuestions.map((question, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <label>{index + 1}. {question}</label>
              <input
                type="text"
                value={reflectionAnswers[index] || ''}
                onChange={(e) => handleReflectionAnswer(index, e.target.value)}
                style={styles.reflectionInput}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}