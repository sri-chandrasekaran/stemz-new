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
      <HeroOther overlayText="Lesson 2: How the Brain Works"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/ieBDGtmN2fI" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSYrQHIdTmkbZqTZgCfC7vQDHfnrFQbbK0jPqOdQeg4fjhbKaMaPM82MVT_GLD5-XQD5bn1ljPmWnoE/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vS2ISWZcbyInQwbfADcUJeIuqgT38OLXjT-gOcc4jMPtGaZrkxD88-m9tJaaTSRrZ0gGCRAGczdYq3X/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTSfpOtsV5flOpadszr7ezY3_SWIzLyAd9KZNmhXGUfdSNXS0sSrMSdi7Rhz0yczzk5Hz208Xy9A26J/pub" target="_blank" rel="noopener noreferrer">
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
