import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './css/allvideo.css';

const bc4p = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 4: Final Review"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/6czRyGrNf_4" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQ9Al1CuqZfkkt6NTH4PpwMk60fKasN_NVdGE1-Jnbl9Yr7MX2vTvZXgwWWroo08qHJoGFpSa3LfzCc/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vTh0P1Vp-4xqQjBFZnUI2idmKVogmYfPPYWmVJb5MC0avSUQ3o4ZGD0C_3NcGnP9IEL4-tTDubNlnPQ/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Parent Notes</button>
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
