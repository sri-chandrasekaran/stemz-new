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
      <HeroOther overlayText="Lesson 3: Chemical Reactions"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/448XzSXabc4" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vShEXZnajB9Zk1rN6jWDOmOVoZxfO5-DdRck_tdIDdP7nUl0XP66VOKfpxMZsn2uicoo2tsYu6YFMj4/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vRHLSvHpwUKgeHsOfZO1dUIrTZyp4iPF-u5phmzF7rHVB9sZhBhRRXJkkdGVev_faj6gbuFTf4NZGaG/pub" target="_blank" rel="noopener noreferrer">
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
