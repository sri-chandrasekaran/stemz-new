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
      <HeroOther overlayText="Lesson 1: Psychology & Scientific Method"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/TjGatGI4CJM" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQ-vjBlKAWDEa513c85FwKAIrMDkjeRvfFRmmWS3MAhYy1m8Mm2cPuEMFqybbKqiKzROBfLvLGwXeM0/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vQGtpG3_ItzLb452bqGrU6scVsodFnQFchvCGZ-tQn58tSxDJPT0uruN8ZapUQVzo8eqBnsbLG6LqFd/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Worksheet</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vSlH65JZnS6yB3lL8zWNOQt3XE3mhX16FE3Nk-XLKZlMOg_lutgQ6fJK_AIr_zUNFKMVyTKhdgrx4HG/pub" target="_blank" rel="noopener noreferrer">
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
