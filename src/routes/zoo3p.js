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
      <HeroOther overlayText="Lesson 3: Distribution"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/PpDLfndy7zs" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSqfld47M2TIa1WeoHI5DybsrO8u-aNgPkolXwbmzjSbJAZgTsTL98HZdYDtAlfUk67GID90a2cdn8A/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vQ6IrHzAJ61lqKZikOwzm0lYwn1L4P4364t03B5JSt5sKVuzRh0HitDST6hJ8NEAOj7X_WGq7vhXDe2/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Parent Notes</button>
          </Link>
          <Link to="/self-paced-classes/zoology/zooquiz" target="_blank" rel="noopener noreferrer">
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
