import React from 'react';
import './OnlineClasses.css';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import PaymentComponent from './PayPalButton';
import Chem from '../assets/chemistry.jpeg';

const CourseBoxes = () => {
  return (
    <div>
      <Navbar />
      <HeroOther overlayText="Pre-Order a Course Box!" />

      <div className="course-container">
        <div className="image-column">
          <img 
            src={Chem} 
            alt="Course Box" 
            style={{ width: '100%', maxWidth: '300px', marginTop: '550px' }} 
          />
        </div>
        <div className="description-column">
          <h2>Course Title</h2>
          <p>Course description goes here. This could be a brief overview of the course content.</p>
          <PaymentComponent />
          <button style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
            Price of Box
          </button>
        </div>
      </div>
      <div style={{ paddingBottom: '140px' }} />
      <Footer />
    </div>
  );
}

export default CourseBoxes;
