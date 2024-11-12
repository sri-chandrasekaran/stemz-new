import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import AstronomyImage from '../assets/astronomy.PNG'
import { Link } from 'react-router-dom';
import './css/Astronomy.css';

const Astronomy = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
}

  return (
    <div>
      <Navbar />
      <HeroOther overlayText="Astronomy"/>
      <img src={AstronomyImage} alt="Astronomy" className="course-img"/>
      <div className='course-description'>
        <h2>Recommended Grade Level: 1st - 5th Grade</h2>
        <h2>Length: 4 Lessons, 1 hour each</h2>
        <h2>In this course we will learn about galaxies, the universe, constellations and much more!</h2>
        <h3>Creator: Alice Gao</h3>
      </div>
      <div className='student-l1'>
        <h1>Student-Led Lessons</h1>
        <div className='lesson1'>
          {(
            <div className="lesson-content">
              <Link to ="/astrovid1s" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/vy2NuP1ITFo/mqdefault.jpg"
              alt="Lesson 1 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 1: The Solar System</h3>
            </Link>
            
            <Link to ="/astrovid2s" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/0MG58dFzUkU/mqdefault.jpg"
              alt="Lesson 2 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'> Lesson 2: Galaxies</h3>
            </Link>

            <Link to ="/astrovid3s" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/v4pT0yllkO0/mqdefault.jpg"
              alt="Lesson 3 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 3: Space and Humans</h3>
            </Link>

            <Link to ="/astrovid4s" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/ImEEVWosix4/mqdefault.jpg"
              alt="Lesson 4 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 4: The Universe</h3>
            </Link>
            </div>


          )}
        </div>
      </div>
      <div className='student-l1'>
        <h1>Parent-Led Lessons</h1>
        <div className='lesson1'>
            <div className="lesson-content">
              <Link to ="/astrovid1p" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/vy2NuP1ITFo/mqdefault.jpg"
              alt="Lesson 1 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 1: The Solar System</h3>
            </Link>
            <Link to ="/astrovid2p" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/0MG58dFzUkU/mqdefault.jpg"
              alt="Lesson 2 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'> Lesson 2: Galaxies</h3>
            </Link>
            <Link to ="/astrovid3p" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/v4pT0yllkO0/mqdefault.jpg"
              alt="Lesson 3 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 3: Space and Humans</h3>
            </Link>
            <Link to ="/astrovid4p" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/ImEEVWosix4/mqdefault.jpg"
              alt="Lesson 4 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 4: The Universe</h3>
            </Link>
            </div>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer />
    </div>
  )
}

export default Astronomy
