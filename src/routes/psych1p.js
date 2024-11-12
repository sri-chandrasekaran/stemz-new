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
      <HeroOther overlayText="Lesson 1: Psychology & Scientific Method"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/TjGatGI4CJM" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vR-iF2QE-QfA169iGTlJz4-O1JSRFULHD5UqayrcGcQM3ApYhomic3jiqewcNlC-mYTquo3AxBe8_qI/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="/self-paced-classes/psychology/psychworksheet1"> {}
            <button className="course-button">Worksheet</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vQpXiApP3xQiPMyaMsGfkZBNHarI1WasyV0z0ivEVBv3Bmkt2QwnNiL5ln26wvxKePKk7BlLBRruomb/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Parent Notes</button>
          </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default es1s
