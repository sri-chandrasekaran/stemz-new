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
      <HeroOther overlayText="Lesson 2: Molecules & Atoms"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/EJpJLOAIHRc" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQKljVI6VZS6jFU7ajZLtgJI2Jp4o2jqvxXDxOjLe__NGezj6cjzAsbAiJGheSEk0WVOY3a8G7vV8j6/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vSie8ZIl-MnXPw0MyeRdRi-TjA7K70IBpHKkK9ByoWAtbWP4i4NqRf2l3ejDG2Fd3zAQNzZMDpXoYHi/pub" target="_blank" rel="noopener noreferrer">
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
