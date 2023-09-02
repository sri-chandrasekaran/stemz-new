import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const Astrovid1s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 1: The Solar System"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/vy2NuP1ITFo" frameborder="0" allowfullscreen></iframe>
      </div>
      <div className='centered-container'>
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSr3e9CF977isknsVQzGrdLsDkrC60VyycBj-xdDiz9Ouw_qgwijJR9QIOwujE9jljLv3bhnV9ZQdo_/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQ716Pn8_l3Ojb8TWW41zXV0xg4UwVJ9-IkqfsEgACHVFAXtoutE_HTIetzwsycRvcRKC9plX-WkwkS/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vT33xIBvK_283aTk_k9AOyuO2YgQqAHuhs8bAVVDbG3-aYqY6QkALxV10GxZ2grpwztEnOJFXCzMchp/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Student Notes</button>
                  </Link>
      </div>
      <div style={{ paddingBottom: '200px' }} />
                  
      <Footer/>
    </div>
  )
}

export default Astrovid1s
