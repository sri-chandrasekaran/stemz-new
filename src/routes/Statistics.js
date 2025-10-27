import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import Statistics from '../assets/statistics.jpeg'
import { Link } from 'react-router-dom';
import './css/Astronomy.css';

const StatisticsPage = () => {

  const scrollToTop = () => {
    window.scrollTo(0, 0);
}




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
        {(<div className='lesson-content'>
        <Link to ="/self-paced-classes/statistics/stat1s" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/imGo9o7Epo8/mqdefault.jpg"
              alt="Lesson 1 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 1: Fractions</h3>
            </Link>
            
            <Link to ="/self-paced-classes/statistics/stat2s" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/zL7QABzjyxA/mqdefault.jpg"
              alt="Lesson 2 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'> Lesson 2: Percentages</h3>
            </Link>

            <Link to ="/self-paced-classes/statistics/stat3s" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/WY7m3HsZf0k/mqdefault.jpg"
              alt="Lesson 3 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 3: Advanced Percents</h3>
            </Link>

            <Link to ="/self-paced-classes/statistics/stat4s" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/folkaRAmLWw/mqdefault.jpg"
              alt="Lesson 4 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 4: Types of Graphs</h3>
            </Link>
            <Link to ="/self-paced-classes/statistics/stat5s" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/6sI8z3E7S80/mqdefault.jpg"
              alt="Lesson 4 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 5: Surveys & Real World</h3>
            </Link>
</div>)}
        </div>
      </div>
      <div className='student-l1'>
        <h1>Parent-Led Lessons</h1>
        <div className='lesson1'>
        {(<div className='lesson-content'>
        <Link to ="/self-paced-classes/statistics/stat1p" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/imGo9o7Epo8/mqdefault.jpg"
              alt="Lesson 1 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 1: Fractions</h3>
            </Link>
            
            <Link to ="/self-paced-classes/statistics/stat2p" onClick={scrollToTop}>
            <img
              src="https://i.ytimg.com/vi/zL7QABzjyxA/mqdefault.jpg"
              alt="Lesson 2 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'> Lesson 2: Percentages</h3>
            </Link>

            <Link to ="/self-paced-classes/statistics/stat3p" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/WY7m3HsZf0k/mqdefault.jpg"
              alt="Lesson 3 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 3: Advanced Percents</h3>
            </Link>

            <Link to ="/self-paced-classes/statistics/stat4p" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/folkaRAmLWw/mqdefault.jpg"
              alt="Lesson 4 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 4: Types of Graphs</h3>
            </Link>
            <Link to ="/self-paced-classes/statistics/stat5p" onClick={scrollToTop}>
              <img
              src="https://i.ytimg.com/vi/6sI8z3E7S80/mqdefault.jpg"
              alt="Lesson 4 Thumbnail"
              className="astrovid-thumbnail"
            />
            <h3 className='vidtitle-small'>Lesson 5: Surveys & Real World</h3>
            </Link>
</div>)}
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer />
    </div>
  )
}

export default StatisticsPage
