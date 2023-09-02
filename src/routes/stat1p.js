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
      <HeroOther overlayText="Lesson 1: Fractions"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/imGo9o7Epo8" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vS_RWoNPIH0ZCNkPKKD5-oi2Pb06JEw-fD4AgUxeytNyJqGadwK8XjEw8CG32N-wrxLtiL4FHwBs68a/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vSNxJ9HgR9DeU66HgSo6tJpBP5elYvgy4b8tXtW3_S18OJk5YMUfnhE4cRVRSEI_NOKsso8fOYRJP02/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vSc3QZg2g9NFY70iLhYgI0fbYkFJmjh9cuEwZMQ8q7TlKMDnBX1tdkGgy2dMqmmcjdN_hlNk0wiE342/pub" target="_blank" rel="noopener noreferrer">
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
