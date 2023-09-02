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
      <HeroOther overlayText="Lesson 4: Types of Graphs"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/folkaRAmLWw" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTtx5ZeNYgQU1XkD2BpOqzw_eCFB6HuBewTR7mcP5u3D9Wv_qPUZNcEjPPKw_PA5qXA5w1o9c7TqYUO/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQo9KYg25_dOBpDEpTc4beUtyOoo9lDN_yBej-glyo04dPI03yJ0AsX7o5Ia7X6xztrlQ_iJITOXFXx/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vS-wUT67lRsoHXv2Sq_9RscOvm3G2ZUI8-xEY1QRfa0SLPcDvL0PcghO-WqyW7ypl8OaPCgPfxr6APJ/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Student Notes</button>
                  </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default es1s
