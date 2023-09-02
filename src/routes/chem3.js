import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const bc4p = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 3: Chemical Reactions"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/448XzSXabc4" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTllezBHZQYNAODvaFlfIOv2ybfjRz1nPW23v-lD1E9F8dmkKKB4JjUQk2O4wd-e0A6NfWSjm58Rfi1/pub?start=false&loop=false&delayms=3000&slide=id.g914a40a4f6_0_92" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQREjt8_iK_5znGWaV_0HYezNqhQaCnp7RWS7_CJDeMN7s06ndu1PE5cv3fra1ZhQvKJEgjyVKHZiSv/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default bc4p
