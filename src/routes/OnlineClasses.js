import React from 'react';
import './OnlineClasses.css';
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import PhotoCarousel from '../components/PhotoCarousel';
import Astronomy from '../assets/astronomy.PNG'
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
        <img src={Astronomy} alt="Genetics" className="class-img"/>
        <div className='class-description'>
          <h1>Astronomy</h1>
          <h2>When: 11/4 - 12/2, every Saturday (expect 11/25) from 10 - 11 AM</h2>
          <h2>Recommended Grade Level: 2nd - 5th Grade</h2>
          <h2>In this course, we’ll be diving into space, black holes, and constellations!</h2>
          <Link to="https://forms.gle/u1Gfg8u9nfYdqj6x7" target="_blank" rel="noopener noreferrer">
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
