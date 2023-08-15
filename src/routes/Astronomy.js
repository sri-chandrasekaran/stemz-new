import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import AstronomyImage from '../assets/astronomy.PNG'
import { Link } from 'react-router-dom';
import './Astronomy.css';

const Astronomy = () => {

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
      <HeroOther overlayText="Astronomy"/>
      <img src={AstronomyImage} alt="Astronomy" className="course-img"/>
      <div className='course-description'>
        <h2>Recommended Grade Level: 1st - 5th Grade</h2>
        <h2>Length: 4 Lessons, 1 hour each</h2>
        <h2>In this course we will learn about galaxies, the universe, constellations and much more!</h2>
        <h3>Creator: Alice Gao</h3>
      </div>
      <div className='student-l1'>
        <h1>Student-Led Lessons</h1>
        <div className='lesson1'>
        <h2 onClick={() => toggleLesson(0)}>Lesson 1
            <span className={`dropdown-arrow ${lessonExpanded[0] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[0] && (
              <div className="lesson-content">
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/vy2NuP1ITFo" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSr3e9CF977isknsVQzGrdLsDkrC60VyycBj-xdDiz9Ouw_qgwijJR9QIOwujE9jljLv3bhnV9ZQdo_/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQ716Pn8_l3Ojb8TWW41zXV0xg4UwVJ9-IkqfsEgACHVFAXtoutE_HTIetzwsycRvcRKC9plX-WkwkS/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vT33xIBvK_283aTk_k9AOyuO2YgQqAHuhs8bAVVDbG3-aYqY6QkALxV10GxZ2grpwztEnOJFXCzMchp/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/0MG58dFzUkU" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQkBQUIrCPwy-b1jqDqHwtgY_SrlYd3LDmU9yd-czMHUjY7z6Qk25feHaF6l3RPwNRZ-HZK1Gjg-b8x/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vR1L8xHjcwy9HPfJ3VFCkv_la4_h3pHDcv4C5o0WS-RMiZsZwyzhfUmJvrSQG5rW-EXGv-J1IArDYpR/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/v4pT0yllkO0" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTIWl6sn0OwrcSMNWp1AkQU2R6Gfg2pVw_LvvWUil89HxAighvPdMs0V_fyGRT-GFrUlv0yT1am-Uei/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vSFEfLCeqQYCPQPVgZ8U8TTH2H26pv74584wrptwJrxKRjslgQcInjNjqVQTajtGZrgDbc6yEplPz1t/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRflUjoFOf1ZdPbdIF6YnafgWb8PYezmbdQ4F6e9SdoCJBgF7iJ1fAfn5MQknDWhPqMJrhnlhHKXg7Q/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/ImEEVWosix4" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSI7VUQXrscGhilpertuTvYvL2HETLKSsbJ4R6AkVBJMjDUw8cxtbeTXbAvsoPCIUrcEqIZ4E42UFK4/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQHsI3hmsAXzmnmedrumyzTaGOHdpeV9YGwJ0Aa_bNECKtKH-ylzRU8-KUdXRtvgVr9FyWLDE844s6A/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/vy2NuP1ITFo" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSYVLVT9YBNdOLvB4IeNFX45I5m6n6cS6K2qM79gzghPNMcX7NdiT1vJGHRAGKafSeAVo-lPtt3nEAK/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQ716Pn8_l3Ojb8TWW41zXV0xg4UwVJ9-IkqfsEgACHVFAXtoutE_HTIetzwsycRvcRKC9plX-WkwkS/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vR20jDT2zCL38cTPVEPFVyiMpp9Dbbid5Y6Q7R1etYSIpKxQGAptjcxVL_BOgK5WBm0hpMe1SnBNmEj/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/0MG58dFzUkU" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vT0x0wT-PGEetENLuNz1ZN1pxKbloDZDe6ZwiovLLwQhtvuwu-SpFlsYTRkZu-3MluMkyGEbYHY37uK/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRc3oiey_HcGS-iVLYcKO9P1M44wK37TwfTwYFo61cXo7AOy3nq23y6_BcpIt2ygg2iiL1bGxMprTbT/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/v4pT0yllkO0" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTOmkOYM0vjwk5lSuAZllXWZ3biZJ_XtX9LurhWhyNvjqXqVzvKQKjwPBR0ulv1GDJtgtYEBoCpPuiG/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vSFEfLCeqQYCPQPVgZ8U8TTH2H26pv74584wrptwJrxKRjslgQcInjNjqVQTajtGZrgDbc6yEplPz1t/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTcztZLWHU7eRpsB3WbCKWnW4dRIvAH_BGYjyX-XDR7jNggQZc4uwS0I4aE5fx8oEvd4ZrxpqZHsbBo/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/ImEEVWosix4" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTAyFyBm7IJI6JEgUwzitEswtFjWfFA2BaMCDEGvbWF8ijEG3G4bU9v3__KpaOowPIwJ1B7vvq6a316/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQ0ybcjeVOrxoUG33gZ36B3OOLYI8t0fMHFkoWsOSoVe6HgS5mBUg87TPQIipZgIdtv-wMXDgmYcHj4/pub" target="_blank" rel="noopener noreferrer">
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

export default Astronomy
