import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const Astrovid4s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 4: The Universe"/>
      <div className='vidbig'>
      <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/ImEEVWosix4" frameborder="0" allowfullscreen></iframe>
      </div>
      <div className='centered-container'>
      <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTAyFyBm7IJI6JEgUwzitEswtFjWfFA2BaMCDEGvbWF8ijEG3G4bU9v3__KpaOowPIwJ1B7vvq6a316/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQ0ybcjeVOrxoUG33gZ36B3OOLYI8t0fMHFkoWsOSoVe6HgS5mBUg87TPQIipZgIdtv-wMXDgmYcHj4/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
      </div>
      <div style={{ paddingBottom: '200px' }} />
                  
      <Footer/>
    </div>
  )
}

export default Astrovid4s
