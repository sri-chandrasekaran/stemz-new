import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import EnvironmentalScience from '../assets/environmentalscience.jpg'
import { Link } from 'react-router-dom';
import './css/Astronomy.css';

const EnvironmentalSciencePage = () => {

  const scrollToTop = () => {
    window.scrollTo(0, 0);
}

  return (
    <div>
      <Navbar />
      <HeroOther overlayText="Environmental Science"/>
      <img src={EnvironmentalScience} alt="Environmental Science" className="course-img"/>
      <div className='course-description'>
        <h2>Recommended Grade Level: 2nd - 6th Grade</h2>
        <h2>Length: 4 Lessons, 1 hour each</h2>
        <h2>In this course, we will learn about biodiversity, the cycles of the earth, pollution, recycling, and more!</h2>
        <h3>Creator: Ariana Leon, Belle Chang, Sehar Suleman</h3>
      </div>
      <div className='student-l1'>
        <h1>Student-Led Lessons</h1>
        <div className='lesson1'>
        {(<div className='lesson-content'>
        <Link to ="/self-paced-classes/environmental-science/es1s" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/_WRumK_NwfI/mqdefault.jpg"
              alt="Lesson 1 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 1: Biomes</h3>
            </Link>
            
            <Link to ="/self-paced-classes/environmental-science/es2s" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/mpu_qNfo-dM/mqdefault.jpg"
              alt="Lesson 2 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'> Lesson 2: Cycles of the Earth</h3>
            </Link>

            <Link to ="/self-paced-classes/environmental-science/es3s" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/3Q8WkWc_Y5M/mqdefault.jpg"
              alt="Lesson 3 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 3: Pollution in the Water & Air</h3>
            </Link>

            <Link to ="/self-paced-classes/environmental-science/es4s" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/-0xfaF9ca9k/mqdefault.jpg"
              alt="Lesson 4 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 4: 3 R's and the Environment</h3>
            </Link>
</div>)}
        
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer />
    </div>
  )
}

export default EnvironmentalSciencePage
