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
      <HeroOther overlayText="Lesson 3: Advanced Percents"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/WY7m3HsZf0k" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQfvuAJ3pkUqQBxgaY5Zljipy-8UfmRSRGh2wed_2S7LrFq_Xa_yUEwknp4iu8pQ_Q_LEbeFIPuVSE0/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vT5odv9FNIs5hl8F0rrEeFAPqFGMk22yzh84_oEL3ywLFNJO8B7ENVbY-eKmpjnM6uV7kgcO9SdW8k9/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQj0sEGLCx183jhRPDVTQDeVvKXrmRUOryDLKmw6q7NfTOXcqDJ7uVnApV2BXBuJ-A9WjUrql9xSznO/pub" target="_blank" rel="noopener noreferrer">
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
