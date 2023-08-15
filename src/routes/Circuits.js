import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import Circuits from '../assets/circuits.jpg'
import { Link } from 'react-router-dom';
import './Astronomy.css';

const CircuitsPage = () => {

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
      <HeroOther overlayText="Circuits"/>
      <img src={Circuits} alt="Circuits" className="course-img"/>
      <div className='course-description'>
        <h2>Recommended Grade Level: 4th - 6th Grade</h2>
        <h2>Length: 3 Lessons, 1 hour each</h2>
        <h2>In this course, your child will learn about the basics of circuits and how they are used in everyday items. </h2>
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/MFr0Y52UICk" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQSHuZnFgGlPvQEZBQxa3JhWmkwNsaoUv90r_7W1pwLdVQaTPEL2qRZUxwYkKad9brPcZpztqYX8pIj/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRVZSEQhqqvGnp1_UI4pcyZwK_e4Rgly1aTtEDDXoCYpap00IszK4Y6oeeXt8ad-9l4aYEE9typxYhH/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/pK9h_Ts3gWw" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQkBQUIrCPwy-b1jqDqHwtgY_SrlYd3LDmU9yd-czMHUjY7z6Qk25feHaF6l3RPwNRZ-HZK1Gjg-b8x/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQEgXxHa5IR9IbeT7bNxPBrGSImZJE9cG6y2pk2zK_roEKea0FIbpk4IJYOJ990ufDpjZo3KnZI8Tkm/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSTyQ5Mlib9kNDUrlEUAF1tmn4wm5c-d3I0-WPkSdazAhX975XN4K2AKGMAh4T0fwkFBnnUL9fOMZvu/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
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
                  <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/4ZBUoBPdojA" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTRj5F3Swa-S0FgMDD3vt6s5pQcaTdbtNQzlCSi5Tsk9AtHyqKB7hv9Jaui1WsnodAPqEu9Mv0VBOOl/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTx787zPsPLIjlrSv7tkGNhymdbOFYi7ZSsNaOoMgWr_lMcPwexU4ynAXXfaF2DDcGkB-o3HvHH_8Nt/pub" target="_blank" rel="noopener noreferrer">
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
        <h2 onClick={() => toggleLesson(3)}>Lesson 1
            <span className={`dropdown-arrow ${lessonExpanded[3] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[3] && (
              <div className="lesson-content">
                  <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/MFr0Y52UICk" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQKAf_i5GcJ5NLMVARGI32fjWtfZJJ4dXyTJH1NUmf-YBm7noYATMPS2z3ahF4oXNZMoAkyDsA5WsuP/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTngCvQ_Ou8OREY8H7E80Jjhegj_xDI5phHC-s9-HpF8J0JcKP-a7R5WJvIeG4OSRBAxlLTpneQgtrR/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
              </div>
              </div>
            )}
        </div>
        <div className='lesson2'>
        <h2 onClick={() => toggleLesson(4)}>Lesson 2
            <span className={`dropdown-arrow ${lessonExpanded[4] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[4] && (
              <div className="lesson-content">
                  <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/pK9h_Ts3gWw" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSZHWzC6yGjZEVx_cw3e-6srvnp6UVFtpplHoAz2hqFL97-Wqe82YqqqtwTgXqFLvB9BJanvSfq038c/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vSlR3PGH5U8smmplmLzXoDTQ10ENEpTfWeXlwOOvDKnnW6s9hJrkkDWN4WGHGRqwlyqJuvdE640GafT/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRGQNJt03tck3-tVwJIimOMMX2eZWunryjyuMtioDOHaC8JTGb53XppTvAckKBtBOyw2I6clkCGP1N0/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
              </div>
              </div>
            )}
        </div>
        <div className='lesson3'>
        <h2 onClick={() => toggleLesson(5)}>Lesson 3
            <span className={`dropdown-arrow ${lessonExpanded[5] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[5] && (
              <div className="lesson-content">
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/4ZBUoBPdojA" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQ2vtI1WYDdlJWtJZ4Wlvq2yN7fFZqfH_7eBemE4sndj8ojLaaHi0w355JvoDnyWS5JI6Stm7xx2Lf8/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTmwUypLlDaYtZ_Pl9U5Vj0oFzhUbdVoxvXTmYb8Sz1_jY_Y0pQkH-T9oqLyHZzFNmeaUYV2FjR6kKT/pub" target="_blank" rel="noopener noreferrer">
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

export default CircuitsPage
