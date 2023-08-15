import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import Zoology from '../assets/zoology.jpg'
import { Link } from 'react-router-dom';
import './Astronomy.css';

const ZoologyPage = () => {

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
      <HeroOther overlayText="Zoology"/>
      <img src={Zoology} alt="Zoology" className="course-img"/>
      <div className='course-description'>
        <h2>Recommended Grade Level: 1st - 4th Grade</h2>
        <h2>Length: 5 Lessons, 1 hour each</h2>
        <h2>In this course we will learn about the field of zoology, some topics include biodiversity, taxonomy, and anatomy.</h2>
        <h3>Creator: Erica Huang & Veda Thota</h3>
      </div>
      <div className='student-l1'>
        <h1>Student-Led Lessons</h1>
        <div className='lesson1'>
        <h2 onClick={() => toggleLesson(0)}>Lesson 1
            <span className={`dropdown-arrow ${lessonExpanded[0] ? 'expanded' : ''}`}>&#9660;</span>
          </h2>
            {lessonExpanded[0] && (
              <div className="lesson-content">
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/pEDK7r21GBM" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTcUXhVuUmd6Zsu2kvXDKc8wwcx5z4KZLCL5f6iiBpq6G-BpkKR9hao17cfMzxLxkcJ4jXu4egJ5DA8/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTgskzWgFj-Ngy_JSdrbMaktLfOA2_E-yv8yPD1hercjizb3pqjDRo8gRQZJPYoDF99RbnKSrKkSX_o/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQ_o_5w2J1Zso1Y81vTwHeVYieIep9OzkP4IFqXwO05xP-UY8DMHLHXrC5cACFGUPhGQggEVxR3sXkr/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/8IekIaOqmwA" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTWzAuOlMpTv7WOoo5ux1_gxKypBx2q11d7cHaTQKKI53gDvbfjllWMg0lDbXIJ0LWZ9vREKHRlfaPY/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQJXf0niwHhM1HiGBPBiPv7SBPHN0J7uZJFWFWlJojH-XZSY1t6aWzqNlFxrx0iwvGfe3KwZ_JPQoeF/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTX9I2U7lQjb2Lx2FyxfGz9sx_ZVfBmmKPBGB-GwoQ_RVEv49z7vQ63ctPVA3GGGi8GPsKHmDkSKjK7/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/PpDLfndy7zs" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTU_Vd0cmtxnRjC4UivFUa1_p5Ey-nLQTNbGdbgFZa94iQQ9ydwmbQFBCG5S6lafketSyK8A3WmzV3D/pub?start=false&loop=false&delayms=3000&slide=id.gd52056e2db_1_60" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTsG5K2B1xJb9zM3oJfWebqun7Jmr3wEkr5ES_tb7zwGqwFJE_vmzHhK6MMrCexBvs0MdIHCrwgH_FD/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/x8jMSVan1Rc" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vT2rjGGS6lUqifhsPA6Hvvukzh8vNkpgRXzUIadDO3a6KiR_2kmE6yiB6RMx_v8VLir7RIYpypb7cCl/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQ4ThgDqfHfnOXeB_AXSTMVcnq0VWfIHENDq9zWO8EMlNIWFf6hEm8q49FhQ00DfYur_0EF0i4GAx8e/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQsmfa1VMw2IoO-dcg60028FNIG7qV-s1qdld9s97a7sVYKvgJo4xd03vRB5fGsAf2X8ixoGne3guPw/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/ga7BP8zSDMg" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRxvs8LSLCVZBubFG78pNWAHghihSw0aE0qUj4CHyr7YiFkB6t_n-Ols8ygeSQCoAoD4kf4-M5SRQpV/pub?start=false&loop=false&delayms=3000&slide=id.gdd06c6ef78_0_62" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRDg1qRRyH8MfLNCFvWrRn71GcbC2VH5m-AQhEFsvI9S-9ZpuhusK3jYvuAq9CMn6h_UrAUWAHcH5il/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/pEDK7r21GBM" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTvPjxLFeVpLdTS1uJpyoehtq_Izx1p6CZnUuIm5MNoOrLpjnIqqzf5aygzWtNlQT4o-_GOP441CaRq/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRSsi3yvAVdVhMCx4RoWJQtVhtiQQwtXdS452YdTFwF5t7q4AqjXv14VikgvtWLXU48fw4GGqgY8vTP/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRua5trbf61SWjXuak-CFWGBgEeuw1xYm36UR7j-ipd1kBoE5Nq0E-VyVANQD5w0K8V3NDaybyMrWeC/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/8IekIaOqmwA" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTrpJwZ_4MIVOnJR9ke9Dqi-Yukr-a4DR_P3uyEuUryiJRbq2UmQyP7QakXQGeXmYChvES5mnK9cYKs/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vROqL1txDOdiQJzxPOXR2rVcrFVpVYa5GcBwZi_Xcp325__Zt70FdIDGyf8vah21c7eCuyJcihzuHER/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTny5uKqafmc5Iy89pIi1cBg165BNyIsjbzX4RGMpNioD7A4WvRTJuLQ_CIHsmq2iSNAIBG-8FrWSir/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/PpDLfndy7zs" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vQzzW2hIV-xbsRbbxnvl_okaQ4Vj9W9_i-VGHe9KT9ORTo0xutFFcoybX5jzpstupNu4z1v0T27hjfh/pub?start=false&loop=false&delayms=3000&slide=id.gd52056e2db_1_60" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRp9zdE2jaBYUYnPXDltmJTbIduB5y9JrWvoSRnkVroNXK4ZCRLSp3nWz1hzR_qXRDwkSEAcEeuzLv3/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/x8jMSVan1Rc" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vS5KaeSf32S394bhu9vua0eUfunuux9VhP7ueX67W2R6-v5YfIlm9C2uaAbp2GTzU7nSBzREG_cRvzZ/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQyR64BbTWMe_oxssR9UqZqMJyW7-sQNFt6VamLuBk3QPSkdVwcacjZF4vXNNiQnzKN7SGYx5LG6Nib/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRsDEVkyb4Grq57TOiU5JDwqdQla_IgxvjcgeTjOUEK-uhZHluE4zaEU_Mq60OXLtATQJDBP22DdX87/pub" target="_blank" rel="noopener noreferrer">
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
                <iframe className='astrovid' width="660" height="415" src="https://www.youtube.com/embed/ga7BP8zSDMg" frameborder="0" allowfullscreen></iframe>
                <div className="button-column">
                  <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTdHJsVlLgvbQVEjVLWcEgWSbmOx0PCNNTky_exihuMUrmrgj72S5thj3rdtvtdFv2GKV_jzzc-o6GF/pub?start=false&loop=false&delayms=3000&slide=id.gdd06c6ef78_0_62" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vR0TrMrFGWRMoR-_CYo55k07iRZMU9hnCzqFWWqURjuzFkcntahNQ-MaexbuOlXA6rZrmu4FNpo26NW/pub" target="_blank" rel="noopener noreferrer">
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

export default ZoologyPage
