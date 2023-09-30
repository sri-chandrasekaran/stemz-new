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
      <HeroOther overlayText="Lesson 1: Classification & Taxonomy"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/pEDK7r21GBM" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQX54pfNPy3LsDG1TCZGj6FQydW8ZVCaPKcAykyBwV3j7pM3ZU1hIkAsjLY92i7s3EUICgdiSVdgEkO/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vR9-uiCX1yWWVEdWATTdE61IMRVjUdofKyBvBibGiPW1WdLctgn2ox_SM-mL9TE_hCkvkkAzRDCO45E/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQlPRXMCAbRcZ5te8WPSoPYemQfzEJzJgGvh2KOkjKuGHZD-8-rGG4zZ_08P9trbXA7dkKX_mUO60TD/pub" target="_blank" rel="noopener noreferrer">
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
