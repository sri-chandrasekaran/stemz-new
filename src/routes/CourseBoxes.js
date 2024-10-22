import React from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import PaymentComponent from './PayPalButton';
import CourseBox from '../assets/course-boxes.png';
import './css/courseboxes.css';

const CourseBoxes = () => {
  return (
    <div>
      <Navbar />
      <HeroOther overlayText="Order Now!" />

      <div className="course-container">
        <div className="image-column">
          <img src={CourseBox} alt="Course Box" className="course-image" />
        </div>
        <div className="description-column">
          <h2>Chemistry Box</h2>
          <p>The STEMz Learning Course Boxes offer a wonderful opportunity for young, aspiring scientists to get hands-on experiences with complex chemistry concepts and independently accomplish fun and enriching science experiments.</p>
          <p>Each box contains:</p>
          <ul>
            <li>5 unique experiments with enough equipment for each experiment to be completed twice</li>
            <li>2 lab notebooks</li>
            <li>1 booklet containing instructions and scientific explanations for each experiment</li>
          </ul>
          <p>This box is a perfect way for young scientists to explore chemistry with their sibling or friend. All materials needed are included in the box, so you and your child can focus on the fun science and not have to worry about gathering materials.</p>
          {/* <p>This box contains:</p>
          <ul>
            <li>A booklet with instructions and explanations for five experiments</li>
            <li>Two lab notebooks</li>
            <li>Enough materials for each of the five experiments to be done twice (or with a friend)</li>
          </ul> */}
          <p className="price">
            {/* <span className="original-price">Price: $49.95</span> On sale for <span className="sale-price">$39.95</span> */}
            <span>Price: 49.95</span>
          </p>
          <PaymentComponent />
        </div>
      </div>
      <div style={{ paddingBottom: '120px' }} />
      <Footer />
    </div>
  );
}

export default CourseBoxes;
