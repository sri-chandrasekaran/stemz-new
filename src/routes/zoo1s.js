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
      <HeroOther overlayText="Lesson 1: Classification & Taxonomy"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/pEDK7r21GBM" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTcUXhVuUmd6Zsu2kvXDKc8wwcx5z4KZLCL5f6iiBpq6G-BpkKR9hao17cfMzxLxkcJ4jXu4egJ5DA8/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTgskzWgFj-Ngy_JSdrbMaktLfOA2_E-yv8yPD1hercjizb3pqjDRo8gRQZJPYoDF99RbnKSrKkSX_o/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQ_o_5w2J1Zso1Y81vTwHeVYieIep9OzkP4IFqXwO05xP-UY8DMHLHXrC5cACFGUPhGQggEVxR3sXkr/pub" target="_blank" rel="noopener noreferrer">
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
