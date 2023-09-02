import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const Astrovid3p = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 3: Space and Humans"/>
      <div className='vidbig'>
      <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/v4pT0yllkO0" frameborder="0" allowfullscreen></iframe>
      </div>
      <div className='centered-container'>
      <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTOmkOYM0vjwk5lSuAZllXWZ3biZJ_XtX9LurhWhyNvjqXqVzvKQKjwPBR0ulv1GDJtgtYEBoCpPuiG/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vSFEfLCeqQYCPQPVgZ8U8TTH2H26pv74584wrptwJrxKRjslgQcInjNjqVQTajtGZrgDbc6yEplPz1t/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTcztZLWHU7eRpsB3WbCKWnW4dRIvAH_BGYjyX-XDR7jNggQZc4uwS0I4aE5fx8oEvd4ZrxpqZHsbBo/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
      </div>
      <div style={{ paddingBottom: '200px' }} />
                  
      <Footer/>
    </div>
  )
}

export default Astrovid3p
