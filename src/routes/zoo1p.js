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
      <HeroOther overlayText="Lesson 1: Classification & Taxonomy"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/pEDK7r21GBM" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTvPjxLFeVpLdTS1uJpyoehtq_Izx1p6CZnUuIm5MNoOrLpjnIqqzf5aygzWtNlQT4o-_GOP441CaRq/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRSsi3yvAVdVhMCx4RoWJQtVhtiQQwtXdS452YdTFwF5t7q4AqjXv14VikgvtWLXU48fw4GGqgY8vTP/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRua5trbf61SWjXuak-CFWGBgEeuw1xYm36UR7j-ipd1kBoE5Nq0E-VyVANQD5w0K8V3NDaybyMrWeC/pub" target="_blank" rel="noopener noreferrer">
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
