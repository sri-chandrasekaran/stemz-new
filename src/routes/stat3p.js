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
      <HeroOther overlayText="Lesson 3: Advanced Percents"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/WY7m3HsZf0k" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQez6xFKxIp8sZWJb6YWCcNdd5dE4JrsA6QfWn2yKrF5CBiS9lUnmejPkjnEMfIPopUiIejxw1ZQYnX/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vSdm_ju5frgUIP_YNCJ0oZ6bP0NFEc4kgOGinKMszVVHhIKuAGHna1usyQYfhhUB9cnbn1IEMxarfgL/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRMy8_SzfiNMH95GocrImUPgo4qTvHR-AsyN5GgP4iAwWxT_T8o7V17NkAxY-C2xOKwnbHHyuoCR2We/pub" target="_blank" rel="noopener noreferrer">
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
