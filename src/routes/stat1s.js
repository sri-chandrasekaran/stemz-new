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
      <HeroOther overlayText="Lesson 1: Fractions"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/imGo9o7Epo8" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSRqQAnsVx9tMyhym0HeU6jndMuCKMqE44h_UyAQu-ZCG8G2RV-B1DnqsIiCj18K1kO6ugR838dbyJT/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRxkXJcxz31DTsjez4F0FYzwTCKnOZBkjJA88HCNChof0dYOtUzIF0pQ3TfeJ9as7sBayGvYkn2_RvA/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vR6nB3eLiBPWTFOkHEs4MfWRJFNfwoJSueYJkY0s6Nriz55uYfr2AcBWMrTMgBfybyk7UnTJUR58qCf/pub" target="_blank" rel="noopener noreferrer">
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
