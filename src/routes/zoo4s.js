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
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vT2rjGGS6lUqifhsPA6Hvvukzh8vNkpgRXzUIadDO3a6KiR_2kmE6yiB6RMx_v8VLir7RIYpypb7cCl/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQ4ThgDqfHfnOXeB_AXSTMVcnq0VWfIHENDq9zWO8EMlNIWFf6hEm8q49FhQ00DfYur_0EF0i4GAx8e/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQsmfa1VMw2IoO-dcg60028FNIG7qV-s1qdld9s97a7sVYKvgJo4xd03vRB5fGsAf2X8ixoGne3guPw/pub" target="_blank" rel="noopener noreferrer">
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
