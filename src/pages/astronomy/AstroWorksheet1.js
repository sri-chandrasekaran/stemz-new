import React, { useState, useEffect } from "react";
import mercury from "../../assets/Mercury.png";
import jupiter from "../../assets/Jupiter.png";
import venus from "../../assets/Venus.png";
import saturn from "../../assets/Saturn.png";
import earth from "../../assets/Earth.png";
import mars from "../../assets/Mars.png";
import uranus from "../../assets/Uranus.png";
import neptune from "../../assets/Neptune.png";
import stemzLearningLogo from "../../assets/logo.png";


const planets = [
  { name: "Mercury", description: "Mercury's surface is covered with craters. It is the closest planet to the Sun, but has very little atmosphere. This makes Mercury very hot on the side where it faces the Sun, and very cold on the side away from the Sun. Mercury orbits the Sun quickly, but rotates around itself very slowly. This creates very short years and very long days.", image: mercury, isWide: false },
  { name: "Venus", description: "Venus is similar to Earth in size and density. It has a large iron core and silicate mantle. It has very thick clouds, which reflect sunlight well. This makes it very bright, and easy for us to observe in space. The clouds are full of carbon dioxide and acid, which traps heat very well. This makes Venus the hottest planet.  The lack of impact craters tell us that the planet's surface keeps changing, perhaps due to volcanic eruptions. The rotation is also very slow, creating very long days.", image: venus, isWide: false },
  { name: "Earth", description: "Earth revolves around the Sun once every 365.25 days – this is known as one Earth year. Earth is the fifth largest planet of the Solar System, and is the largest terrestrial planet. The surface of Earth is covered by water, around 71%, only 29% of Earth's surface is covered by land.", image: earth, isWide: false },
  { name: "Mars", description: "Mars is very similar to Earth, except it is smaller, colder, and drier. The red color of Mars comes from the amount of iron oxide in its soil. The planet contains a large amount of massive volcanoes. There is also ice on Mars, suggesting that water may have existed on this planet before. Mars has a weak atmosphere, and a lower atmospheric temperature. Mars has two moons, named Phobos and Deimos.", image: mars, isWide: false },
  { name: "Jupiter", description: "Jupiter is the largest object in the solar system, besides the Sun. It is made mostly of hydrogen and helium, making it much less dense than the Earth. Due to its orbit, a year on Jupiter is 12 times longer than a year on Earth. There are many storms on the planet, caused by ammonia clouds. One of the largest storms is the Great Red Spot, which has existed on the planet for more than 300 years.", image: jupiter, isWide: true },
  { name: "Saturn", description: "Saturn is a gas giant, known for its large rings. It is the second largest planet in the solar system, and also the least dense. Due to its orbit, a year on Saturn is 30 times longer than a year on Earth. Saturn's rings are made of particles such as water, ice, dust, and rocks. They are held together by the gravitational force of Saturn and its moons. Saturn has 7 moons that are all relatively small.", image: saturn, isWide: true },
  { name: "Uranus", description: "Uranus is a large gas giant, making it less dense than the Earth. Due to its orbit, a year on Uranus is 84 times longer than a year on Earth. The methane clouds on the planet give Uranus a blue-green color. It has a faint set of rings that show how the planet rotates horizontally, instead of rotating vertically. Uranus has 27 moons, most of them named after characters from Shakespeare's plays.", image: uranus, isWide: false },
  { name: "Neptune", description: "Neptune is slightly smaller than Uranus, and the furthest away from the Sun. Due to its orbit, a year on Neptune is 165 times longer than a year on Earth. Frozen methane gives Neptune its blue color. Dark spots on Neptune are gaps in the methane clouds. The winds on Neptune are extremely harsh, reaching up to speeds of 1100 km/h. Neptune's core is extremely hot, but the temperatures at the surface are one of the coldest in the solar system. Neptune has 13 moons, but only Triton is spherical in shape.", image: neptune, isWide: false },
];

const planetColors = {
  Mercury: '#888888',
  Venus: '#db9112',
  Earth: '#4169e1',
  Mars: '#ff4500',
  Jupiter: '#7a511b',
  Saturn: '#f4a460',
  Uranus: '#40e0d0',
  Neptune: '#4169e1',
};

const AstroWorksheet1 = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  const [isHovering, setIsHovering] = useState(false);

  const styles = {
    container: {
      textAlign: 'center',
      padding: '15px',
      fontFamily: 'Arial, sans-serif',
      backgroundImage: 'url(path/to/space-background.jpg)',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
    planetList: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '30px',
      width: '95%',
      maxWidth: '1400px',
    },
    card: {
      border: '3px solid #357717',
      borderRadius: '20px',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      width: isMobile ? '100%' : 'calc(50% - 15px)',
      height: '375px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(5px)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    imageContainer: {
      width: '250px',
      height: '250px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '20px',
      overflow: 'hidden',
    },
    planetImage: {
      width: '150px',
      height: '150px',
      objectFit: 'contain',
      animation: '$float 3s ease-in-out infinite',
      transition: 'transform 0.3s ease',
    },
    widePlanetImage: {
      width: '170px',
      height: '130px',
      objectFit: 'contain',
      animation: '$float 3s ease-in-out infinite',
      transition: 'transform 0.3s ease',
    },
    contentContainer: {
      flex: 1,
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
    },
    planetName: {
      color: '#357717',
      fontSize: '32px',
      marginBottom: '10px',
      fontFamily: 'Orbitron, sans-serif',
    },
    description: {
      fontSize: '16px',
      color: '#000',
      flexGrow: 1,
      overflowY: 'auto',
      lineHeight: '1.5',
    },
    logo: {
      maxWidth: '300px',
      marginBottom: '30px',
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
      <img src={stemzLearningLogo} alt="STEMZ Learning" style={styles.logo} />
      <h1 style={styles.title}>The Solar System</h1>
      <h2 style={styles.subtitle}>Astronomy: Lesson 1</h2>
      <div style={styles.planetList}>
        {planets.map((planet, index) => (
          <div
            key={index}
            style={{
              ...styles.card, 
              borderColor: planetColors[planet.name],
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0px 4px 20px rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={styles.imageContainer}>
              <img
                src={planet.image}
                alt={planet.name}
                style={planet.isWide ? styles.widePlanetImage : styles.planetImage}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            </div>
            <div style={styles.contentContainer}>
              <h3 style={{...styles.planetName, color: planetColors[planet.name]}}>{planet.name}</h3>
              <p style={styles.description}>{planet.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AstroWorksheet1;