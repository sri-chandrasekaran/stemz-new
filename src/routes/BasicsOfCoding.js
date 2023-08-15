import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import Coding from '../assets/coding.jpg'
import { Link } from 'react-router-dom';
import './Astronomy.css'

const BasicsOfCoding = () => {
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
        <HeroOther overlayText="Basics of Coding"/>
        <img src={Coding} alt="Basics of Coding" className="course-img"/>
        <div className='course-description'>
          <h2>Recommended Grade Level: 2nd - 5th Grade</h2>
          <h2>Length: 4 Lessons, 1 hour each</h2>
          <h2>In this course we will learn about movement, variables, conditional statements and many more, using Scratch. No prior experience is needed!</h2>
          <h3>Creator: Sri Chandrasekaran</h3>
        </div>
        <div className='student-l1'>
          <h1>Student-Led Lessons</h1>
          <div className='lesson1'>
          <h2 onClick={() => toggleLesson(0)}>Lesson 1
              <span className={`dropdown-arrow ${lessonExpanded[0] ? 'expanded' : ''}`}>&#9660;</span>
            </h2>
              {lessonExpanded[0] && (
                <div className="lesson-content">
                  <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/t7CqLrelByA" frameborder="0" allowfullscreen></iframe>
                  <div className="button-column">
                    <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRZJUwzkTw2zs1zjawrDsbwfZwXGBby1l-tMx4r-cVK2BkfU1M5TW4Rtq2NttiPHgRQXRD16DPDhGkE/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Slideshow</button>
                    </Link>
                    <Link to="https://docs.google.com/document/d/e/2PACX-1vRJJJX9uBxDPSDMhnpv7htzUAS4o_0VejVPH9krMvKOoDuDF9j39Z02Ry1Z2a3O_nPSCIeEsg7e8ZTk/pub" target="_blank" rel="noopener noreferrer">
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
                    <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/gG1fPD2TrnY" frameborder="0" allowfullscreen></iframe>
                  <div className="button-column">
                    <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRVSX7MJ5aPlzna54_j2i5P8Aumg6ayDLg1z4yyYMv7oFfM-JhvPsBugCvFQe777r4tIVaysHwzjzd5/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Slideshow</button>
                    </Link>
                    <Link to="https://docs.google.com/document/d/e/2PACX-1vQkdnmievrvsanfRWYROnlBZXHlBcFru-jxhRlbLrKFe2EmGqJSLvOC4k72G22fEStQSYNFV19kupn9/pub" target="_blank" rel="noopener noreferrer">
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
                  <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/qEcc3yjrwOI" frameborder="0" allowfullscreen></iframe>
                  <div className="button-column">
                    <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQJV5awdB80XKfRUDrWAFCt3x1GsAZIny2Lj3cU9gMhf-PXPmb4a1g2DM6JGKEstCgPN5Ur2NSzegWG/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Slideshow</button>
                    </Link>
                    <Link to="https://docs.google.com/document/d/e/2PACX-1vRPZxnk8UE8mfN7OG1oeaWGPdpIF9q-xtv20wOwH9UOageASc_8ZbpYI2GLe1qsfbSEfjhvJEVUPbBj/pub" target="_blank" rel="noopener noreferrer">
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
                  <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/6czRyGrNf_4" frameborder="0" allowfullscreen></iframe>
                  <div className="button-column">
                    <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRcP16GVe61DiNEPyq7Cgze2ZCRYdTr8HRYqPcmhM8bDuDLSCsRnuGeEq6704IZQprAXEphwRzRBQpP/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Slideshow</button>
                    </Link>
                    <Link to="https://docs.google.com/document/d/e/2PACX-1vRADCFnhJ2tPze3vzokA6VGu2X5fX93e15FUZtTug1Lo1rxmNWuDg7ftUd9gdeEjAvPEYn0A8TOIDNP/pub" target="_blank" rel="noopener noreferrer">
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
                  <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/t7CqLrelByA" frameborder="0" allowfullscreen></iframe>
                  <div className="button-column">
                    <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTtaqTCQT4sZWDjpW223YRhiPjw2gyTc0-GcPcqD4y2gqZhElROyvopqOHfNNF1Vc9JzQdTeJ8LjbNg/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Slideshow</button>
                    </Link>
                    <Link to="https://docs.google.com/document/d/e/2PACX-1vQp1l0m0zheAQFp-D1Edte2Puv8O6E-uR08in-gzk0qqZraG8UTlMm-3M1wxBTvJbbNpcnurV3SfokB/pub" target="_blank" rel="noopener noreferrer">
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
                  <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/gG1fPD2TrnY" frameborder="0" allowfullscreen></iframe>
                  <div className="button-column">
                    <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRBYP0x_NK0OCDDPh9QSZdif1_uUSr708rmFtat3J3rv9JCtB-m4rr1KgscUtoW5V_PR6v48zPPqbEO/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Slideshow</button>
                    </Link>
                    <Link to="https://docs.google.com/document/d/e/2PACX-1vTKQXt02Jn5pLdyfr22KKK-DrqjkYHyu4AJE0ri8ZVlD0Fq13s8TBDajo5kBERGQG5qkHpl2sapJd1j/pub" target="_blank" rel="noopener noreferrer">
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
                  <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/qEcc3yjrwOI" frameborder="0" allowfullscreen></iframe>
                  <div className="button-column">
                    <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQWsKeSJxdfXS-vDKLZbaNmQnA9tZKasl2b9hOd8-IfnaK7hh4NGzWDv5HqO6Toy3jHgXblVKX8txm_/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Slideshow</button>
                    </Link>
                    <Link to="https://docs.google.com/document/d/e/2PACX-1vTsLHiYkABy88PUyLyn9_yQReaAf8gCn8NiClh3mHBHodDmRovFjnkoOgDgR9hkB1IiecVrFLldGQuZ/pub" target="_blank" rel="noopener noreferrer">
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
                  <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/6czRyGrNf_4" frameborder="0" allowfullscreen></iframe>
                  <div className="button-column">
                    <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQ1EhlsDcUkJcUQd6slB1zlpJZ8tXROl9-D4j1aLHFFJg6UPijlF2VIg-iZMdWibsGDkMJ_rWcbh2J4/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                      <button className="course-button">Slideshow</button>
                    </Link>
                    <Link to="https://docs.google.com/document/d/e/2PACX-1vT34KocwdPhpfMtPBzehJ39reYFIUk82zH7V9_NNU6hCQ_T4-uaglD7_-CXeuwB8mpiBZ9oCGHYTbLe/pub" target="_blank" rel="noopener noreferrer">
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

export default BasicsOfCoding
