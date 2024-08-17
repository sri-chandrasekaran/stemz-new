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
      <HeroOther overlayText="Lesson 1: Biomes"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/_WRumK_NwfI" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTETrqYtujM4TATeiPQ8u3WnX-dIbUwUFclqik-GDn7w7HMQ2ZEulSuWZescS0FPJ9zX8F-Pdyt4J7g/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vRUirVOL8YLkxol0nTrImCblQ0sB-Xu2LbLwvxLluYWSEPicxO7NpKWZ8avM_bjvTNsYJUGGffU_w8m/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Worksheet</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vTT4pw3kWlJ4Za6GSGBcnc7tAnI2GupEZwwWg7G8GLHqja_4lf6250YYj58ktt_430OVdCshhh46mWD/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Student Notes</button>
          </Link>
          <Link to="/self-paced-classes/environmental-science/esquiz" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Quiz</button>
          </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default es1s
