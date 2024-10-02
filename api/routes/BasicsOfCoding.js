import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import Coding from '../assets/coding.jpg'
import { Link } from 'react-router-dom';
import './Astronomy.css'

const BasicsOfCoding = () => {
  
  const scrollToTop = () => {
    window.scrollTo(0, 0);
}
    return (
      <div>
        <Navbar />
        <HeroOther overlayText="Basics of Coding"/>
        <img src={Coding} alt="Basics of Coding" className="course-img"/>
        <div className='course-description'>
          <h2>Recommended Grade Level: 2nd - 5th Grade</h2>
          <h2>Length: 4 Lessons, 1 hour each</h2>
          <h2>In this course we will learn about movement, variables, conditional statements and many more, using Scratch. No prior experience is needed!</h2>
          <h3>Creator: Sri Chandrasekaran</h3>
        </div>
        <div className='student-l1'>
          <h1>Student-Led Lessons</h1>
          <div className='lesson1'>
          {(
            <div className="lesson-content">
              <Link to ="/self-paced-classes/basics-of-coding/bc1s" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/t7CqLrelByA/mqdefault.jpg"
              alt="Lesson 1 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 1: Introduction to Scratch</h3>
            </Link>
            
            <Link to ="/self-paced-classes/basics-of-coding/bc2s" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/gG1fPD2TrnY/mqdefault.jpg"
              alt="Lesson 2 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'> Lesson 2: Conditional Statements & Loops</h3>
            </Link>

            <Link to ="/self-paced-classes/basics-of-coding/bc3s" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/qEcc3yjrwOI/mqdefault.jpg"
              alt="Lesson 3 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 3: Wait & Sensors</h3>
            </Link>

            <Link to ="/self-paced-classes/basics-of-coding/bc4s" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/6czRyGrNf_4/mqdefault.jpg"
              alt="Lesson 4 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 4: Final Review</h3>
            </Link>
            </div>
)}
          </div>
        </div>
        <div className='student-l1'>
          <h1>Parent-Led Lessons</h1>
          <div className='lesson1'>
          {(
            <div className="lesson-content">
              <Link to ="/self-paced-classes/basics-of-coding/bc1p" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/t7CqLrelByA/mqdefault.jpg"
              alt="Lesson 1 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 1: Introduction to Scratch</h3>
            </Link>
            
            <Link to ="/self-paced-classes/basics-of-coding/bc2p" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/gG1fPD2TrnY/mqdefault.jpg"
              alt="Lesson 2 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'> Lesson 2: Conditional Statements & Loops</h3>
            </Link>

            <Link to ="/self-paced-classes/basics-of-coding/bc3p" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/qEcc3yjrwOI/mqdefault.jpg"
              alt="Lesson 3 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 3: Wait & Sensors</h3>
            </Link>

            <Link to ="/self-paced-classes/basics-of-coding/bc4p" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/6czRyGrNf_4/mqdefault.jpg"
              alt="Lesson 4 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 4: Final Review</h3>
            </Link>
            </div>
)}
          </div>
        </div>
        <div style={{ paddingBottom: '200px' }} />
        <Footer />
      </div>
    )
}

export default BasicsOfCoding
