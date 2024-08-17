import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const circuit1s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 1: Circuits & Circuit Boards"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/MFr0Y52UICk" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vR06yiOBnjwl3Ymd4rGFmrZjxRJHqLrVCRscfVMIrGmS5p-LSWYYuPMqUO2E6gp2TZVR8SW77o0agIV/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vS0xvCCLs7UzzjxA8LIfKAcw1x4_jjOU5kgYHTWtwXZcPAMSRuIUb9G94cBE4mvNtI0weRL2cdWlV_5/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Student Notes</button>
          </Link>
          <Link to="/self-paced-classes/circuits/circuitquiz" target="_blank" rel="noopener noreferrer">
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
