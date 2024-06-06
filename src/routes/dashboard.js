//dashboard.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Dashbar from '../components/Dashbar';
import Footer from '../components/Footer';
import './Dashboard.css'
import AstronomyImage from '../assets/astronomy.PNG'
import Coding from '../assets/coding.jpg'
import Biochemistry from '../assets/biochem.PNG'
import Chemistry from '../assets/chemistry.jpeg'
import Circuits from '../assets/circuits.jpg'
import ES from '../assets/environmentalscience.jpg'
import Psych from '../assets/psych.jpeg'
import Stats from '../assets/statistics.jpeg'
import Zoology from '../assets/zoology.jpg'
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";


const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
  
    useEffect(() => {
      const fetchDashboardData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/dashboard', {
            withCredentials: true,
          });
          if (response.data.success) {
            setUser(response.data.dashboardData.user);
            setDashboardData(response.data.dashboardData);
          }
        } catch (error) {
          console.error('Axios error:', error);
          // Handle error, e.g., redirect to login if token is invalid
          navigate('/login');
        }
      };
  
      fetchDashboardData();
    }, [navigate]);
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  const insertClass = (array) => {
    let code = []
    for (var reg_class of array) {
      code.push(
        <div>
        <img src={reg_class[0]} alt= {reg_class[1]} className="img-course"/>
          <div className='course-info'>
            <h2>{reg_class[1]}</h2>
            <h3>{reg_class[2]}</h3>
            <h3>{reg_class[3]}</h3>
            <button style = {{background: '#5D86C5', width: '70px'}} className = "dashboard_buttons">Zoom</button>
            <button style = {{background: '#1D5F1B', width: '100px'}} className = "dashboard_buttons">Worksheet</button>
          </div>
          <br></br><br></br><br></br>
        </div>
      )
    }
    return code
  }

  const addRecommend = (array) => {
    let code = []
    for (var recomm of array) {
      code.push(
        <Link to = {recomm[0]} onClick={scrollToTop}>
            <div className = "recommendation">
              <button className = 'recommend-button'></button>
              <img src={recomm[1]} alt={recomm[2]} className="img-recommend"/>
              <h3 className = "text-recommend">{recomm[2]}</h3>
            </div>
        </Link>
      )
    }
    return code
  }

  return (
    <div>
        <Navbar />
        <Dashbar/>
        <div className = "hello">
          <h1 className = "hello-text">Hello {user?.name}!</h1>
        </div>
        <div className = "grid-container-wrapper">
        <h3 className = "header-courses">Courses Enrolled</h3>
        <div className = "grid-courses">
          {insertClass([[AstronomyImage, "Astronomy", "Dates: October 1st - November 31st 10-11AM", "Teachers: One, two, three, four"], [Chemistry, "Chemistry", "Dates: October 1st - November 31st 10-11AM", "Teachers: One, two, three, four"]])}
          {/*<div>
            <img src={AstronomyImage} alt="Astronomy" className="img-course"/>
            <div className='course-info'>
              <h2>Astronomy</h2>
              <h3>Dates: October 1st - November 31st 10-11AM</h3>
              <h3>Teachers: One, two, three, four</h3>
              <button style = {{background: '#5D86C5', width: '70px'}} className = "dashboard_buttons">Zoom</button>
              <button style = {{background: '#1D5F1B', width: '100px'}} className = "dashboard_buttons">Worksheet</button>
            </div>
  </div>
            <br></br>
            <br></br>
            <br></br>
          <div>
            <img src={Chemistry} alt="Chemistry" className="img-course"/>
            <div className='course-info'>
              <h2>Chemistry</h2>
              <h3>Dates: October 1st - November 31st 10-11AM</h3>
              <h3>Teachers: One, two, three, four</h3>
              <button style = {{background: '#5D86C5', width: '70px'}} className = "dashboard_buttons">Zoom</button>
              <button style = {{background: '#1D5F1B', width: '100px'}} className = "dashboard_buttons">Worksheet</button>
            </div>
  </div>*/}
        </div>
        <h3 className = "header-recommended">Recommended Courses</h3>
        <div className = 'grid-recommended'>
        {addRecommend([["/self-paced-classes/basics-of-coding", Coding, "Coding"], ["/self-paced-classes/circuits", Circuits, "Circuits"],
      ["/self-paced-classes/statistics", Stats, "Statistics"], ["/self-paced-classes/psychology", Psych, "Psychology"]])}
        {/*<Link to ="/self-paced-classes/basics-of-coding" onClick={scrollToTop}>
            <div className = "recommendation">
              <button className = 'recommend-button'></button>
              <img src={Coding} alt="Coding" className="img-recommend"/>
              <h3 className = "text-recommend">Coding</h3>
            </div>
</Link>
        <Link to ="/self-paced-classes/circuits" onClick={scrollToTop}>
            <div className = "recommendation">
              <button className = 'recommend-button'></button>
              <img src={Circuits} alt="Circuits" className="img-recommend"/>
              <h3 className = "text-recommend">Circuits</h3>
            </div>
        </Link>
        <Link to ="/self-paced-classes/statistics" onClick={scrollToTop}>
            <div className = "recommendation">
              <button className = 'recommend-button'></button>
              <img src={Stats} alt="Stats" className="img-recommend"/>
              <h3 className = "text-recommend">Stats</h3>
            </div>
        </Link>
        <Link to ="/self-paced-classes/psychology" onClick={scrollToTop}>
            <div className = "recommendation">
              <button className = 'recommend-button'></button>
              <img src={Psych} alt="Psych" className="img-recommend"/>
              <h3 className = "text-recommend">Psych</h3>
            </div>
</Link>*/}
        </div>
        </div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <Footer />
    </div>
  )
}

export default Dashboard
