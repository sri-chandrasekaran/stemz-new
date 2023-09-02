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
      <HeroOther overlayText="Lesson 2: More Circuit Board Tools"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/pK9h_Ts3gWw" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSTyQ5Mlib9kNDUrlEUAF1tmn4wm5c-d3I0-WPkSdazAhX975XN4K2AKGMAh4T0fwkFBnnUL9fOMZvu/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQEgXxHa5IR9IbeT7bNxPBrGSImZJE9cG6y2pk2zK_roEKea0FIbpk4IJYOJ990ufDpjZo3KnZI8Tkm/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vSmjf30fBgMqIdQ5KbUXlXnvX7rhySGbfmyqiOd4rS6ej36it34XJ0c9HkXTRYE_jKbs2YhSM_AmA-U/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Student Notes</button>
                  </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default circuit1s
