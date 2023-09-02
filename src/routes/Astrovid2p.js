import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const Astrovid2p = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 2: Galaxies"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/0MG58dFzUkU" frameborder="0" allowfullscreen></iframe>
      </div>
      <div className='centered-container'>
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vT0x0wT-PGEetENLuNz1ZN1pxKbloDZDe6ZwiovLLwQhtvuwu-SpFlsYTRkZu-3MluMkyGEbYHY37uK/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRc3oiey_HcGS-iVLYcKO9P1M44wK37TwfTwYFo61cXo7AOy3nq23y6_BcpIt2ygg2iiL1bGxMprTbT/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
      </div>
      <div style={{ paddingBottom: '200px' }} />
                  
      <Footer/>
    </div>
  )
}

export default Astrovid2p
