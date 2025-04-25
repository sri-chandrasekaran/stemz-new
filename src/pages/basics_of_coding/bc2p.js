import React from 'react'
import Navbar from '../../components/Navbar'
import HeroOther from '../../components/HeroOther'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom';
import '../css/allvideo.css';

const bc2p = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 2: Conditional Statements & Loops"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/gG1fPD2TrnY" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vR8aUGbuGrjxfsfu62phxwh9aK_46HS1evKG6XF9l2hV9vZECiExT5pMtgRtYv8BXqenKyTbSiSWeNd/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vSL3-yArGxNY6hYaMSbzItgO2SPHlgA4A-58nL0s-A018k6pBsxxBFmsjx2xgBici_UA9Spdkt5u2HK/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Parent Notes</button>
          </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default bc2p
