import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './css/allvideo.css';

const es1s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 1: Classification & Taxonomy"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/pEDK7r21GBM" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRwPRFdEPIJpiFnTcv1iceie5izcMvKZOcPX1aYRCIOOc1ZThFV_8ayBGIUkSucSXR8lPIUVEeNSpZW/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="/self-paced-classes/zoology/zooworksheet1"> {}
            <button className="course-button">Worksheet</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vTJ7bigOJB6NRLgegaL-e1cLO_E1G4SwTPXBtBHEgM6jOzEvZBII-ZoKOQiRc1lPny49vLviKnny05b/pub" target="_blank" rel="noopener noreferrer">
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
