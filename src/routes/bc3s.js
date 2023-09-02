import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const bc3s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 3: Wait & Sensors"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/qEcc3yjrwOI" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQJV5awdB80XKfRUDrWAFCt3x1GsAZIny2Lj3cU9gMhf-PXPmb4a1g2DM6JGKEstCgPN5Ur2NSzegWG/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Slideshow</button>
                    </Link>
                    <Link to="https://docs.google.com/document/d/e/2PACX-1vRPZxnk8UE8mfN7OG1oeaWGPdpIF9q-xtv20wOwH9UOageASc_8ZbpYI2GLe1qsfbSEfjhvJEVUPbBj/pub" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Student Notes</button>
                    </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default bc3s
