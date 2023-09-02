import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const bc1p = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 1: Introduction to Scratch"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/t7CqLrelByA" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTtaqTCQT4sZWDjpW223YRhiPjw2gyTc0-GcPcqD4y2gqZhElROyvopqOHfNNF1Vc9JzQdTeJ8LjbNg/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Slideshow</button>
                    </Link>
                    <Link to="https://docs.google.com/document/d/e/2PACX-1vQp1l0m0zheAQFp-D1Edte2Puv8O6E-uR08in-gzk0qqZraG8UTlMm-3M1wxBTvJbbNpcnurV3SfokB/pub" target="_blank" rel="noopener noreferrer">
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
