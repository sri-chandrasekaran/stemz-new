import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const bc2p = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 2: Conditional Statements & Loops"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/gG1fPD2TrnY" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRBYP0x_NK0OCDDPh9QSZdif1_uUSr708rmFtat3J3rv9JCtB-m4rr1KgscUtoW5V_PR6v48zPPqbEO/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Slideshow</button>
                    </Link>
                    <Link to="https://docs.google.com/document/d/e/2PACX-1vTKQXt02Jn5pLdyfr22KKK-DrqjkYHyu4AJE0ri8ZVlD0Fq13s8TBDajo5kBERGQG5qkHpl2sapJd1j/pub" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Parent Notes</button>
                    </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default bc2p
