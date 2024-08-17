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
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRz2Ja674DK6FIdkV6eiGmiPMDPE3mflJYOnq3o9A9sJ2YdMrGZrnEnJS4lfumUWw17sXRHDt9aZnAv/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vQwUEawulK8jasg51X7Xvt6ll2V8eECvy66JuNpdkUiyqcNgIy5L0PIRM7ZlrdlbQLJ_KMYIgR8mElS/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Student Notes</button>
          </Link>
          <Link to="/self-paced-classes/basics-of-coding/bcquiz" target="_blank" rel="noopener noreferrer">
              <button className="course-button">Quiz</button>
            </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default bc3s
