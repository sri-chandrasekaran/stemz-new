import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const bc2s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 2: Conditional Statements & Loops"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/gG1fPD2TrnY" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSzibStSCV4ZCIkakqRBA9QG1MewqaahZ5Pg78S_tL7GNJQeg7RFUDTepQIAZCCxmUhJVGS9SaDQ49D/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Slideshow</button>
                    </Link>
                    <Link to="https://docs.google.com/document/d/e/2PACX-1vRvsi-PhT9-ytCbgSjy-hUf13vBwjkxcCV0p0WIWKCr47f1cGhW1S4TkQVL-vxRwf_oXfX4rE3UhX3A/pub" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Student Notes</button>
                    </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default bc2s
