import React from 'react';
import './Hero.css'
import Beaker2 from '../assets/another_beaker.png'
import Science from '../assets/science.png'

const Hero = () => {
  return (
    <div className='hero-homepage'>
        <h1 className="hero-title">Education through experimentation.</h1>
        <p className="hero-description">Making engaging curriculum <span className="line-break">accessible to all.</span></p>
        <img src={Beaker2} alt="beaker-2" className="hero-images"/> 
        <img src={Science} alt="Science" className="hero2-images"/> 
    </div>
  )
}

export default Hero
