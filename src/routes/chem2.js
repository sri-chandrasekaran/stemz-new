import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const bc4p = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 2: Molecules & Atoms"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/EJpJLOAIHRc" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRSv4pMB-_1kVHCbb9D_gKSW4EkJKqAyZQxqIqlctucIFtbnyrpoP4AYVm2Sdm3WqW3d6rjp_jYZqte/pub?start=false&loop=false&delayms=3000&slide=id.g5320acc4cf_0_92" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRrTDPHmQEDEqN6jIzSYNTQk-ClPZWZ8EwJyzAhxy18AYViSGk6G_l0lh5RQfTrTdpX6pmAKBILMIEy/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default bc4p
