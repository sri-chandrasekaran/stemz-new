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
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSH4SI6ficFEAzH_Qg6fRZopBkcqrTotnAt_zoxymblJASNRlUYZZpxQiWg3bEPrOCm_3VYMlt7QI0D/pub?start=false&loop=false&delayms=3000&slide=id.g8e77108816_0_92" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTpUYy0Kd3VN49jt4EnwaD38vd97PB0oDKBDEHEhk9s78kYreahI2JqAJZCeRpv9aYpsUzDgefU0Nzf/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default chem1
