import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import Biochemistry from '../assets/biochem.PNG'
import { Link } from 'react-router-dom';
import BiochemistryLesson1 from '../assets/videos/Biochemistry/BiochemL1.mp4'
import './Astronomy.css';

const BiochemistryPage = () => {

  const [lessonExpanded, setLessonExpanded] = useState([false, false]);

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
        <h2 onClick={() => toggleLesson(0)}>Lesson 1
            <span className={`dropdown-arrow ${lessonExpanded[0] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[0] && (
              <div className="lesson-content">
                <video controls className='astrovid' autoplay={false} width="660"
                  height="415">
                  <source src={BiochemistryLesson1} type="video/mp4" />
                </video>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSRA7OlH1eToF971sBlGf8Vc7ZZsxePtI4Dg39sHZrV8Zce4P6ikdZ2nBUZbhAQYiJZcQPFct3H9rs5/pub?start=false&loop=false&delayms=3000&slide=id.g5320acc4cf_0_92" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQlM4liz99AWyrVaKpjk6z6_iMYmDeSIsP3fheQo_i_vtV4xRel8Fcmdz-_jFJq62TgFMHzgTInl-cJ/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
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
                  <source src={BiochemistryLesson1} type="video/mp4" />
                </video>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTL1o_Apa39ZYqgeO-gcCEpUGgS7YVJN_yXy-7OKuHHtyGJFvlQv-nVayyCDvboNfDUMrTBznHlSgP_/pub?start=false&loop=false&delayms=3000&slide=id.g5320acc4cf_0_92" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQryoVxTaKuMzfhj25LAxyxWM4rVkQ1z1mMQe1L19FRhN3EgZH_vEyZpfj-OAdOx4kQ5szUXPoQbeHX/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTqZTd0LqASARcIsOhM94CO2etLbRCUKMt2u0x234m9RvfEbFNV51KL0CBjlXGFl-PNVFT2ccaD3dnf/pub" target="_blank" rel="noopener noreferrer">
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

export default BiochemistryPage
