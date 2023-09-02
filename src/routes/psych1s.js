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
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vT-IotPr9rnAl9EnP7OC1syv8VALJ4XpTj_goQuVe_91KrbQHW6EcujmGBLWwAZcqS_fBqGZ1kq2EAO/pub?start=false&loop=false&delayms=3000&slide=id.g8bd6f3a396_0_248" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQlpH_yDf2HF54DJMHEMH19UwWqWd9jLIeKOM3VCTHVe4f-v4MIDQAZ-FdvQ1peTJyL-2UzrHZZysJU/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vS9-eJtWkRzmLbIGNi9fCENT9k91SEhmpZRqkoqfLPWo980bnsJyT5EEFfuEZp_KVA29AuLq_-Wht21/pub" target="_blank" rel="noopener noreferrer">
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
