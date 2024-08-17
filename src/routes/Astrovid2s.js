import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const Astrovid2s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 2: Galaxies"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/0MG58dFzUkU" frameborder="0" allowfullscreen></iframe>
      </div>
      <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSgXqu9vIHDXjitX678G5HqDLyv-MOHxLOEB5kgoNLv5Uf8JinGBASHGVzB7fp7gqUM_iW9E7jClUu7/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Slideshow</button>
        </Link>
        <Link to="https://docs.google.com/document/d/e/2PACX-1vRKnZALs45B6cuCMLoV_o8TjaUZ6wSllEgIuOo6nxUdpHzNmisWkI1YV79X5QPuS5c1PBIwx8mnP8OH/pub" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Student Notes</button>
        </Link>
        <Link to="/self-paced-classes/astronomy/astroquiz" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Quiz</button>
        </Link>
      </div>
      <div style={{ paddingBottom: '200px' }} />
                  
      <Footer/>
    </div>
  )
}

export default Astrovid2s
