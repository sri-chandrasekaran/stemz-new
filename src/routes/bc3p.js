import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const bc3p = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 3: Wait & Sensors"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/qEcc3yjrwOI" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQWsKeSJxdfXS-vDKLZbaNmQnA9tZKasl2b9hOd8-IfnaK7hh4NGzWDv5HqO6Toy3jHgXblVKX8txm_/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Slideshow</button>
                    </Link>
                    <Link to="https://docs.google.com/document/d/e/2PACX-1vTsLHiYkABy88PUyLyn9_yQReaAf8gCn8NiClh3mHBHodDmRovFjnkoOgDgR9hkB1IiecVrFLldGQuZ/pub" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Parent Notes</button>
                    </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default bc3p
