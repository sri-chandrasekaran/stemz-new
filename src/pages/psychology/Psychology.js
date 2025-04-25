import React, {useState} from 'react';
import Navbar from '../../components/Navbar';
import HeroOther from '../../components/HeroOther';
import Footer from '../../components/Footer';
import Psychology from '../../assets/psych.jpeg'
import { Link } from 'react-router-dom';
import '../css/Astronomy.css';

const PsychologyPage = () => {

  const scrollToTop = () => {
    window.scrollTo(0, 0);
}

  return (
    <div>
      <Navbar />
      <HeroOther overlayText="Psychology"/>
      <img src={Psychology} alt="Psychology" className="course-img"/>
      <div className='course-description'>
        <h2>Recommended Grade Level: 2nd - 5th Grade</h2>
        <h2>Length: 4 Lessons, 1 hour each</h2>
        <h2>In this course we will explore various subjects of psychology including how the brain works, memory, and mind tricks.</h2>
        <h3>Creator: Taleen Shomar</h3>
      </div>
      <div className='student-l1'>
        <h1>Student-Led Lessons</h1>
        <div className='lesson1'>
        {(<div className='lesson-content'>
        <Link to ="/psych1s" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/TjGatGI4CJM/mqdefault.jpg"
              alt="Lesson 1 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 1: Psychology & Scientific Method</h3>
            </Link>
            
            <Link to ="/psych2s" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/ieBDGtmN2fI/mqdefault.jpg"
              alt="Lesson 2 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'> Lesson 2: How the Brain Works</h3>
            </Link>

            <Link to ="/psych3s" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/Y3OVQ2mD9mo/mqdefault.jpg"
              alt="Lesson 3 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 3: Memory</h3>
            </Link>

            <Link to ="/psych4s" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/0KVSJrtktCY/mqdefault.jpg"
              alt="Lesson 4 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 4: Mind Tricks</h3>
            </Link>
</div>)}
      
        </div>
        
      </div>
      <div className='student-l1'>
        <h1>Parent-Led Lessons</h1>
        <div className='lesson1'>
        {(<div className='lesson-content'>
        <Link to ="/psych1p" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/TjGatGI4CJM/mqdefault.jpg"
              alt="Lesson 1 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 1: Psychology & Scientific Method</h3>
            </Link>
            
            <Link to ="/psych2p" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/ieBDGtmN2fI/mqdefault.jpg"
              alt="Lesson 2 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'> Lesson 2: How the Brain Works</h3>
            </Link>

            <Link to ="/psych3p" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/Y3OVQ2mD9mo/mqdefault.jpg"
              alt="Lesson 3 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 3: Memory</h3>
            </Link>

            <Link to ="/psych4p" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/0KVSJrtktCY/mqdefault.jpg"
              alt="Lesson 4 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 4: Mind Tricks</h3>
            </Link>
</div>)}

        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer />
    </div>
  )
}

export default PsychologyPage
