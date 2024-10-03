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
      <HeroOther overlayText="Lesson 2: Darwin's Theory"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/8IekIaOqmwA" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTiEy26Olh9_L-UlQ3TkDpRUV63zB92diaKleyhvokJgNQYRrLbNnVLQRejZAj8XcoqWw-ZkBHEBS-H/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vQo7xzYwSTRwtOgjLbrEOoDGTEVqrlZYe1ugSDbZYcP5Yai9zRUXU5KEsdZbk7dauqw4jiie_GTI99c/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Worksheet</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vQ4hpdsAvud7jIxLN7FgiNNrlVn7b02-VOhExkh14W3lmp3ume655qmWRGevMBqSA1YQoDrt_XPvnOz/pub" target="_blank" rel="noopener noreferrer">
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
