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
      <HeroOther overlayText="Lesson 3: Distribution"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/PpDLfndy7zs" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQzzW2hIV-xbsRbbxnvl_okaQ4Vj9W9_i-VGHe9KT9ORTo0xutFFcoybX5jzpstupNu4z1v0T27hjfh/pub?start=false&loop=false&delayms=3000&slide=id.gd52056e2db_1_60" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRp9zdE2jaBYUYnPXDltmJTbIduB5y9JrWvoSRnkVroNXK4ZCRLSp3nWz1hzR_qXRDwkSEAcEeuzLv3/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default es1s
