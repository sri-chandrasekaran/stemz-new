import React from 'react'
import Navbar from '../../components/Navbar'
import HeroOther from '../../components/HeroOther'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom';
import '../css/allvideo.css';

const bc3p = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 3: Wait & Sensors"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/qEcc3yjrwOI" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTpYmMLpS2w-sD732G_S_JwiWTAZo_FHTKEl12QpaTkmsvzYaNCjlGdPODJDqNWYkMd0kor5pydwWEb/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vRh4DJfgSYvBBVJf96tO7wg1y_-o_QYSPeGz7YiiwVyd8ZEPvRBpLhUXy0Eaum-6fG_KF5dslDG8J2u/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Parent Notes</button>
          </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default bc3p
