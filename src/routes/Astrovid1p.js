import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './css/allvideo.css';

const Astrovid1p = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 1: The Solar System"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/vy2NuP1ITFo" frameborder="0" allowfullscreen></iframe>
        </div>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTGK-o-RiizZsV2YB4f_lMoLouCf4yxPvwMFLqZRS4gy53vWsrFJ0Ldf_GbWkPU5ulKrOsByciosSn6/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Slideshow</button>
        </Link>
        <Link to="/self-paced-classes/astronomy/astroworksheet1">
          <button className="course-button">Worksheet</button>
        </Link>
        <Link to="https://docs.google.com/document/d/e/2PACX-1vTdGKXqqYoyPqLKc0Ld-IO4bzXW_3duz3FE2ftNBGyrckhh9ZmfiISNx_6CL6E0zjrhoD8hLle8ReI_/pub" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Parent Notes</button>
        </Link>
        
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default Astrovid1p
