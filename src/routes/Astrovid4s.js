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
      <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSI7VUQXrscGhilpertuTvYvL2HETLKSsbJ4R6AkVBJMjDUw8cxtbeTXbAvsoPCIUrcEqIZ4E42UFK4/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQHsI3hmsAXzmnmedrumyzTaGOHdpeV9YGwJ0Aa_bNECKtKH-ylzRU8-KUdXRtvgVr9FyWLDE844s6A/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Student Notes</button>
                  </Link>
      </div>
      <div style={{ paddingBottom: '200px' }} />
                  
      <Footer/>
    </div>
  )
}

export default Astrovid4s
