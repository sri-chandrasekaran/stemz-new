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
      <HeroOther overlayText="Lesson 2: Cycles of the Earth"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/mpu_qNfo-dM" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQM8TeCu7OiUeYlEWYCK7XqdCo7FjM6JzahJZuuzoHf57HrifkMDNthtDcptU1EV2QBQ-CfUHoYbaOD/pub?start=false&loop=false&delayms=3000&slide=id.g13c0851f5cf_0_60" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vS1_kb3I_EbwdI-YgMn32tLdSyFdTongcOKBsJ6CKuMTBS2TFE-VsPKpV9TDdv-BxDx6bhelIwnAAiy/pub" target="_blank" rel="noopener noreferrer">
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
