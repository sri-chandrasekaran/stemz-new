//dashboard.js
import React, {useState, useEffect } from 'react';
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
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from "axios";


const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [Courses_reg, setCourses_reg] = useState();
    const [Courses_recomm, setCourses_recomm] = useState();

  
    useEffect(() => {
      //console.log("I'm on dashboard")
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
          //navigate('/login');
        }
      };
  
      fetchDashboardData();
    }, [navigate]);

  //console.log(user?.email)

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    const cl_reg = user?.classes
    const cl_recomm = user?.recommend
    //console.log(cl_reg)
    //console.log(user?.classes.split(","))
    const getclasses = async () => {
      try {
        //console.log("here")
        const res = await axios.post('http://localhost:3001/get_courses', {
          cl_reg: cl_reg, cl_recomm: cl_recomm
        })
        if (res.data) {
          //console.log("success")
          setCourses_reg(res.data.registered);
          setCourses_recomm(res.data.recommended)
          setLoading(false);
        }
      } catch (error) {
        console.error('Axios error:', error);
    }};
    getclasses();
   }, [user]);

  // useEffect(()=> {  
  //   console.log(user?.email, user?.classes_reg)
  //   axios.get('http://localhost:3001/get_courses', {
  //     cl_reg: user?.classes_reg, cl_recomm: user?.classes_recomm
  //   })
  //   .then(res => {
  //     setCourses_reg(res.registered);
  //     setCourses_recomm(res.recommended)
  //     setLoading(false);
  //   });
  // }, []);

  function InsertClass() {
    //console.log(isLoading)
    if (isLoading) {
      return <div className="InsertClass">Loading...</div>;
    }
    else {
    //console.log(Courses_reg)
    let code = []
    if (Courses_reg.length === 0) {
      return <div className="InsertClass">
        <p>You are not registered for any classes yet!</p>
        <Link to = "../online-classes" onClick={scrollToTop}> 
            <div className = "recommendation">
              <button style = {{background: '#357717', padding: '7px', 'border-radius': '3px', 'margin-left': '0px'}} className = 'dashboard_buttons'>Click here to explore the classes</button>
            </div>
        </Link>
      </div>

    }
    for (let i = 0; i < Courses_reg.length; i++) {
      var reg_class = Courses_reg[i]
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
    // useEffect(()=> {  
    //   axios.get('http://localhost:3001/get_courses')
    //   .then(res => {
    //     setCourses(res.data);
    //     setLoading(false);
    //   });
    // }, []);

    if (isLoading) {
      return <div className="InsertClass">Loading...</div>;
    }
    else {
    let code = []
    if (Courses_recomm.length === 0) {
      return <div className="InsertClass">There are no recommended classes for you currently</div>
    }
    for (let i = 0; i < Courses_recomm.length; i++) {
      var recomm = Courses_recomm[i]
      let image = require('../assets/' + recomm['Image'])
      let link = "../self-paced-classes/" + recomm['Class'].replaceAll(" ", "-")
      code.push(
        //add actual links to the database
        <Link to = {link} onClick={scrollToTop}> 
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
        <div>
        {InsertClass()}
        </div>
        {/* {/*<h3 className = "header-recommended">Recommended Courses</h3>
        <div className = 'grid-recommended'>*/}
        {/*AddRecommend()*/}
        {/*</div>/*} */}
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
