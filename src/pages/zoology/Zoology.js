import React, {useState} from 'react';
import Navbar from '../../components/Navbar';
import HeroOther from '../../components/HeroOther';
import Footer from '../../components/Footer';
import Zoology from '../../assets/zoology.jpg'
import { Link } from 'react-router-dom';
import '../css/Astronomy.css';

const ZoologyPage = () => {

  const scrollToTop = () => {
    window.scrollTo(0, 0);
}

  return (
    <div>
      <Navbar />
      <HeroOther overlayText="Zoology"/>
      <img src={Zoology} alt="Zoology" className="course-img"/>
      <div className='course-description'>
        <h2>Recommended Grade Level: 1st - 4th Grade</h2>
        <h2>Length: 5 Lessons, 1 hour each</h2>
        <h2>In this course we will learn about the field of zoology, some topics include biodiversity, taxonomy, and anatomy.</h2>
        <h3>Creator: Erica Huang & Veda Thota</h3>
      </div>
      <div className='student-l1'>
        <h1>Student-Led Lessons</h1>
        <div className='lesson1'>
        {(<div className='lesson-content'>
        <Link to ="/zoo1s" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/pEDK7r21GBM/mqdefault.jpg"
              alt="Lesson 1 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 1: Classification & Taxonomy</h3>
            </Link>
            
            <Link to ="/zoo2s" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/8IekIaOqmwA/mqdefault.jpg"
              alt="Lesson 2 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'> Lesson 2: Darwin's Theory</h3>
            </Link>

            <Link to ="/zoo3s" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/PpDLfndy7zs/mqdefault.jpg"
              alt="Lesson 3 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 3: Distribution</h3>
            </Link>

            <Link to ="/zoo4s" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/x8jMSVan1Rc/mqdefault.jpg"
              alt="Lesson 4 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 4: Behavior</h3>
            </Link>
            <Link to ="/zoo5s" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/ga7BP8zSDMg/mqdefault.jpg"
              alt="Lesson 4 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 5: Anatomy & Physiology</h3>
            </Link>
</div>)}
        </div>
        
      </div>
      <div className='student-l1'>
        <h1>Parent-Led Lessons</h1>
        <div className='lesson1'>
          
        {(<div className='lesson-content'>
        <Link to ="/zoo1p" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/pEDK7r21GBM/mqdefault.jpg"
              alt="Lesson 1 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 1: Classification & Taxonomy</h3>
            </Link>
            
            <Link to ="/zoo2p" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/8IekIaOqmwA/mqdefault.jpg"
              alt="Lesson 2 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'> Lesson 2: Darwin's Theory</h3>
            </Link>

            <Link to ="/zoo3p" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/PpDLfndy7zs/mqdefault.jpg"
              alt="Lesson 3 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 3: Distribution</h3>
            </Link>

            <Link to ="/zoo4p" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/x8jMSVan1Rc/mqdefault.jpg"
              alt="Lesson 4 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 4: Behavior</h3>
            </Link>
            <Link to ="/zoo5p" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/ga7BP8zSDMg/mqdefault.jpg"
              alt="Lesson 4 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 5: Anatomy & Physiology</h3>
            </Link>
</div>)}
      
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer />
    </div>
  )
}

export default ZoologyPage
