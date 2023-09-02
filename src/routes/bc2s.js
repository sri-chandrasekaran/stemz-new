import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const bc2s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 2: Conditional Statements & Loops"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/gG1fPD2TrnY" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRVSX7MJ5aPlzna54_j2i5P8Aumg6ayDLg1z4yyYMv7oFfM-JhvPsBugCvFQe777r4tIVaysHwzjzd5/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Slideshow</button>
                    </Link>
                    <Link to="https://docs.google.com/document/d/e/2PACX-1vQkdnmievrvsanfRWYROnlBZXHlBcFru-jxhRlbLrKFe2EmGqJSLvOC4k72G22fEStQSYNFV19kupn9/pub" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Student Notes</button>
                    </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default bc2s
