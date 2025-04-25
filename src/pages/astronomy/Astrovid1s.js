import React from 'react'
import Navbar from '../../components/Navbar'
import HeroOther from '../../components/HeroOther'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom';
import '../css/allvideo.css';

const Astrovid1s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 1: The Solar System"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/vy2NuP1ITFo" frameborder="0" allowfullscreen></iframe>
      </div>
      <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSHCaacBter5Vp_LpWpW8qmNphqR4CZdmyFp9OIRzzuvveXNrmg-iTwFLOcsIdQMDazL6KyxAfk9ftU/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Slideshow</button>
        </Link>
        <Link to="/astroworksheet1">
          <button className="course-button">Worksheet</button>
        </Link>
        <Link to="https://docs.google.com/document/d/e/2PACX-1vRvLzrRtS52Gup_N7UbX3YdJN9DBAhImvR8jqu8yKo7Fwt2pY0UoOfxJlkt2HJKKrA1M3-L-KHihTpF/pub" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Student Notes</button>
        </Link>
      </div>
      <div style={{ paddingBottom: '200px' }} />
                  
      <Footer/>
    </div>
  )
}

export default Astrovid1s
