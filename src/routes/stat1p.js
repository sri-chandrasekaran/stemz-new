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
      <HeroOther overlayText="Lesson 1: Fractions"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/imGo9o7Epo8" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRMohCHR7LpleWfVyfEUMajglNlI29aC5D2lVLFJd9IBKtefsGpBYp3yRvEX5obuGqDySWoKpEJcMfd/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTODK4n5of791eymmQQkXQBon_npy2SAxemQLhAd922iOMrdrQOJCfp3Lv2u14WY4Kj4kgqWtBWb15k/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQhhp7VA72W4MwqXwYGNz0x1JiYV4LE6YxVh-VXggqD1N79Inpa4cwCbDBDmTW_oI_nozE8Ml5ou8uO/pub" target="_blank" rel="noopener noreferrer">
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
