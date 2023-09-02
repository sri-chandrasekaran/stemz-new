import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import Chemistry from '../assets/chemistry.jpeg'
import { Link } from 'react-router-dom';
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
        {(
            <div className="lesson-content">
              <Link to ="/self-paced-classes/chemistry/chem1">
              <img
              src="https://i.ytimg.com/vi/qUcexzJnLew/mqdefault.jpg"
              alt="Lesson 1 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 1: Chemistry & Matter</h3>
            </Link>
            
            <Link to ="/self-paced-classes/chemistry/chem2">
            <img
              src="https://i.ytimg.com/vi/EJpJLOAIHRc/mqdefault.jpg"
              alt="Lesson 2 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'> Lesson 2: Molecules & Atoms</h3>
            </Link>

            <Link to ="/self-paced-classes/chemistry/chem3">
              <img
              src="https://i.ytimg.com/vi/448XzSXabc4/mqdefault.jpg"
              alt="Lesson 1 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 3: Chemical Reactions</h3>
            </Link>

            <Link to ="/self-paced-classes/chemistry/chem4">
              <img
              src="https://i.ytimg.com/vi/NpQJoCQEa9U/mqdefault.jpg"
              alt="Lesson 1 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 4: Putting It All Together</h3>
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

export default ChemistryPage
