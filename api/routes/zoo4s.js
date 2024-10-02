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
      <HeroOther overlayText="Lesson 4: Behavior"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/x8jMSVan1Rc" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRt9nG99aohxkgNmzufdvJ7dbinXiC4_wINUmTIVEAGVkhcyrkYVh_b_Rg7zhoPL4Lm5gJRScF0Hk0W/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vSVUg8KYux9sxwETqE0vScPssz2DJhV4c415MO1DTEkIJJmxHdC0lfi2OqAvxgxEyJ8V7fPlp6aYs-4/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Worksheet</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vTAygONISUsQP4xvjM0hGkY8qtgsrmhnYsSu8AYAo0rinJpLpAosH4mEdDQzCf9ynB9q09EiJggJGvv/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Student Notes</button>
          </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default es1s
