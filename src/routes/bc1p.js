import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './css/allvideo.css';

const bc1p = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 1: Introduction to Scratch"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/t7CqLrelByA" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQIQHNBGVlreu81AHlfE7x2aGQWdZAZmwfpvat674Lv0GJ_wF9PhrPsPE0Fhxvresr084xzW8J4xeO4/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vS0qe1b7koyWmBpAVgEPLEvp8lkumGl48m6vQO9gGreE9R3Bhpji2bOsmrCp4RZjmK9PQIan7CArT_k/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Parent Notes</button>
          </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default bc1p
