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
      <HeroOther overlayText="Lesson 1: Biomes"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/_WRumK_NwfI" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSMZ0rXwZvnkEKHteN-chdDj8d47dnXJikHhXI20dAmjrbt05-zTfc9pYu6GtukodzHKlnSFM7avdVt/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQxw1Fh1T4a6OPteEismZQ7oU_jiE64kLHGPqd4tFEAd1DC8FSCnz0YJTZwIRmuiU-MNPj20qnJLKxv/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTsSVsvBGfgUZF8xCj99nWk0saVARVUcIJGPjD20TIjSRl_Rw3NzXFY1hIiGYNVSl9PbofRiE1GVRdQ/pub" target="_blank" rel="noopener noreferrer">
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
