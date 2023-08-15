import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import Psychology from '../assets/psych.jpeg'
import { Link } from 'react-router-dom';
import './Astronomy.css';

const PsychologyPage = () => {

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
        <h2 onClick={() => toggleLesson(0)}>Lesson 1
            <span className={`dropdown-arrow ${lessonExpanded[0] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[0] && (
              <div className="lesson-content">
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/TjGatGI4CJM" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vT-IotPr9rnAl9EnP7OC1syv8VALJ4XpTj_goQuVe_91KrbQHW6EcujmGBLWwAZcqS_fBqGZ1kq2EAO/pub?start=false&loop=false&delayms=3000&slide=id.g8bd6f3a396_0_248" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQlpH_yDf2HF54DJMHEMH19UwWqWd9jLIeKOM3VCTHVe4f-v4MIDQAZ-FdvQ1peTJyL-2UzrHZZysJU/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vS9-eJtWkRzmLbIGNi9fCENT9k91SEhmpZRqkoqfLPWo980bnsJyT5EEFfuEZp_KVA29AuLq_-Wht21/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/ieBDGtmN2fI" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRu1MRyY9AN-5afsNMAgbQ2l4DdANdx90fxjmU_t2JZgHwBdsg4tl1OS_5SD0c8LXNSGt8ZEV8FYyV-/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vS2ISWZcbyInQwbfADcUJeIuqgT38OLXjT-gOcc4jMPtGaZrkxD88-m9tJaaTSRrZ0gGCRAGczdYq3X/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQ0PNtYwQwS8k7BZKCtERAoREQhjiX6GSgEYIKvqwv55VbY_c6nNObzqHFkVcBvOsdizBw3xDJ7qc3F/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/Y3OVQ2mD9mo" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQsXq7DkKQwF4H-JqjTUfKHKFEg9eO37cQuWksOhaezRVzvalO55dZk7xDBGI3QKfC5rVN_MGksr34v/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQJw15zDBlTiGWdJcFaf1UGN4W8axhywkC58TeRvlIaHVYGB6nLGPMq3_unyzHvIjqBe-AYTJ18gDkH/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/0KVSJrtktCY" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRHm_GUb_AY2oRcIeCeha4NZUWV3mfAEi31zfBHKhsbO33y6nCDCm4isrZtbwD-JpUJ_F6m8zSLJ9ts/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTOOx4fj-jgFMvHPeRTaiMolduahMRRSJjpWmx_CdQ1Iqx3OKqfSe5N27uv17-f8CqL2gEHZiqnoRmd/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Student Notes</button>
                  </Link>
              </div>
              </div>
            )}
        </div>
      </div>
      <div className='student-l1'>
        <h1>Parent-Led Lessons</h1>
        <div className='lesson1'>
        <h2 onClick={() => toggleLesson(4)}>Lesson 1
            <span className={`dropdown-arrow ${lessonExpanded[4] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[4] && (
              <div className="lesson-content">
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/TjGatGI4CJM" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTBmluPiRNDwDeez2GLN6_fqWknf1e5b9BEMzMCr6AiOUUc8MYRGlVTBNHQkokUrIxFUrXWidRVAPoF/pub?start=false&loop=false&delayms=3000&slide=id.g8bd6f3a396_0_248" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQlpH_yDf2HF54DJMHEMH19UwWqWd9jLIeKOM3VCTHVe4f-v4MIDQAZ-FdvQ1peTJyL-2UzrHZZysJU/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQp0dTcD1bao1wPVSWuvaooZKowW3J8w3UwqkeyVQVn1KY_1XaOS-oxBOmZ1E2BtNyk4Xy8UZZH_NCU/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
              </div>
              </div>
            )}
        </div>
        <div className='lesson2'>
        <h2 onClick={() => toggleLesson(5)}>Lesson 2
            <span className={`dropdown-arrow ${lessonExpanded[5] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[5] && (
              <div className="lesson-content">
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/ieBDGtmN2fI" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSYrQHIdTmkbZqTZgCfC7vQDHfnrFQbbK0jPqOdQeg4fjhbKaMaPM82MVT_GLD5-XQD5bn1ljPmWnoE/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vS2ISWZcbyInQwbfADcUJeIuqgT38OLXjT-gOcc4jMPtGaZrkxD88-m9tJaaTSRrZ0gGCRAGczdYq3X/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTSfpOtsV5flOpadszr7ezY3_SWIzLyAd9KZNmhXGUfdSNXS0sSrMSdi7Rhz0yczzk5Hz208Xy9A26J/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
              </div>
              </div>
            )}
        </div>
        <div className='lesson3'>
        <h2 onClick={() => toggleLesson(6)}>Lesson 3
            <span className={`dropdown-arrow ${lessonExpanded[6] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[6] && (
              <div className="lesson-content">
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/Y3OVQ2mD9mo" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vR_y1-gMFgyGJaHz31rcKn-HM8UXxmXJfR598jUgwCWVRlCu9q-ZXaLy6HHI39vqBD_xvfuMcHOOSXx/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQhQS_nzEBw-TY-Ye2olSU71RLFuiyfjUbJf9G2G5YBoQLYVmkM6I8OQ4E2O7swlRQUAZZ_pW2mx0hO/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
                </div>
              </div>
            )}
        </div>
        <div className='lesson4'>
        <h2 onClick={() => toggleLesson(7)}>Lesson 4
            <span className={`dropdown-arrow ${lessonExpanded[7] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[7] && (
              <div className="lesson-content">
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/0KVSJrtktCY" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vS2OyUEQHdhl4_YP-_N2FhFG8u_4W55yE2TSWnpXVy0yBiUWzJT-FA7H4b5AuSHw_MItTgIzinsfuZi/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQyB91gl8QGmGgkG18_uU9KJ-L4RD8IoRSz21IUYxwfKYIpIkmACO69yJkKIzA8tio8931lkI-GWiVW/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
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

export default PsychologyPage
