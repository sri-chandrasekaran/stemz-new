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

      <div className="course-container">
        <div className="image-column">
          <img src={CourseBox} alt="Course Box" className="course-image" />
        </div>
        <div className="description-column">
          <h2>Chemistry Box</h2>
          <p>This box contains:</p>
          <ul>
            <li>A booklet with instructions and explanations for five experiments</li>
            <li>Two lab notebooks</li>
            <li>Enough materials for each of the five experiments to be done twice (or with a friend)</li>
          </ul>
          <p className="price">Price: $39.95</p>
          <PaymentComponent />
        </div>
      </div>
      <div style={{ paddingBottom: '120px' }} />
      <Footer />
    </div>
  );
}

export default CourseBoxes;
