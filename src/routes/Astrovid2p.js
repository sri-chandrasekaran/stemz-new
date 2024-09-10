import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const Astrovid2p = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 2: Galaxies"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/0MG58dFzUkU" frameborder="0" allowfullscreen></iframe>
      </div>
      <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQdWU47l-5s2mNONAWdRRoNh2ZsahyiY29n3cHM94xjfzq_TQ_NVBM-0TAGhDHDF0xCRWSKC9Gm3u99/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Slideshow</button>
        </Link>
        <Link to="https://docs.google.com/document/d/e/2PACX-1vTAjORWJP-cQc51q-GOvASlOxpB-onhHM6Hio7wROacriLdXWZCqTuI4pPSp4Ws1Y0-Qxk8S2uKGuT_/pub" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Parent Notes</button>
        </Link>
      </div>
      <div style={{ paddingBottom: '200px' }} />
                  
      <Footer/>
    </div>
  )
}

export default Astrovid2p
