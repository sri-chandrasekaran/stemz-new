import React, {useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Dashbar from '../components/Dashbar';
import Footer from '../components/Footer';
import './css/Dashboard.css'
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
import { call_api } from '../api';
import { jwtDecode } from 'jwt-decode'; 

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [Courses_reg, setCourses_reg] = useState();
    const [Courses_recomm, setCourses_recomm] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Add token verification at the start
    useEffect(() => {
      const verifyToken = async () => {
          const token = localStorage.getItem('token');
          if (!token) {
              console.log("No token found, redirecting to login page");
              navigate('/about-us');
              return;
          }
  
          try {
              console.log("token is found");
              const response = await call_api(null, "auth/verify", "POST");
              if (response && response.success) {
                  setIsAuthenticated(true);  // Set authenticated to true
                  setLoading(false);  // Stop loading state
              } else {
                  localStorage.removeItem('token');
                  navigate('/sign-up');
              }
          } catch (error) {
              localStorage.removeItem('token');
              navigate('/sign-up');
          }
      };
  
      verifyToken();
    }, [navigate]);

    // Dashboard data fetch
    useEffect(() => {
      if (!isAuthenticated) return; // Only fetch if authenticated
      console.log("I'm on dashboard")
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      console.log(userId); 
      const fetchDashboardData = async () => {
        try {
          const userResponse = await call_api(
            null, 
            `users/id/${userId}`,
            "GET"
          );
          if (userResponse) {
              setUser(userResponse);
              console.log(userResponse);
          }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
      };
  
      fetchDashboardData();
    }, [isAuthenticated]);


  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    const cl_reg = user?.classes
    const cl_recomm = user?.recommend
    console.log(cl_reg)
    //console.log(user?.classes.split(","))
    const getclasses = async () => {
      try {
        console.log("here")
        const res = await axios.post('https://www.stemzlearning.org/get_courses', {
          cl_reg: cl_reg, cl_recomm: cl_recomm
        })
        if (res.data) {
          console.log("success")
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
    console.log(isLoading)
    if (isLoading) {
      return <div className="InsertClass">Loading...</div>;
    }
    else {
    console.log(Courses_reg)
    let code = []
    if (Courses_reg == null || Courses_reg.length === 0) {
      return <div classname="InsertClass">
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
    if (isLoading) {
      return <div className="InsertClass">Loading...</div>;
    }
    else {
    let code = []
    if (Courses_recomm.length === 0) {
      return <div classname="InsertClass">There are no recommended classes for you currently</div>
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
        {/* <h3 className = "header-recommended">Recommended Courses</h3>
        <div className = 'grid-recommended'>
        {AddRecommend()}
        </div> */}
        </div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <Footer />
    </div>
  )
}

export default Dashboard