import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './css/allvideo.css';

const es1s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 4: Types of Graphs"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/folkaRAmLWw" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQJIvyl_lwBvbOFaVu7XreDDTYJUpEt2_KChv1YuxrB9O-FvQN6vxzK9gUIWFAoUtrsgdzD5386Z4UV/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="/self-paced-classes/statistics/statworksheet3"> {}
            <button className="course-button">Worksheet</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vRJ13GWv9LxD3rAkdpkr4Lux_5TRi174Ki6JH9dLv8JAQhT04pS9IM_oFdeIHyYLtPZ-2Tj9JLOdPk8/pub" target="_blank" rel="noopener noreferrer">
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
