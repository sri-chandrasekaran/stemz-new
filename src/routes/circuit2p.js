import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const circuit1s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 2: More Circuit Board Tools"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/pK9h_Ts3gWw" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSZHWzC6yGjZEVx_cw3e-6srvnp6UVFtpplHoAz2hqFL97-Wqe82YqqqtwTgXqFLvB9BJanvSfq038c/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vSlR3PGH5U8smmplmLzXoDTQ10ENEpTfWeXlwOOvDKnnW6s9hJrkkDWN4WGHGRqwlyqJuvdE640GafT/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRGQNJt03tck3-tVwJIimOMMX2eZWunryjyuMtioDOHaC8JTGb53XppTvAckKBtBOyw2I6clkCGP1N0/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default circuit1s
