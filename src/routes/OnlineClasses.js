import React from 'react';
import './OnlineClasses.css';
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import PhotoCarousel from '../components/PhotoCarousel';
// import Genetics from '../assets/genetics.jpg'
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
        <img src={Genetics} alt="Genetics" className="class-img"/>
        <div className='class-description'>
          <h1>Genetics</h1>
          <h2>When: 9/2 - 9/23, every Saturday from 10 - 11 AM</h2>
          <h2>Recommended Grade Level: 1st - 5th Grade</h2>
          <h2>In this course, we’ll be diving into all things genetics! Join us to learn more about what makes us up, the history of genetics, and the future of the field!</h2>
          <Link to="https://forms.gle/RZhm3ABkRVzWmJez5" target="_blank" rel="noopener noreferrer">
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
