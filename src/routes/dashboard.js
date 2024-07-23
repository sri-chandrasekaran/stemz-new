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
    const [isLoading, setLoading] = useState(true);
    const [Courses, setCourses] = useState();
  
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

  function InsertClass() {
    useEffect(()=> {  
      axios.get('http://localhost:3001/get_courses')
      .then(res => {
        setCourses(res.data);
        setLoading(false);
      });
    }, []);

    if (isLoading) {
      return <div className="InsertClass">Loading...</div>;
    }
    else {
    let code = []
    for (let i = 0; i < Courses.length; i++) {
      var reg_class = Courses[i]
      let image = require('../assets/' + reg_class['Image'])
      code.push(
        <div key = {reg_class['Class']}>
          <img src = {image} alt= {reg_class['Class']} className="img-course"/>
          <div className='course-info'>
            <h2>{reg_class['Class']}</h2>
            <h3>{reg_class['Dates']}</h3>
            <h3>Teachers: {reg_class['Teachers']}</h3>
            <button style = {{background: '#5D86C5', width: '70px'}} className = "dashboard_buttons">Zoom</button>
            <button style = {{background: '#1D5F1B', width: '100px'}} className = "dashboard_buttons">Worksheet</button>
          </div>
          <br></br><br></br><br></br>
        </div>
     )
    }
    return code
    }
  }

  function AddRecommend () {
    useEffect(()=> {  
      axios.get('http://localhost:3001/get_courses')
      .then(res => {
        setCourses(res.data);
        setLoading(false);
      });
    }, []);

    if (isLoading) {
      return <div className="InsertClass">Loading...</div>;
    }
    else {
    let code = []
    for (let i = 0; i < Courses.length; i++) {
      var recomm = Courses[i]
      let image = require('../assets/' + recomm['Image'])
      code.push(
        //add actual links to the database
        <Link to = {recomm[0]} onClick={scrollToTop}> 
            <div className = "recommendation">
              <button className = 'recommend-button'></button>
              <img src={image} alt={recomm['Class']} className="img-recommend"/>
              <h3 className = "text-recommend">{recomm['Class']}</h3>
            </div>
        </Link>
      )
    }
    return code
    }
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
        {InsertClass()}
        </div>
        <h3 className = "header-recommended">Recommended Courses</h3>
        <div className = 'grid-recommended'>
        {AddRecommend()}
        </div>
        </div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <Footer />
    </div>
  )
}

export default Dashboard
