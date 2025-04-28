import React from 'react'
import Navbar from '../../components/Navbar'
import HeroOther from '../../components/HeroOther'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom';
import '../css/allvideo.css';

const es1s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 5: Surveys & Real World"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/folkaRAmLWw" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQ08TtGwW-qDJPmRtsujKLMhcgzM35YXHQhrc9G7StcjBNfWvKbuqpXVmlfBdTHbAkC_9I2GiH7lqOQ/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vTBQLB9YxKYD8x633Rk2fdIzVb-xrFsYXgtcOJA5G29ifZjqnFENbC6spvcyyNPT7NNnYwonqoetUSY/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Parent Notes</button>
          </Link>
          <Link to="/statquiz" target="_blank" rel="noopener noreferrer">
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
