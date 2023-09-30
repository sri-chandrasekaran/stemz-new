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
      <HeroOther overlayText="Lesson 4: Mind Tricks"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/0KVSJrtktCY" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQnNZjuXykeqwiQlZhzDAZzbH7byUHn_kgWVHsySYbsV_o14t84vseL0L6orqx99k_tsVVsci34Ji5n/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRLQW9cUCp2i8a-uzbhwtZpsIxlOFUh26ZyM2fRhl32pJn_vsrjGLKufF9xMqjOnl1-yZDHBtxH2cnY/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default es1s
