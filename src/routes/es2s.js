import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const es1s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 2: Cycles of the Earth"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/mpu_qNfo-dM" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQdwDDAg4Ol8VRSph1a-njCcM0PSQoeBsAenz63MwxFCsi5nQlOVZmiQwMqkCrhMNy-3TypvNM86SnG/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vTmXqYzRTjn1XVSnepm7X-8YVyZ-Om6O0rxm3edmpi22Lj7IcRaiMqtArYsz7CHvspkcnZI-Up7w6Gl/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Student Notes</button>
          </Link>
          <Link to="/self-paced-classes/environmental-science/esquiz" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Quiz</button>
          </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default es1s
