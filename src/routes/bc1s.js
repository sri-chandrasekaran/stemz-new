import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const bc1s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 1: Introduction to Scratch"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/t7CqLrelByA" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRZJUwzkTw2zs1zjawrDsbwfZwXGBby1l-tMx4r-cVK2BkfU1M5TW4Rtq2NttiPHgRQXRD16DPDhGkE/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Slideshow</button>
                    </Link>
                    <Link to="https://docs.google.com/document/d/e/2PACX-1vRJJJX9uBxDPSDMhnpv7htzUAS4o_0VejVPH9krMvKOoDuDF9j39Z02Ry1Z2a3O_nPSCIeEsg7e8ZTk/pub" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Student Notes</button>
                    </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default bc1s
