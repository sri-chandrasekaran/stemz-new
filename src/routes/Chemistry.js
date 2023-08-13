import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import Chemistry from '../assets/chemistry.jpeg'
import { Link } from 'react-router-dom';
import ChemistryLesson1 from '../assets/videos/Chemistry/ChemL1.mp4'
import ChemistryLesson2 from '../assets/videos/Chemistry/ChemL2.mp4'
import ChemistryLesson3 from '../assets/videos/Chemistry/ChemL3.mp4'
import ChemistryLesson4 from '../assets/videos/Chemistry/ChemL4.mp4'
import './Astronomy.css';

const ChemistryPage = () => {

  const [lessonExpanded, setLessonExpanded] = useState([false, false, false, false]);

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
      <HeroOther overlayText="Chemistry"/>
      <img src={Chemistry} alt="Chemistry" className="course-img"/>
      <div className='course-description'>
        <h2>Recommended Grade Level: 3rd - 6th Grade</h2>
        <h2>Length: 4 Lessons, 1 hour each</h2>
        <h2>In this course,  your child will learn about matter, energy, and chemical reactions. The course culminates in a final project that serves as a launching pad to inspire your child to learn more! Parent supervision needed.</h2>
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
                  <source src={ChemistryLesson1} type="video/mp4" />
                </video>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSH4SI6ficFEAzH_Qg6fRZopBkcqrTotnAt_zoxymblJASNRlUYZZpxQiWg3bEPrOCm_3VYMlt7QI0D/pub?start=false&loop=false&delayms=3000&slide=id.g8e77108816_0_92" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTpUYy0Kd3VN49jt4EnwaD38vd97PB0oDKBDEHEhk9s78kYreahI2JqAJZCeRpv9aYpsUzDgefU0Nzf/pub" target="_blank" rel="noopener noreferrer">
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
                  <source src={ChemistryLesson2} type="video/mp4" />
                </video>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRSv4pMB-_1kVHCbb9D_gKSW4EkJKqAyZQxqIqlctucIFtbnyrpoP4AYVm2Sdm3WqW3d6rjp_jYZqte/pub?start=false&loop=false&delayms=3000&slide=id.g5320acc4cf_0_92" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRrTDPHmQEDEqN6jIzSYNTQk-ClPZWZ8EwJyzAhxy18AYViSGk6G_l0lh5RQfTrTdpX6pmAKBILMIEy/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
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
                  <source src={ChemistryLesson3} type="video/mp4" />
                </video>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTllezBHZQYNAODvaFlfIOv2ybfjRz1nPW23v-lD1E9F8dmkKKB4JjUQk2O4wd-e0A6NfWSjm58Rfi1/pub?start=false&loop=false&delayms=3000&slide=id.g914a40a4f6_0_92" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQREjt8_iK_5znGWaV_0HYezNqhQaCnp7RWS7_CJDeMN7s06ndu1PE5cv3fra1ZhQvKJEgjyVKHZiSv/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
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
                  <source src={ChemistryLesson4} type="video/mp4" />
                </video>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vT7pJ3jD7xBrpJPYs5pdNhZjROSvuC5ETJclQoR_n9o_xOCnYkPGks8bQfCIpSMvg7Qe6eEGQdFBR7b/pub?start=false&loop=false&delayms=3000&slide=id.g98ed887a27_0_98" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQ00xvBVGfp47ThJkE75BoeRpYFXkqWYZ86btMZrcIcjAbWdBFTETtOOLbCTimydRrMSPJJpl4MdDG2/pub" target="_blank" rel="noopener noreferrer">
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

export default ChemistryPage
