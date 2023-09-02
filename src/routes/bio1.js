import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const bio1 = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 1: Nucleic Acids"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/Vo_1vhGWER8" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSRA7OlH1eToF971sBlGf8Vc7ZZsxePtI4Dg39sHZrV8Zce4P6ikdZ2nBUZbhAQYiJZcQPFct3H9rs5/pub?start=false&loop=false&delayms=3000&slide=id.g5320acc4cf_0_92" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQlM4liz99AWyrVaKpjk6z6_iMYmDeSIsP3fheQo_i_vtV4xRel8Fcmdz-_jFJq62TgFMHzgTInl-cJ/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default bio1
