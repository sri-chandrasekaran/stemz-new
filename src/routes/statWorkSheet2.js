import React, { useState } from 'react';
import stemzLearningLogo from "../assets/logo.png";
import fractionMenu from "../assets/fractionmenu.png";

const menuItems = {
  salads: [
    { name: 'Strawberry Blueberry Salad', price: 9.00 },
    { name: 'Banana Mandarin Salad', price: 11.00 },
    { name: 'Arugula Mandarin Salad', price: 15.00 }
  ],
  mainMeals: [
    { name: 'Pizza', price: 18.00 },
    { name: 'BLT Sandwich', price: 21.00 },
    { name: 'Sushi', price: 24.00 }
  ],
  desserts: [
    { name: 'Chocolate Bar', price: 6.00 },
    { name: 'Ice Cream Scoop', price: 10.00 },
    { name: 'Dozen Doughnuts', price: 17.00 }
  ]
};

const discounts = {
  salads: 30,
  mainMeals: 20,
  desserts: 45
};

export default function StatWorkSheet2() {
  const [selectedItems, setSelectedItems] = useState({
    salad: '',
    mainMeal: '',
    dessert: ''
  });
  const [isHovering, setIsHovering] = useState(false);
  const [total, setTotal] = useState(0);
  const [userCalculation, setUserCalculation] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const calculateTotal = (selections) => {
    let sum = 0;
    
    if (selections.salad) {
      const saladPrice = menuItems.salads.find(item => item.name === selections.salad).price;
      sum += saladPrice * (1 - discounts.salads/100);
    }
    
    if (selections.mainMeal) {
      const mainPrice = menuItems.mainMeals.find(item => item.name === selections.mainMeal).price;
      sum += mainPrice * (1 - discounts.mainMeals/100);
    }
    
    if (selections.dessert) {
      const dessertPrice = menuItems.desserts.find(item => item.name === selections.dessert).price;
      sum += dessertPrice * (1 - discounts.desserts/100);
    }
    
    return sum.toFixed(2);
  };

  const handleSelection = (category, itemName) => {
    const newSelections = {
      ...selectedItems,
      [category]: itemName
    };
    setSelectedItems(newSelections);
    setTotal(calculateTotal(newSelections));
  };

  const handleCheck = () => {
    setIsChecked(true);
  };

  const handleReset = () => {
    setSelectedItems({ salad: '', mainMeal: '', dessert: '' });
    setTotal(0);
    setUserCalculation('');
    setIsChecked(false);
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
    menuSection: {
      backgroundColor: '#e8f5e9',
      borderRadius: '15px',
      padding: '20px',
      marginBottom: '20px',
    },
    menuTitle: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
    },
    discountBadge: {
      backgroundColor: '#ff4444',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '15px',
      marginLeft: '10px',
      fontSize: '14px',
    },
    itemsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
    },
    menuItem: {
      padding: '15px',
      backgroundColor: 'white',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      textAlign: 'center',
    },
    selectedItem: {
      border: '2px solid #254E17',
      backgroundColor: '#c8e6c9',
    },
    price: {
      fontWeight: 'bold',
      color: '#357717',
    },
    calculator: {
      backgroundColor: '#f5f5f5',
      padding: '20px',
      borderRadius: '10px',
      marginTop: '30px',
    },
    total: {
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'right',
      color: '#254E17',
    },
    calculationInput: {
      width: '100%',
      maxWidth: '200px',
      padding: '8px 12px',
      fontSize: '18px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      marginTop: '10px',
    },
    checkButton: {
      backgroundColor: '#3cb371',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      marginTop: '10px',
      marginRight: '10px',
    },
    resetButton: {
      backgroundColor: '#CF3434',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      marginTop: '10px',
    },
    result: {
      marginTop: '10px',
      padding: '10px',
      borderRadius: '5px',
      fontWeight: 'bold',
    },
    correct: {
      backgroundColor: 'rgba(60, 179, 113, 0.2)',
      color: '#3cb371',
    },
    incorrect: {
      backgroundColor: 'rgba(207, 52, 52, 0.2)',
      color: '#CF3434',
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
    menuImage: {
      width: '100%',
      maxWidth: '600px',
      margin: '20px auto',
      display: 'block',
      borderRadius: '10px',
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
        <h1 style={styles.title}>Fraction Restaurant</h1>
        <h2 style={styles.subtitle}>Statistics: Lesson 3</h2>

        <div style={styles.instructions}>
          <h3>Materials Needed:</h3>
          <ul>
            <li>Scratch paper</li>
          </ul>
          
          <h3>Instructions:</h3>
          <p>Look at the menu and pick <em>one</em> salad, <em>one</em> main meal, and <em>one</em> dessert from the Fractions Restaurant. Then calculate how much your meal will cost.</p>
          <p>All salads are {discounts.salads}% off, main meals are {discounts.mainMeals}% off, and desserts are {discounts.desserts}% off.</p>

          <img 
            src={fractionMenu} 
            alt="Fraction Restaurant Menu" 
            style={styles.menuImage}
          />
        </div>

        <div style={styles.menuSection}>
          <div style={styles.menuTitle}>
            <h3>Salads</h3>
            <span style={styles.discountBadge}>{discounts.salads}% OFF!</span>
          </div>
          <div style={styles.itemsGrid}>
            {menuItems.salads.map((item) => (
              <div
                key={item.name}
                style={{
                  ...styles.menuItem,
                  ...(selectedItems.salad === item.name ? styles.selectedItem : {})
                }}
                onClick={() => handleSelection('salad', item.name)}
              >
                <div>{item.name}</div>
                <div style={styles.price}>${item.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.menuSection}>
          <div style={styles.menuTitle}>
            <h3>Main Meals</h3>
            <span style={styles.discountBadge}>{discounts.mainMeals}% OFF!</span>
          </div>
          <div style={styles.itemsGrid}>
            {menuItems.mainMeals.map((item) => (
              <div
                key={item.name}
                style={{
                  ...styles.menuItem,
                  ...(selectedItems.mainMeal === item.name ? styles.selectedItem : {})
                }}
                onClick={() => handleSelection('mainMeal', item.name)}
              >
                <div>{item.name}</div>
                <div style={styles.price}>${item.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.menuSection}>
          <div style={styles.menuTitle}>
            <h3>Desserts</h3>
            <span style={styles.discountBadge}>{discounts.desserts}% OFF!</span>
          </div>
          <div style={styles.itemsGrid}>
            {menuItems.desserts.map((item) => (
              <div
                key={item.name}
                style={{
                  ...styles.menuItem,
                  ...(selectedItems.dessert === item.name ? styles.selectedItem : {})
                }}
                onClick={() => handleSelection('dessert', item.name)}
              >
                <div>{item.name}</div>
                <div style={styles.price}>${item.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.calculator}>
          <h3>Your Order</h3>
          {selectedItems.salad && <p>Salad: {selectedItems.salad}</p>}
          {selectedItems.mainMeal && <p>Main Meal: {selectedItems.mainMeal}</p>}
          {selectedItems.dessert && <p>Dessert: {selectedItems.dessert}</p>}
          
          <div style={styles.total}>
            <div>Enter your calculated total: </div>
            <input
              type="number"
              step="0.01"
              value={userCalculation}
              onChange={(e) => setUserCalculation(e.target.value)}
              style={styles.calculationInput}
              placeholder="Enter your answer"
              disabled={isChecked}
            />
            <div style={{ marginTop: '10px' }}>
              <button 
                onClick={handleCheck}
                style={styles.checkButton}
                disabled={!userCalculation || isChecked}
              >
                Check Answer
              </button>
              <button 
                onClick={handleReset}
                style={styles.resetButton}
              >
                Reset
              </button>
            </div>
            
            {isChecked && (
              <div style={{
                ...styles.result,
                ...(Math.abs(parseFloat(userCalculation) - parseFloat(total)) < 0.01 
                  ? styles.correct 
                  : styles.incorrect)
              }}>
                {Math.abs(parseFloat(userCalculation) - parseFloat(total)) < 0.01
                  ? "Correct! Your calculation matches the actual total."
                  : `Incorrect. The actual total is $${total}`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}