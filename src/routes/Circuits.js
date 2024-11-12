import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import Circuits from '../assets/circuits.jpg'
import { Link } from 'react-router-dom';
import './css/Astronomy.css';

const CircuitsPage = () => {

  const scrollToTop = () => {
    window.scrollTo(0, 0);
}

  return (
    <div>
      <Navbar />
      <HeroOther overlayText="Circuits"/>
      <img src={Circuits} alt="Circuits" className="course-img"/>
      <div className='course-description'>
        <h2>Recommended Grade Level: 4th - 6th Grade</h2>
        <h2>Length: 3 Lessons, 1 hour each</h2>
        <h2>In this course, your child will learn about the basics of circuits and how they are used in everyday items. </h2>
        <h3>Creator: Sri Chandrasekaran</h3>
      </div>
      <div className='student-l1'>
        <h1>Student-Led Lessons</h1>
        <div className='lesson1'>
        {(<div className='lesson-content'>
        <Link to ="/circuit1s" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/MFr0Y52UICk/mqdefault.jpg"
              alt="Lesson 1 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 1: Circuits & Circuit Boards</h3>
            </Link>
            
            <Link to ="/circuit2s" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/pK9h_Ts3gWw/mqdefault.jpg"
              alt="Lesson 2 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'> Lesson 2: More Circuit Board Tools</h3>
            </Link>

            <Link to ="/circuit3s" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/4ZBUoBPdojA/mqdefault.jpg"
              alt="Lesson 1 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 3: Creating a Functioning Circuit</h3>
            </Link>
</div>)}
        
        </div>

      </div>
      <div className='student-l1'>
        <h1>Parent-Led Lessons</h1>
        <div className='lesson1'>
        {(<div className='lesson-content'>
        <Link to ="/circuit1p" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/MFr0Y52UICk/mqdefault.jpg"
              alt="Lesson 1 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 1: Circuits & Circuit Boards</h3>
            </Link>
            
            <Link to ="/circuit2p" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/pK9h_Ts3gWw/mqdefault.jpg"
              alt="Lesson 2 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'> Lesson 2: More Circuit Board Tools</h3>
            </Link>

            <Link to ="/circuit3p" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/4ZBUoBPdojA/mqdefault.jpg"
              alt="Lesson 1 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 3: Creating a Functioning Circuit</h3>
            </Link>
</div>)}
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer />
    </div>
  )
}

export default CircuitsPage
