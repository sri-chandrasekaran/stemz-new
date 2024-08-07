import React from 'react';
import './OnlineClasses.css';
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import PhotoCarousel from '../components/PhotoCarousel';
import { Link } from 'react-router-dom';

const OnlineClasses = () => {
  return (
    <div>
        <Navbar />
        <HeroOther overlayText="Online Classes"/>
        <div className='main-online'>
          <h3>Sign Up for Classes!</h3>
          <div className="photo-carousel-container">
            <PhotoCarousel />
          </div>
        </div>
        {/* <div className='course-listing'>
        <img src={Anatomy} alt="Genetics" className="class-img"/>
        <div className='class-description'>
          <h1>Anatomy</h1>
          <h2>When: 6/3 - 6/6, every day from 10 - 11 AM</h2>
          <h2>Recommended Grade Level: 3rd - 5th Grade</h2>
          <h2>In this course, we learn about the various organ systems of our body, including the skeletal system, nervous system, and many more!</h2>
          <Link to="https://forms.gle/FLnFoy67gsmkxr816" target="_blank" rel="noopener noreferrer">
                  <button className="class-button">Register</button>
          </Link>
        </div>
        </div> */}
        <div style={{ paddingBottom: '230px' }} />
        <Footer />
    </div>
  )
}

export default OnlineClasses
