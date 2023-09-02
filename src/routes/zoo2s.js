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
      <HeroOther overlayText="Lesson 2: Darwin's Theory"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/8IekIaOqmwA" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTWzAuOlMpTv7WOoo5ux1_gxKypBx2q11d7cHaTQKKI53gDvbfjllWMg0lDbXIJ0LWZ9vREKHRlfaPY/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQJXf0niwHhM1HiGBPBiPv7SBPHN0J7uZJFWFWlJojH-XZSY1t6aWzqNlFxrx0iwvGfe3KwZ_JPQoeF/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTX9I2U7lQjb2Lx2FyxfGz9sx_ZVfBmmKPBGB-GwoQ_RVEv49z7vQ63ctPVA3GGGi8GPsKHmDkSKjK7/pub" target="_blank" rel="noopener noreferrer">
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
