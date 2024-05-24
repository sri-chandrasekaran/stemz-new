import React from 'react';
import './OnlineClasses.css';
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import PhotoCarousel from '../components/PhotoCarousel';
import Physics from '../assets/physics.jpeg'
import Coding from '../assets/coding.jpg'
import Zoology from '../assets/zoology.jpg'
import Anatomy from '../assets/anatomy.jpg'
import Biotech from '../assets/biotech.jpg'
import Coding2 from '../assets/coding2.jpg'
import { Link } from 'react-router-dom';

const OnlineClasses = () => {
  return (
    <div>
        <Navbar />
        <HeroOther overlayText="Online Classes"/>
        <div className='main-online'>
          <h3>Sign Up for Classes!</h3>
          {/* <div className="photo-carousel-container">
            <PhotoCarousel />
          </div> */}
        </div>
        <div className='course-listing'>
        <img src={Anatomy} alt="Genetics" className="class-img"/>
        <div className='class-description'>
          <h1>Anatomy</h1>
          <h2>When: 6/3 - 6/6, every day from 10 - 11 AM</h2>
          <h2>Recommended Grade Level: 3rd - 5th Grade</h2>
          <h2>In this course, we learn about the various organ systems of our body, including the skeletal system, nervous system, and many more!</h2>
          <Link to="https://forms.gle/FLnFoy67gsmkxr816" target="_blank" rel="noopener noreferrer">
                  <button className="class-button">Register</button>
          </Link>
        </div>
        <img src={Zoology} alt="Genetics" className="class-img"/>
        <div className='class-description'>
          <h1>Zoology</h1>
          <h2>When: 6/17 - 6/20, every day from 10 - 11 AM</h2>
          <h2>Recommended Grade Level: 1rd - 4th Grade</h2>
          <h2>In this course we will learn about the field of zoology, some topics include biodiversity, taxonomy, and anatomy.</h2>
          <Link to="https://forms.gle/tKWnvmFaPVCX8AnN9" target="_blank" rel="noopener noreferrer">
                  <button className="class-button">Register</button>
          </Link>
        </div>
        <img src={Coding} alt="Genetics" className="class-img"/>
        <div className='class-description'>
          <h1>Basics of Coding</h1>
          <h2>When: 7/1 - 7/4, every day from 10 - 11 AM</h2>
          <h2>Recommended Grade Level: 2rd - 5th Grade</h2>
          <h2>In this course we will learn about movement, variables, conditional statements and many more, using Scratch. No prior experience is needed!</h2>
          <Link to="https://forms.gle/Rt8m4xTTPNdyu3hk6" target="_blank" rel="noopener noreferrer">
                  <button className="class-button">Register</button>
          </Link>
        </div>
        <img src={Coding2} alt="Genetics" className="class-img"/>
        <div className='class-description'>
          <h1>Basics of Coding II</h1>
          <h2>When: 7/15 - 7/19, every day from 10 - 11 AM</h2>
          <h2>Recommended Grade Level: 2rd - 5th Grade</h2>
          <h2>In this course, we will be going over lists, traversals, loops, and more! Basics of Coding is recommended.</h2>
          <Link to="https://forms.gle/aWG6B8PYXtQra2Fr7" target="_blank" rel="noopener noreferrer">
                  <button className="class-button">Register</button>
          </Link>
        </div>
        <img src={Biotech} alt="Genetics" className="class-img"/>
        <div className='class-description'>
          <h1>Biotechnology</h1>
          <h2>When: 7/29 - 8/1, every day from 10 - 11 AM</h2>
          <h2>Recommended Grade Level: 3rd - 6th Grade</h2>
          <h2>In this course, we will be learning about the applications of biotechnology and more!</h2>
          <Link to="https://forms.gle/DR8JXKMnaGM5Yahu6" target="_blank" rel="noopener noreferrer">
                  <button className="class-button">Register</button>
          </Link>
        </div>
        </div>
        <div style={{ paddingBottom: '230px' }} />
        <Footer />
    </div>
  )
}

export default OnlineClasses
