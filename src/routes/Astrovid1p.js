import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const Astrovid1p = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 1: The Solar System"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/vy2NuP1ITFo" frameborder="0" allowfullscreen></iframe>
        </div>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSYVLVT9YBNdOLvB4IeNFX45I5m6n6cS6K2qM79gzghPNMcX7NdiT1vJGHRAGKafSeAVo-lPtt3nEAK/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQ716Pn8_l3Ojb8TWW41zXV0xg4UwVJ9-IkqfsEgACHVFAXtoutE_HTIetzwsycRvcRKC9plX-WkwkS/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vR20jDT2zCL38cTPVEPFVyiMpp9Dbbid5Y6Q7R1etYSIpKxQGAptjcxVL_BOgK5WBm0hpMe1SnBNmEj/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
        
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default Astrovid1p
