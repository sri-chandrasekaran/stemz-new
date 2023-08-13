import React from 'react';
import './HeroOther.css'

const Hero = ({ overlayText }) => {
  return (
    <div className='hero-other'>
        <div className="hero-overlay">
            <p className="overlay-text">{overlayText}</p>
        </div>
    </div>
  )
}

export default Hero
