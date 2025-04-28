import React from 'react'
import Navbar from '../../components/Navbar'
import HeroOther from '../../components/HeroOther'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom';
import '../css/allvideo.css';

const circuit1s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 3: Creating a Functioning Circuit"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/4ZBUoBPdojA" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQHwS6QoKw-5dD3US0sKlltaH2sezbHE0gkWm1ZYDR-mmL_CQtGl1lIvpJMas7-3Lse-thok9I-jYjP/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vRthI5zVTwgnH7Pbhej4zBWwtFqR3G7IucVZ72-zsy12cFopwbpuDTMX-FOCjsnTdiydO0RVJPvRaNj/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Parent Notes</button>
          </Link>
          <Link to="/circuitquiz" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Quiz</button>
          </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default circuit1s
