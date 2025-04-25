import React from 'react'
import Navbar from '../../components/Navbar'
import HeroOther from '../../components/HeroOther'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom';
import '../css/allvideo.css';

const bc4p = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 4: Putting It All Together"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/NpQJoCQEa9U" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTi31s7F-Y-p_eSS9f_yvkGbt33v3uSJvbjLb1nBWSrWXyzybuE1Xm10rJmVCAunb-VYoCYonFi7unM/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vTAIWqN5RXNd7BmP8OK-Nh1A-0z5rRmaqAti_EwE4qTV4JYJqc5kNaTasJ3PyRhNW-MjwC5F9Vq1mKS/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Parent Notes</button>
          </Link>
          <Link to="/chemquiz" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Quiz</button>
          </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default bc4p
