import React from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
// import ucla from '../assets/ucla.png'
// import ucr from '../assets/ucr.png'
// import stanford from '../assets/stanford.png'
// import berkeley from '../assets/berkeley.png'
// import ucsd from '../assets/ucsd.png'
// import flc from '../assets/flc.jpg'
import ucla from '../assets/ucla.png';
import ucr from '../assets/ucr1.png';
import stanford from '../assets/stanford1.png';
import berkeley from '../assets/berkeley1.png';
import ucsd from '../assets/ucsd1.jpeg';
import flc from '../assets/flc1.png';
import './volunteer.css';

const Volunteers = () => {
  console.log("Volunteers component rendered");
  return (
    <div>
      <Navbar />
      <HeroOther overlayText="Volunteers" />
      <div className="volunteer-info">
        <p className="volunteer-text">
          We are recruiting hard-working high-school and college level students to teach STEM topics to elementary school students and develop our curriculum!
        </p>
        <ul className="volunteer-benefits">
          <li>President's Volunteer Service Award</li>
          <li>Skill Development</li>
          <li>Leadership</li>
          <li>Meet New People</li>
          <li>Mentorship</li>
        </ul>
        <div className="apply-button-container">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScBsZIUixxNEQKqWpDcev9XXRO6QBYkAjyqbF5iv1vXD6GjFA/viewform" target="_blank" rel="noopener noreferrer">
            <button className="apply-button">Apply Now</button>
          </a>
        </div>
      </div>

      <div className="college-logos-section">
        <h2>Where Our Volunteers Go</h2>
        <div className="college-logos">
          <img src={ucla} alt="College Logo" className="college-logo" />
          <img src={ucr} alt="College Logo" className="college-logo" />
          <img src={stanford} alt="College Logo" className="college-logo" />
        </div>
        <div className="college-logos">
          <img src={berkeley} alt="College Logo" className="college-logo" />
          <img src={ucsd} alt="College Logo" className="college-logo" />
          <img src={flc} alt="College Logo" className="college-logo" />
        </div>
      </div>
      <div style={{ paddingBottom: '120px' }} />
      <Footer />
    </div>
  );
}

export default Volunteers;