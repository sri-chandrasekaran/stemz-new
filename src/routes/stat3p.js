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
      <HeroOther overlayText="Lesson 3: Advanced Percents"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/WY7m3HsZf0k" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQlMmDkJ7RDMK4vbKOhI5plpkziwZnh8DUP34BIN5vwV51_1Of8bgx0MvuABCENsBZJn_Gy1FlYk_zd/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="/self-paced-classes/statistics/statworksheet2"> {}
            <button className="course-button">Worksheet</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vSbVhd6X3VrxFXB3byG5YCiOaFizyptuSao9QmId4Yj3qQJQH3ssVU_PgSsOFD-pv7NgXQFxllI_uT5/pub" target="_blank" rel="noopener noreferrer">
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
