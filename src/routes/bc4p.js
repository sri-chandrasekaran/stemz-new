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
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQ1EhlsDcUkJcUQd6slB1zlpJZ8tXROl9-D4j1aLHFFJg6UPijlF2VIg-iZMdWibsGDkMJ_rWcbh2J4/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Slideshow</button>
                    </Link>
                    <Link to="https://docs.google.com/document/d/e/2PACX-1vT34KocwdPhpfMtPBzehJ39reYFIUk82zH7V9_NNU6hCQ_T4-uaglD7_-CXeuwB8mpiBZ9oCGHYTbLe/pub" target="_blank" rel="noopener noreferrer">
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
