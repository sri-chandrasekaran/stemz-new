import React from 'react';
import './OnlineClasses.css';
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import PhotoCarousel from '../components/PhotoCarousel';
import Physics from '../assets/physics.jpeg'
import { Link } from 'react-router-dom';

const OnlineClasses = () => {
  return (
    <div>
        <Navbar />
        <HeroOther overlayText="Online Classes"/>
        <div className='main-online'>
          <h3>Sign Up for Classes!</h3>
          {/* <div className="photo-carousel-container">
            <PhotoCarousel />
          </div> */}
        </div>
        <div className='course-listing'>
        <img src={Physics} alt="Genetics" className="class-img"/>
        <div className='class-description'>
          <h1>Physics</h1>
          <h2>When: 3/25 - 3/28, every day from 10 - 11 AM</h2>
          <h2>Recommended Grade Level: 3rd - 5th Grade</h2>
          <h2>In this course, we’ll be diving into various laws, mechanics and more!</h2>
          <Link to="https://forms.gle/TRN6ki17LPzjMuAXA" target="_blank" rel="noopener noreferrer">
                  <button className="class-button">Register</button>
          </Link>
        </div>
        </div>
        <div style={{ paddingBottom: '230px' }} />
        <Footer />
    </div>
  )
}

export default OnlineClasses
