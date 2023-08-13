import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import EnvironmentalScience from '../assets/environmentalscience.jpg'
import { Link } from 'react-router-dom';
import EnvironmentalScienceLesson1 from '../assets/videos/EnvironmentalScience/ESL1.mp4'
import EnvironmentalScienceLesson2 from '../assets/videos/EnvironmentalScience/ESL2.mp4'
import EnvironmentalScienceLesson3 from '../assets/videos/EnvironmentalScience/ESL3.mp4'
import EnvironmentalScienceLesson4 from '../assets/videos/EnvironmentalScience/ESL4.mp4'
import './Astronomy.css';

const EnvironmentalSciencePage = () => {

  const [lessonExpanded, setLessonExpanded] = useState([false, false, false, false, false, false, false, false]);

  const toggleLesson = (lessonIndex) => {
    setLessonExpanded(prevState => {
      const newState = [...prevState];
      newState[lessonIndex] = !newState[lessonIndex];
      return newState;
    });
  };

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
        <h2 onClick={() => toggleLesson(0)}>Lesson 1
            <span className={`dropdown-arrow ${lessonExpanded[0] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[0] && (
              <div className="lesson-content">
                <video controls className='astrovid' autoplay={false} width="660"
                  height="415">
                  <source src={EnvironmentalScienceLesson1} type="video/mp4" />
                </video>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSMZ0rXwZvnkEKHteN-chdDj8d47dnXJikHhXI20dAmjrbt05-zTfc9pYu6GtukodzHKlnSFM7avdVt/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQxw1Fh1T4a6OPteEismZQ7oU_jiE64kLHGPqd4tFEAd1DC8FSCnz0YJTZwIRmuiU-MNPj20qnJLKxv/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTsSVsvBGfgUZF8xCj99nWk0saVARVUcIJGPjD20TIjSRl_Rw3NzXFY1hIiGYNVSl9PbofRiE1GVRdQ/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Student Notes</button>
                  </Link>
              </div>
              </div>
            )}
        </div>
        <div className='lesson2'>
        <h2 onClick={() => toggleLesson(1)}>Lesson 2
            <span className={`dropdown-arrow ${lessonExpanded[1] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[1] && (
              <div className="lesson-content">
                <video controls className='astrovid' autoplay={false} width="660"
                  height="415">
                  <source src={EnvironmentalScienceLesson2} type="video/mp4" />
                </video>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQM8TeCu7OiUeYlEWYCK7XqdCo7FjM6JzahJZuuzoHf57HrifkMDNthtDcptU1EV2QBQ-CfUHoYbaOD/pub?start=false&loop=false&delayms=3000&slide=id.g13c0851f5cf_0_60" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vS1_kb3I_EbwdI-YgMn32tLdSyFdTongcOKBsJ6CKuMTBS2TFE-VsPKpV9TDdv-BxDx6bhelIwnAAiy/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Student Notes</button>
                  </Link>
              </div>
              </div>
            )}
        </div>
        <div className='lesson3'>
        <h2 onClick={() => toggleLesson(2)}>Lesson 3
            <span className={`dropdown-arrow ${lessonExpanded[2] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[2] && (
              <div className="lesson-content">
                <video controls className='astrovid' autoplay={false} width="660"
                  height="415">
                  <source src={EnvironmentalScienceLesson3} type="video/mp4" />
                </video>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRWqF0ZqHM4m5fHa7xLpIinRGYVCSEk0E8A0Ir7USFMyOVe87dZKlQpNXdiJRWKNDlfNpRGOeFbpjn2/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQtbAAJo_MNP3aXJvMDNZeSwBFwrEZ_X6TEVSZVj9VrlY7mmXMhWULUT3hMkL-YW_e6la-2fz_3hxnT/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Student Notes</button>
                  </Link>
                </div>
              </div>
            )}
        </div>
        <div className='lesson4'>
        <h2 onClick={() => toggleLesson(3)}>Lesson 4
            <span className={`dropdown-arrow ${lessonExpanded[3] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[3] && (
              <div className="lesson-content">
                <video controls className='astrovid' autoplay={false} width="660"
                  height="415">
                  <source src={EnvironmentalScienceLesson4} type="video/mp4" />
                </video>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQ0eRR_p7p01KxOb8qli4EvVaOOyPBWgw06a3QWSCaobL0MxYUPiq7Lj2kUo_YnXKzRpYViA1It7SlE/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vSUENkUbkQ2eHR_Ah4rfFY5ihQqrQwZc7cBJ8w8H9s2XC429uD1ZacRyLwBGzVCaNq7khv5OmvzAky2/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Student Notes</button>
                  </Link>
              </div>
              </div>
            )}
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer />
    </div>
  )
}

export default EnvironmentalSciencePage
