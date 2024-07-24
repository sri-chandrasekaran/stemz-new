import React from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import PaymentComponent from './PayPalButton';
import CourseBox from '../assets/course-boxes.png';
import './courseboxes.css';


const CourseBoxes = () => {
  return (
    <div>
      <Navbar />
      <HeroOther overlayText="Pre-Order a Box Now!" />

      <div 
        className="course-container" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          marginTop: '500px', 
          padding: '20px', 
          maxWidth: '1200px', 
          margin: 'auto' 
        }}
      >
        <div 
          className="image-column" 
          style={{ 
            textAlign: 'center', 
            marginBottom: '20px' 
          }}
        >
          <img 
            src={CourseBox} 
            alt="Course Box" 
            style={{ 
              width: '100%', 
              maxWidth: '300px', 
              height: 'auto' 
            }} 
          />
        </div>
        <div 
          className="description-column" 
          style={{ 
            textAlign: 'center', 
            maxWidth: '600px' 
          }}
        >
          <h2>Chemistry Box</h2>
          <p>This box includes 5 experiments, with enough materials to do it twice or with a friend!</p>
          <p>Along with the materials we also include a lab notebook and course booklet.</p>
          <p>Price: $35.00</p>
          <PaymentComponent />
        </div>
      </div>
      <div style={{ paddingBottom: '100px' }} />
      <Footer />
    </div>
  );
}

export default CourseBoxes;
