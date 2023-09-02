import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const Astrovid2s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 2: Galaxies"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/0MG58dFzUkU" frameborder="0" allowfullscreen></iframe>
      </div>
      <div className='centered-container'>
      <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQkBQUIrCPwy-b1jqDqHwtgY_SrlYd3LDmU9yd-czMHUjY7z6Qk25feHaF6l3RPwNRZ-HZK1Gjg-b8x/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vR1L8xHjcwy9HPfJ3VFCkv_la4_h3pHDcv4C5o0WS-RMiZsZwyzhfUmJvrSQG5rW-EXGv-J1IArDYpR/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Student Notes</button>
                  </Link>
      </div>
      <div style={{ paddingBottom: '200px' }} />
                  
      <Footer/>
    </div>
  )
}

export default Astrovid2s
