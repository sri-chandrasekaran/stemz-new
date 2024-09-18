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
      <HeroOther overlayText="Lesson 4: Final Review"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/6czRyGrNf_4" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQXC7LPlQ_Ez1YlP0PiWGSPutT3F1jPHAo88v7YQQNZ0ykLYKINi_KKFp0HgZkln3bTOpDmMeIBbcw6/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vTR2gynBeVQELbLLRfWnobN29LGDrlyw2y0epddcQ9-6p2XHBDE4K7OHoTnJLh_lJZSEHiDsG317C2D/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Student Notes</button>
          </Link>
          <Link to="/self-paced-classes/basics-of-coding/bcquiz" target="_blank" rel="noopener noreferrer">
              <button className="course-button">Quiz</button>
            </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default bc4p
