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
      <HeroOther overlayText="Lesson 4: Types of Graphs"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/folkaRAmLWw" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vR0Wr_xLf2klBNgsoY9fOfMBB0jT6QGcCElaLQ3xBrf4lIwoYIvlCjSrDXgnKLTcG7i3lrnPDUovwkl/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vS5CYb6efIqdlVlCQagLv-NrlAIYtTPqQhwyVre-XPQQu7PsmfClJfghCiF0JPNQfEtuMfpCOF9zgJX/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vS1Iq8-klZyrr-4GHb-2LZt2PKiCMUHCnGVJjioo0k0SyvRf2LKdzT2Vf4vI6bcJ77iPYDJcbW2VS1F/pub" target="_blank" rel="noopener noreferrer">
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
