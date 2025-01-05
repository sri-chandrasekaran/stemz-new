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
import Defaultcourseimg from '../assets/defaultcourseimg.png'
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
    const [allCourses, setAllCourses] = useState([]);

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
                  navigate('/login');
              }
          } catch (error) {
              localStorage.removeItem('token');
              navigate('/login');
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

  // useEffect(() => {
  //   const cl_reg = user?.classes
  //   const cl_recomm = user?.recommend
  //   console.log(cl_reg)
  //   //console.log(user?.classes.split(","))
  //   const getclasses = async () => {
  //     try {
  //       console.log("here")
  //       const res = await axios.post('https://www.stemzlearning.org/get_courses', {
  //         cl_reg: cl_reg, cl_recomm: cl_recomm
  //       })
  //       if (res.data) {
  //         console.log("success")
  //         setCourses_reg(res.data.registered);
  //         setCourses_recomm(res.data.recommended)
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error('Axios error:', error);
  //   }};
  //   getclasses();
  //  }, [user]);

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

  // Get all courses from the database, and filter out registered courses
  useEffect(() => {
    const fetchAllCourses = async () => {
        try {
            const response = await call_api(
                null,
                'classrooms/',
                'GET'
            );
            console.log("All available courses:", response);
            setAllCourses(response);
            
            // If registered, set as registered courses
            if (user) {
                const registeredCourses = response.filter(course => 
                    course.student_user_ids.includes(user.id)
                );
                setCourses_reg(registeredCourses);
                //Add recommendation logic. Right now, just show selfpaced courses hardcoded
                setCourses_recomm(response);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching all courses:', error);
            setLoading(false);
        }
    };

    if (isAuthenticated) {
        fetchAllCourses();
    }
}, [isAuthenticated, user]);

function InsertClass() {
  if (isLoading) {
      return <div className="InsertClass">Loading...</div>;
  }

  if (!Courses_reg || Courses_reg.length === 0) {
      return <div className="InsertClass">
          <p>You are not registered for any classes yet!</p>
          <Link to="../online-classes" onClick={scrollToTop}> 
              <div className="recommendation">
                  <button 
                      style={{background: '#357717', padding: '7px', borderRadius: '3px', marginLeft: '0px'}} 
                      className='dashboard_buttons'
                  >
                      Click here to explore the classes
                  </button>
              </div>
          </Link>
      </div>
  }

  return Courses_reg.map(course => (
      <div key={course._id}>
          <img 
              src={require('../assets/defaultcourseimg.png')}
              alt={course.name} 
              className="img-course"
          />
          <div className='course-info'>
              <h2>{course.name}</h2>
              <h3>{course.description}</h3>
              <h3>Teachers: {course.teacher_user_id}</h3>
              <button 
                  style={{background: '#5D86C5', width: '70px'}} 
                  className="dashboard_buttons"
              >
                  Zoom
              </button>
              <button 
                  style={{background: '#1D5F1B', width: '100px'}} 
                  className="dashboard_buttons"
              >
                  Worksheet
              </button>
          </div>
          <br></br><br></br><br></br>
      </div>
  ));
}

function AddRecommend() {
  // Hardcoded recommended courses!
  const recommendedCourses = [
      {
          id: 1,
          name: "Astronomy",
          description: "In this course we will learn about galaxies, the universe, constellations and much more!",
          image: AstronomyImage,
          link: '/self-paced-classes/astronomy'
      },
      {
          id: 2,
          name: "Basics of coding",
          description: "In this course we will learn about movement, variables, conditional statements and many more, using Scratch. No prior experience is needed!",
          image: Coding,
          link: '/self-paced-classes/basics-of-coding'
      },
      {
          id: 3,
          name: "Chemistry",
          description: "In this course, your child will learn about matter, energy, and chemical reactions. The course culminates in a final project that serves as a launching pad to inspire your child to learn more! Parent supervision needed.",
          image: Chemistry,
          link: '/self-paced-classes/chemistry'
      },
      {
          id: 4,
          name: "Zoology",
          description: "In this course, we will learn about biodiversity, the cycles of the earth, pollution, recycling, and more!",
          image: Zoology,
          link: '/self-paced-classes/zoology'
      },
      {
          id: 5,
          name: "Environmental Science",
          description: "In this course we will learn about the field of zoology, some topics include biodiversity, taxonomy, and anatomy.",
          image: ES,
          link: '/self-paced-classes/environmental-science'
      }
  ];

  return (
    <div className='recommended-container'>
        <div className='recommended-row'>
            {recommendedCourses.map(course => (
                <div key={course.id} className="course-card">
                    <img 
                        src={course.image}
                        alt={course.name} 
                        className="course-card-image"
                        onClick={() => navigate(course.link)}
                        style={{ cursor: 'pointer' }} 
                    />
                    <div className="course-card-content">
                        <h3 className="course-card-title">{course.name}</h3>
                        <p className="course-card-description">{course.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
}

return (
  <div>
      <Navbar />
      <Dashbar/>
      <div className="hello">
          <h1 className="hello-text">Hello {user?.name}!</h1>
      </div>
      <div className="grid-container-wrapper">
          <h3 className="header-courses">Courses Enrolled</h3>
          <div>
              {InsertClass()}
          </div>
          <h3 className="header-recommended">Recommended Courses</h3>
          {AddRecommend()}
      </div>
      <br></br><br></br><br></br><br></br><br></br>
      <Footer />
  </div>
)}

export default Dashboard