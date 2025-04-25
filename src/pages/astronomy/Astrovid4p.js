import React from 'react'
import Navbar from '../../components/Navbar'
import HeroOther from '../../components/HeroOther'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom';
import '../css/allvideo.css';

const Astrovid4s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 4: The Universe"/>
      <div className='vidbig'>
      <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/ImEEVWosix4" frameborder="0" allowfullscreen></iframe>
      </div>
      <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRpqUfykZPXPH0cs9Vi2IkyK8u25HEDi37Q8tVm7lt1-7C-CJ6VYBk1x2hLsmRAo1IzMOupWsQG51EM/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Slideshow</button>
        </Link>
        <Link to="https://docs.google.com/document/d/e/2PACX-1vSJoM_1V3iKpEWQWyFD16H42QDO_p-PGzFOS_28HJkfu6XUGzOavBacpqEPxgWQikdeOMVQsOuZPVck/pub" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Parent Notes</button>
        </Link>
        <Link to="/astroquiz" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Quiz</button>
        </Link>
      </div>
      <div style={{ paddingBottom: '200px' }} />
                  
      <Footer/>
    </div>
  )
}

export default Astrovid4s
