import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const chem1 = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 1: Chemistry & Matter"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/qUcexzJnLew" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vR5q3_yft5X--ouH78cIbOWuLlUpQak03rKJflUQL509vC9zycyy2A29QaFSqLTxVr7dRfS8sYE2cUy/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vTPBVF7KrSZCQf5VUTaBGSgPTuLC8NvG2hXMHoOhyUmqURO9G-2UEcz_9nFCiRUspfboDLbfpdve260/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Parent Notes</button>
          </Link>
          <Link to="/self-paced-classes/chemistry/chemquiz" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Quiz</button>
          </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default chem1
