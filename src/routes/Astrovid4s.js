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
      <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRBR7LWZPQEuS4askp8IyxBgOsIoMZjNXB7vDqIHp3DHQYdL_tbrTz49ufdA47Piq_n82wiLyTTAMJm/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
        <button className="course-button">Slideshow</button>
      </Link>
      <Link to="https://docs.google.com/document/d/e/2PACX-1vRLucP73Qzt0xNM3WWG-MZOBvc07qHmKH6_5IUODTfrDzVwT3x9kenz5DdEr0okM3805Z7YMTTU2Z6I/pub" target="_blank" rel="noopener noreferrer">
        <button className="course-button">Student Notes</button>
      </Link>
      <Link to="/self-paced-classes/astronomy/astroquiz" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Quiz</button>
        </Link>
      </div>
      <div style={{ paddingBottom: '200px' }} />
                  
      <Footer/>
    </div>
  )
}

export default Astrovid4s
