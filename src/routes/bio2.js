import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './css/allvideo.css';

const bio2 = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 2: Proteins & Carbohydrates"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/Vg1nWNNHhok" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSbaxlHQxP4MboLd2JWNeOP55uL1eEdqCMhzy8_-8GRUtnznUn10LytPOOqwQZA2tRrt9hXrlOdM86V/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="/biochemworksheet"> {/* Navigate to AstroWorkSheet */}
            <button className="course-button">Worksheet</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vRgN28ND5SLhY9wg_V3hwq3KllgU_SgHbO2TlDtdS7BUFhH03VDgwOdf4WGdX4UJf7z68YicgeQN22g/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Parent Notes</button>
          </Link>
          <Link to="/bioquiz" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Quiz</button>
          </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default bio2
