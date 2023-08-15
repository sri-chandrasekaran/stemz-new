import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import Statistics from '../assets/statistics.jpeg'
import { Link } from 'react-router-dom';
import './Astronomy.css';

const StatisticsPage = () => {

  const [lessonExpanded, setLessonExpanded] = useState([false, false, false, false, false, false, false, false, false, false]);

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
      <HeroOther overlayText="Statistics"/>
      <img src={Statistics} alt="Statistics" className="course-img"/>
      <div className='course-description'>
        <h2>Recommended Grade Level: 3rd - 6th Grade</h2>
        <h2>Length: 5 Lessons, 1 hour each</h2>
        <h2>In this course, we will dive into different subtopics of statistics, such as fractions & percents, graphing, and real world-applications.</h2>
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/imGo9o7Epo8" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSRqQAnsVx9tMyhym0HeU6jndMuCKMqE44h_UyAQu-ZCG8G2RV-B1DnqsIiCj18K1kO6ugR838dbyJT/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRxkXJcxz31DTsjez4F0FYzwTCKnOZBkjJA88HCNChof0dYOtUzIF0pQ3TfeJ9as7sBayGvYkn2_RvA/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vR6nB3eLiBPWTFOkHEs4MfWRJFNfwoJSueYJkY0s6Nriz55uYfr2AcBWMrTMgBfybyk7UnTJUR58qCf/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/zL7QABzjyxA" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQoGBwAt4FsNzoE5a09bJZnXY_kNBoZhe5euLcD50Wob2fYyLhnPD2FpeObnv_GqJb-hcM29fmCB9UK/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vSDKqenyKt41I_f94BssVLT8VH2qo3zzTrGwo3Q3FYCh1D64ovRFoUFXeBUDfom4KAnzykuBJV_ofp3/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/WY7m3HsZf0k" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQfvuAJ3pkUqQBxgaY5Zljipy-8UfmRSRGh2wed_2S7LrFq_Xa_yUEwknp4iu8pQ_Q_LEbeFIPuVSE0/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vT5odv9FNIs5hl8F0rrEeFAPqFGMk22yzh84_oEL3ywLFNJO8B7ENVbY-eKmpjnM6uV7kgcO9SdW8k9/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQj0sEGLCx183jhRPDVTQDeVvKXrmRUOryDLKmw6q7NfTOXcqDJ7uVnApV2BXBuJ-A9WjUrql9xSznO/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/folkaRAmLWw" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTtx5ZeNYgQU1XkD2BpOqzw_eCFB6HuBewTR7mcP5u3D9Wv_qPUZNcEjPPKw_PA5qXA5w1o9c7TqYUO/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQo9KYg25_dOBpDEpTc4beUtyOoo9lDN_yBej-glyo04dPI03yJ0AsX7o5Ia7X6xztrlQ_iJITOXFXx/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vS-wUT67lRsoHXv2Sq_9RscOvm3G2ZUI8-xEY1QRfa0SLPcDvL0PcghO-WqyW7ypl8OaPCgPfxr6APJ/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Student Notes</button>
                  </Link>
              </div>
              </div>
            )}
        </div>
        <div className='lesson5'>
        <h2 onClick={() => toggleLesson(4)}>Lesson 5
            <span className={`dropdown-arrow ${lessonExpanded[4] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[4] && (
              <div className="lesson-content">
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/6sI8z3E7S80" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQ2ipR8H1O0f-WO-3y6j4yCGpq2e3GJADgPgUhDR5p_ajAT0J3uJv2F_5WEv6da3cNG4CLWg2B9iftR/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQvlZQ50xky2cW787Mz1qrMx2S8uDbArnIgbfxVYX9uXC797m1XfJp6DRToMNyxJ8ZeOPlHWIwHThWZ/pub" target="_blank" rel="noopener noreferrer">
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
        <h2 onClick={() => toggleLesson(5)}>Lesson 1
            <span className={`dropdown-arrow ${lessonExpanded[5] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[5] && (
              <div className="lesson-content">
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/imGo9o7Epo8" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vS_RWoNPIH0ZCNkPKKD5-oi2Pb06JEw-fD4AgUxeytNyJqGadwK8XjEw8CG32N-wrxLtiL4FHwBs68a/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vSNxJ9HgR9DeU66HgSo6tJpBP5elYvgy4b8tXtW3_S18OJk5YMUfnhE4cRVRSEI_NOKsso8fOYRJP02/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vSc3QZg2g9NFY70iLhYgI0fbYkFJmjh9cuEwZMQ8q7TlKMDnBX1tdkGgy2dMqmmcjdN_hlNk0wiE342/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
              </div>
              </div>
            )}
        </div>
        <div className='lesson2'>
        <h2 onClick={() => toggleLesson(6)}>Lesson 2
            <span className={`dropdown-arrow ${lessonExpanded[6] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[6] && (
              <div className="lesson-content">
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/zL7QABzjyxA" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQCowT01nGRMbio93m7LHAC_iFTCcARMZYxQeII30vw_bRhFB6Edy-m8wggKkcDcB7PLH0nMcVFU01T/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vS079ImQ8MXl3srY0gDGj1-pjjVy6PKQP32uJhg6wA4ABaSckhHqh2dqQcVrdiyPCY5CzeP2cqf6jWs/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
              </div>
              </div>
            )}
        </div>
        <div className='lesson3'>
        <h2 onClick={() => toggleLesson(7)}>Lesson 3
            <span className={`dropdown-arrow ${lessonExpanded[7] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[7] && (
              <div className="lesson-content">
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/WY7m3HsZf0k" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQez6xFKxIp8sZWJb6YWCcNdd5dE4JrsA6QfWn2yKrF5CBiS9lUnmejPkjnEMfIPopUiIejxw1ZQYnX/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vSdm_ju5frgUIP_YNCJ0oZ6bP0NFEc4kgOGinKMszVVHhIKuAGHna1usyQYfhhUB9cnbn1IEMxarfgL/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRMy8_SzfiNMH95GocrImUPgo4qTvHR-AsyN5GgP4iAwWxT_T8o7V17NkAxY-C2xOKwnbHHyuoCR2We/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
                </div>
              </div>
            )}
        </div>
        <div className='lesson4'>
        <h2 onClick={() => toggleLesson(8)}>Lesson 4
            <span className={`dropdown-arrow ${lessonExpanded[8] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[8] && (
              <div className="lesson-content">
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/folkaRAmLWw" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQb5ES2G2LfCFM-7iZRji5yzrXPA6EA4tiPEG6Sj0WEI-wSs25CJ8JWYNLrMDpQYkBKvu7JWrHPbCt2/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTFkZnZfN_43hnHI_VyIk0l3wfre45-oshvDDm94lua4MtNaJMAv0oRAm_XN0yxJxVD1a_zOD-i9dJQ/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRHr1ykxuCTTXfh5Ezt836zNsMCKvC0TRrM4J5mYC6mH9KCBjOctteGZpFZCoA8kT_OA5NuM1M77c-f/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
              </div>
              </div>
            )}
        </div>
        <div className='lesson5'>
        <h2 onClick={() => toggleLesson(9)}>Lesson 5
            <span className={`dropdown-arrow ${lessonExpanded[9] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[9] && (
              <div className="lesson-content">
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/6sI8z3E7S80" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQ6dwcpC8L9Kj4okOPKeVye7x--ddo0ngD9c8SE3k9R6Gd_VGVzOkF8vea74W4YHIfp4IvBcsw7gc80/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQHPXPndmF6YvoDFm-qBMpMxWM_egjdZV0WHnWccaqflKARgEDR86om7egM4gRXp2HPDRIjtoRKTSd_/pub" target="_blank" rel="noopener noreferrer">
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

export default StatisticsPage
