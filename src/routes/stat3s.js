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
      <HeroOther overlayText="Lesson 3: Advanced Percents"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/WY7m3HsZf0k" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTAhU91EJ_z6iX-djK_T7sbUCHF8hQUWOR6uCK4GgM1v0725AOGG_LW97hQoFwQvNwQNH_DlBqJHcCV/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQvfaPh6EJaQX9Cl7GOBF1hzrrzeO7Nsiao9XL6wOnHlLY1UNzU4mp-hEHOxQne2eLz_L5uuW4HbuUp/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vSIUzrGRC5VAc1ZHeVUJF-xrFpY9-M9CJ6gXZsZ3oxd6btLRCWb_jCll0Y_aWKvRU3SMUC0voYTQbnc/pub" target="_blank" rel="noopener noreferrer">
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
