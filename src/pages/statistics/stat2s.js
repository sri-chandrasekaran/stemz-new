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
      <HeroOther overlayText="Lesson 2: Advanced Percents"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/zL7QABzjyxA" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQ3OQdzTer_4ePeXx4JeHruqJH7QQGcJpM6XvhFs1QwD1RjjlIeidOW72rODGGY_vyZukSw1ZiYPK4B/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vQfYUYFgYhrlIRHGVZc2IZW5eMOyFBHqBsTByh-c9UkkJPa3-MIbMKM1BlV9WZp1Ua70qVCD3Trxozc/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Student Notes</button>
          </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default es1s
