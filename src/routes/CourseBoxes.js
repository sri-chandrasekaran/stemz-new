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
          <h2>Chemistry Box</h2>
          <p>This box includes 5 experiments, with enough materials to do it twice or with a friend!</p>
          <p>Along with the materials we also include a lab notebook and course booklet.</p>
          <p>Price: </p>
          <PaymentComponent />
        </div>
      </div>
      <div style={{ paddingBottom: '140px' }} />
      <Footer />
    </div>
  );
}

export default CourseBoxes;
