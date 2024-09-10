import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const Astrovid3p = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 3: Space and Humans"/>
      <div className='vidbig'>
      <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/v4pT0yllkO0" frameborder="0" allowfullscreen></iframe>
      </div>
      <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTSxvdIuzlZ9z_0_IQyQRKq2l46jjbbZUnsyzp-O38OvjEFaCExoDORLKrbCJcqrFCozztoypoy3YhK/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Slideshow</button>
        </Link>
        <Link to="https://docs.google.com/document/d/e/2PACX-1vTEaJ7iDzAUinglguqROpP1td07qS3MJXrmV3s9pyxH3qCYkMPgAjF167X7FLqv-tFDwJf1t9DyyFU8/pub" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Worksheet</button>
        </Link>
        <Link to="https://docs.google.com/document/d/e/2PACX-1vS3iD-PzMmqQS504HQMMXvMEqbXKCFOw2AGHZb8w-X57NtqWiVdpLAswvuioJxlUCGbDLMouSlySKtM/pub" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Parent Notes</button>
        </Link>
      </div>
      <div style={{ paddingBottom: '200px' }} />
                  
      <Footer/>
    </div>
  )
}

export default Astrovid3p
