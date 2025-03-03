import React, { useState, useEffect, useRef } from 'react';
import './OnlineClasses.css';
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import CodingBasics1 from '../assets/coding.jpg'
import CodingBasics2 from '../assets/coding2.jpg'
import Biochemistry from '../assets/biochem.PNG'
import Genetics from '../assets/genetics.jpg'
import Microbiology from '../assets/Microbiology.png'
import DefaultCourseImg from '../assets/defaultcourseimg.png'
import { useNavigate, useLocation } from 'react-router-dom';
import { call_api } from "../api";
import axios from "axios";

function OnlineClasses() {
  const [Courses, setCourses] = useState([]);
  const [StudentCourses, setStudentCourses] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState({});
  
  // Create refs for each course section
  const coding1Ref = useRef(null);
  const coding2Ref = useRef(null);
  const biochemistryRef = useRef(null);
  const geneticsRef = useRef(null);
  const microbiologyRef = useRef(null);

  // Hardcoded course info for matching
  const courseInfoMap = {
    coding1: {
      dates: "July 14 - July 17, 10 - 11 AM PST",
      grade: "3rd - 6th Grade",
      description: "In this course, we will learn about movement, variables, conditional statements and many more, using Scratch. No prior experience is needed!"
    },
    coding2: {
      dates: "July 28 - Aug 1, 10 - 11 AM PST",
      grade: "3rd - 6th Grade",
      description: "In this course, we will be going over lists, traversals, loops, and more! By the end, everyone will have created their own project from what they've learned in Basics of Coding I and II."
    },
    biochemistry: {
      dates: "June 30 - July 3, 10 - 11 AM PST",
      grade: "4th - 8th Grade",
      description: "In this course we will learn about molecules, atoms, proteins and more; we encourage the completion of the Chemistry course prior! Parent supervision is needed."
    },
    genetics: {
      dates: "June 16 - June 19, 10 - 11 AM PST",
      grade: "4th - 8th Grade",
      description: "In this course, we will learn all about cells, DNA, and different types of applications!"
    },
    microbiology: {
      dates: "June 2 - June 5, 10 - 11 AM PST",
      grade: "4th - 8th Grade",
      description: "In this course, we will learn about the five main groups of microorganisms and their characteristics, prokaryotic and eukaryotic cells, the endomembrane system, and more!"
    }
  };

  useEffect(() => {
    // Check for token in localStorage
    const authToken = localStorage.getItem('token');
    if (authToken) {
      setToken(authToken);
    }

    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('https://www.stemzlearning.org/dashboard', {
          withCredentials: true,
        });
        if (response.data.success) {
          setUser(response.data.dashboardData.user);
          setDashboardData(response.data.dashboardData);
        }
      } catch (error) {
        console.log("user is not logged")
        // Handle error, e.g., redirect to login if token is invalid
      }
    };

    fetchDashboardData();
  }, []);

  // Fetch user's registered courses
  useEffect(() => {
    const fetchUserCourses = async () => {
      if (!token) {
        setLoading2(false);
        return;
      }
      
      try {
        const response = await call_api(null, "user/courses", "GET");
        if (response && response.length > 0) {
          setStudentCourses(response.map(course => course._id));
        }
        setLoading2(false);
      } catch (error) {
        console.error('Error fetching user courses:', error);
        setLoading2(false);
      }
    };

    fetchUserCourses();
  }, [token]);

  // Fetch all courses from the API
  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const response = await call_api(null, "classrooms", "GET");
        if (response) {
          console.log("Courses:", response);
          setCourses(response);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    getAllCourses();
  }, []);

  // Scroll to the specific section if needed
  useEffect(() => {
    if (location.state && location.state.scrollToId) {
      const scrollToId = location.state.scrollToId;
      
      setTimeout(() => {
        const refMap = {
          coding1: coding1Ref,
          coding2: coding2Ref,
          biochemistry: biochemistryRef,
          genetics: geneticsRef,
          microbiology: microbiologyRef
        };
        
        if (refMap[scrollToId] && refMap[scrollToId].current) {
          refMap[scrollToId].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, [location.state, isLoading]);

  // Function to register user for a course
  const registerForCourse = async (courseId, e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!token) {
      navigate('/login', { state: { returnUrl: '/online-classes' } });
      return;
    }

    // If already registered, don't try to register again
    if (StudentCourses.includes(courseId)) {
      setRegistrationStatus({
        ...registrationStatus,
        [courseId]: { status: "already-registered", message: "You're already registered for this course" }
      });
      return;
    }

    try {
      setRegistrationStatus({
        ...registrationStatus,
        [courseId]: { status: "loading", message: "Registering..." }
      });

      // Make API call to enroll in the course
      const response = await call_api(
        null, 
        `classrooms/${courseId}/enroll`, 
        "POST"
      );

      if (response) {
        console.log("Registration success:", response);
        
        // Update local state
        setStudentCourses(prev => [...prev, courseId]);
        
        setRegistrationStatus({
          ...registrationStatus,
          [courseId]: { status: "success", message: "Successfully registered!" }
        });
      }
    } catch (error) {
      console.error('Error registering for course:', error);
      let errorMessage = "Failed to register. Please try again.";
      
      // Check if the error response contains a message
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      
      setRegistrationStatus({
        ...registrationStatus,
        [courseId]: { status: "error", message: errorMessage }
      });
    }
  };

  // Function to determine which image to use based on course name
  const getCourseImage = (courseName) => {
    // Convert course name to lowercase for case-insensitive matching
    const name = courseName.toLowerCase();

    if (name.includes('coding') && name.includes('1') || name.includes('basics of coding i')) {
      return CodingBasics1;
    } else if (name.includes('coding') && name.includes('2') || name.includes('basics of coding ii')) {
      return CodingBasics2;
    } else if (name.includes('biochem')) {
      return Biochemistry;
    } else if (name.includes('genetic')) {
      return Genetics;
    } else if (name.includes('micro') && name.includes('bio')) {
      return Microbiology;
    } else {
      return DefaultCourseImg;
    }
  };

  // Function to determine which CSS class to use based on course name
  const getImageClass = (courseName) => {
    const name = courseName.toLowerCase();
    
    if (name.includes('coding') && name.includes('1') || name.includes('basics of coding i')) {
      return "coding1-course-img";
    } else if (name.includes('coding') && name.includes('2') || name.includes('basics of coding ii')) {
      return "coding2-course-img";
    } else if (name.includes('biochem')) {
      return "biochem-course-img";
    } else if (name.includes('genetic')) {
      return "genetic-course-img";
    } else if (name.includes('micro') && name.includes('bio')) {
      return "microbio-course-img";
    } else {
      return "course-online-img";
    }
  };

  // Function to get course type key
  const getCourseTypeKey = (courseName) => {
    const name = courseName.toLowerCase();
    
    if (name.includes('coding') && name.includes('1') || name.includes('basics of coding i')) {
      return "coding1";
    } else if (name.includes('coding') && name.includes('2') || name.includes('basics of coding ii')) {
      return "coding2";
    } else if (name.includes('biochem')) {
      return "biochemistry";
    } else if (name.includes('genetic')) {
      return "genetics";
    } else if (name.includes('micro') && name.includes('bio')) {
      return "microbiology";
    } else {
      return null;
    }
  };

  // Get course information based on name
  const getCourseInfo = (courseName) => {
    const courseKey = getCourseTypeKey(courseName);
    if (courseKey && courseInfoMap[courseKey]) {
      return courseInfoMap[courseKey];
    }
    
    // Default values if no match is found
    return {
      dates: "Dates to be announced",
      grade: "All grades",
      description: courseName ? courseName + " course" : "Course description not available"
    };
  };

  // Get button text based on registration status
  const getButtonText = (courseId) => {
    if (StudentCourses.includes(courseId)) {
      return "You are registered!";
    }
    
    if (registrationStatus[courseId]) {
      const status = registrationStatus[courseId];
      if (status.status === "loading") return "Registering...";
      if (status.status === "success") return "Successfully Registered!";
      if (status.status === "error") return "Registration Failed";
    }
    
    return "Register";
  };

  // Get button style based on registration status
  const getButtonStyle = (courseId) => {
    if (StudentCourses.includes(courseId)) {
      return { backgroundColor: '#5D86C5' };
    }
    
    if (registrationStatus[courseId]) {
      const status = registrationStatus[courseId];
      if (status.status === "loading") return { backgroundColor: '#888888' };
      if (status.status === "success") return { backgroundColor: '#5D86C5' };
      if (status.status === "error") return { backgroundColor: '#d32f2f' };
    }
    
    return {};
  };

  return (
    <div>
      <Navbar />
      <HeroOther overlayText="Online Classes"/>
      <div className='course-online-main'>
        <h3>Sign Up for Classes!</h3>
      </div>
      <div className='course-online-listing'>
        {isLoading ? (
          <div className="course-loading-message">Loading courses...</div>
        ) : (
          Courses.map(course => {
            const courseInfo = getCourseInfo(course.name);
            const courseTypeKey = getCourseTypeKey(course.name);
            
            return (
              <div 
                key={course._id} 
                className='course-online-card'
                id={courseTypeKey || course._id}
                ref={
                  courseTypeKey === "coding1" ? coding1Ref :
                  courseTypeKey === "coding2" ? coding2Ref :
                  courseTypeKey === "biochemistry" ? biochemistryRef :
                  courseTypeKey === "genetics" ? geneticsRef :
                  courseTypeKey === "microbiology" ? microbiologyRef :
                  null
                }
              >
                <img 
                  src={getCourseImage(course.name)} 
                  alt={course.name} 
                  className={getImageClass(course.name)}
                />
                <div className="course-online-text">
                  <h1>{course.name}</h1>
                  <h2>When: {courseInfo.dates}</h2>
                  <h2>Recommended Grade Level: {courseInfo.grade}</h2>
                  <h2>{courseInfo.description}</h2>
                  
                  {registrationStatus[course._id] && registrationStatus[course._id].status === "error" && (
                    <p className="course-error-message">{registrationStatus[course._id].message}</p>
                  )}
                </div>
                <div className="course-button-container">
                  <button 
                    className="course-register-button" 
                    disabled={StudentCourses.includes(course._id) || registrationStatus[course._id]?.status === "loading"}
                    style={getButtonStyle(course._id)}
                    onClick={(e) => registerForCourse(course._id, e)}
                  >
                    {getButtonText(course._id)}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div style={{ paddingBottom: '230px' }} />
      <Footer />
    </div>
  );
}

export default OnlineClasses;