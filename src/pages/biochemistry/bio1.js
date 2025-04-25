import React from 'react'
import Navbar from '../../components/Navbar'
import HeroOther from '../../components/HeroOther'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom';
import '../css/allvideo.css';

const bio1 = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 1: Nucleic Acids"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/Vo_1vhGWER8" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRNDXu_-pVyFsP6CmtbRtNo3r4ytpzzwCUrScwUNA076Rw_xPe_O2D0_OmWBJne2_MG7npPq6MkJdwd/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vQIBdNnmb7ZNhqb7dwI7ruLCCrW660HRNd9qzS4JhKO7EuN31WHIeDeiKsvNSxhpn2srjNf_rMF0GnD/pub" target="_blank" rel="noopener noreferrer">
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
