import React, {useState} from 'react';
import Navbar from '../../components/Navbar';
import HeroOther from '../../components/HeroOther';
import Footer from '../../components/Footer';
import Biochemistry from '../../assets/biochem.png'
import { Link } from 'react-router-dom';
import '../css/Astronomy.css';

const BiochemistryPage = () => {

  const scrollToTop = () => {
    window.scrollTo(0, 0);
}

  return (
    <div>
      <Navbar />
      <HeroOther overlayText="Biochemistry"/>
      <img src={Biochemistry} alt="Biochemistry" className="course-img"/>
      <div className='course-description'>
        <h2>Recommended Grade Level: 3rd - 6th Grade</h2>
        <h2>Length: 2 Lessons, 1 hour each</h2>
        <h2>In this course we will learn about molecules, atoms, proteins and more; we encourage the completion of the Chemistry course prior! Parent supervision is needed.</h2>
        <h3>Creator: Alice Gao</h3>
      </div>
      <div className='student-l1'>
        <h1>Parent-Led Lessons</h1>
        <div className='lesson1'>
        {(
            <div className="lesson-content">
              <Link to ="/bio1" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/Vo_1vhGWER8/mqdefault.jpg"
              alt="Lesson 1 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 1: Nucleic Acids</h3>
            </Link>
            
            <Link to ="/bio2" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/Vg1nWNNHhok/mqdefault.jpg"
              alt="Lesson 2 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'> Lesson 2: Proteins & Carbohydrates</h3>
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

export default BiochemistryPage
