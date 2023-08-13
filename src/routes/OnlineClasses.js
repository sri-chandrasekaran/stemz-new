import React from 'react';
import './OnlineClasses.css';
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import PhotoCarousel from '../components/PhotoCarousel';

const OnlineClasses = () => {
  return (
    <div>
        <Navbar />
        <HeroOther overlayText="Online Classes"/>
        <div className='main-online'>
          <h3>More classes coming soon!</h3>
          <div className="photo-carousel-container">
            <PhotoCarousel />
          </div>
        </div>
        <div style={{ paddingBottom: '200px' }} />
        <Footer />
    </div>
  )
}

export default OnlineClasses
