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
      <HeroOther overlayText="Lesson 2: Darwin's Theory"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/8IekIaOqmwA" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQSZAvS9tPwlxXZnRI3fSwa8i-BRYY5pugaIcj8eZjGDLd4zSLSVuwMsolK_WQLZxs-poIHfuwby_Km/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQE7fuojpn-bDfk_6dHqNvrmIICRwcF2V3wvTrM0teRA6xjP6MNnzecbWXm7NuoPf-Xl6irrsyO6QpI/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vSVKeeZ_2086uJNoqcx7djBZpQSy22nSzTOF4UinEfqzjgCfN964IOQEH5XxqQuuHUG4_0x1GC59OdO/pub" target="_blank" rel="noopener noreferrer">
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
