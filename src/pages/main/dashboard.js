import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Dashbar from "../../components/Dashbar";
import Footer from "../../components/Footer";
import "../css/Dashboard.css";
import { useNavigate, Link } from "react-router-dom";
import { call_api } from "../../api";
import { jwtDecode } from "jwt-decode";

// Import all images
import Coding from "../../assets/coding.jpg";
import CodingBasics1 from "../../assets/coding.jpg";
import CodingBasics2 from "../../assets/coding2.jpg";
import Biochemistry from "../../assets/biochem.PNG";
import Genetics from "../../assets/genetics.jpg";
import Microbiology from "../../assets/Microbiology.png";
import DefaultCourseImg from "../../assets/defaultcourseimg.png";
import AstronomyImage from "../../assets/astronomy.PNG";
import Chemistry from "../../assets/chemistry.jpeg";
import Zoology from "../../assets/zoology.jpg";
import ES from "../../assets/environmentalscience.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [coursesLoaded, setCoursesLoaded] = useState(false);
  // State to track which courses are being removed
  const [removingCourses, setRemovingCourses] = useState([]);
  // State for tooltip messages
  const [tooltipMessages, setTooltipMessages] = useState({});


  // CSS for spinner animation
  useEffect(() => {
    const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
      @keyframes enrolled-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(spinnerStyle);
    
    return () => {
      document.head.removeChild(spinnerStyle);
    };
  }, []);

  // Token verification
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found, redirecting to login page");
        navigate("/login");
        return;
      }

      try {
        console.log("token is found");
        const response = await call_api(null, "auth/verify", "POST");
        if (response && response.success) {
          setIsAuthenticated(true);
          setLoading(false);
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate]);

  // Dashboard data fetch
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded.id;
    
    const fetchDashboardData = async () => {
      try {
        const userResponse = await call_api(null, `users/id/${userId}`, "GET");
        if (userResponse) {
          setUser(userResponse);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchRegisteredCourses = async () => {
      try {
        const response = await call_api(
          null,
          "classrooms/user/getUserClassrooms",
          "GET"
        );
        setRegisteredCourses(response.enrolled || []);
      } catch (error) {
        console.error("Error fetching registered courses:", error);
        setRegisteredCourses([]);
      } finally {
        setLoading(false);
        setCoursesLoaded(true); // Mark courses as loaded regardless of result
      }
    };

    fetchDashboardData();
    fetchRegisteredCourses();
  }, [isAuthenticated]);

  // Function to determine which image to use based on course name
  const getCourseImage = (courseName) => {
    const name = courseName.toLowerCase();

    const courseImageMap = {
      'coding 1': CodingBasics1,
      'basics of coding i': CodingBasics1,
      'coding 2': CodingBasics2,
      'basics of coding ii': CodingBasics2,
      'biochem': Biochemistry,
      'genetic': Genetics,
      'micro bio': Microbiology,
      'microbiology': Microbiology,
      'astronomy': AstronomyImage,
      'chemistry': Chemistry,
      'zoology': Zoology,
      'environmental': ES,
      'environment': ES
    };

    for (const [key, image] of Object.entries(courseImageMap)) {
      if (name.includes(key)) return image;
    }

    return DefaultCourseImg;
  };

  // Function to determine which CSS class to use based on course name
  const getImageClass = (courseName) => {
    const name = courseName.toLowerCase();
    
    const imageClassMap = {
      'coding 1': "enrolled-coding1-img",
      'basics of coding i': "enrolled-coding1-img",
      'coding 2': "enrolled-coding2-img",
      'basics of coding ii': "enrolled-coding2-img",
      'biochem': "enrolled-biochem-img",
      'genetic': "enrolled-genetic-img",
      'micro bio': "enrolled-microbio-img",
      'microbiology': "enrolled-microbio-img"
    };

    for (const [key, cssClass] of Object.entries(imageClassMap)) {
      if (name.includes(key)) return cssClass;
    }

    return "enrolled-course-image";
  };


  // Remove course from dashboard
  const removeCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to remove this course?")) {
      // Add this course to the removing state immediately
      setRemovingCourses(prev => [...prev, courseId]);
      
      try {
        await call_api(null, `classrooms/${courseId}/unenroll`, "POST");
        // On success, remove the course from the list
        setRegisteredCourses((prev) =>
          prev.filter((course) => course._id !== courseId)
        );
      } catch (error) {
        console.error("Error removing course:", error);
        // If there's an error, remove the courseId from the removing state
        // so the user can try again
        setRemovingCourses(prev => prev.filter(id => id !== courseId));
      }
    }
  };

  // Handle button click with "Coming Soon" message
  const handleButtonClick = (courseId, buttonType) => {
    const message = `${buttonType} coming soon!`;
    alert(message);
    
    // You could also set a temporary tooltip message
    setTooltipMessages(prev => ({
      ...prev,
      [courseId + buttonType]: message
    }));
    
    // Clear the message after a while
    setTimeout(() => {
      setTooltipMessages(prev => {
        const newMessages = {...prev};
        delete newMessages[courseId + buttonType];
        return newMessages;
      });
    }, 3000);
  };

  // Loading state
  if (isLoading) {
    return (
      <div>
        <Navbar />
        <Dashbar />
        <div className="hello">
          <h1 className="hello-text">Hello {user?.name || ''}!</h1>
        </div>
        <div className="grid-container-wrapper">
          <h3 className="header-courses">Courses Enrolled</h3>
          <div className="enrolled-loading-message">
            <p>Loading your courses right now...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Dashbar />
      <div className="hello">
        <h1 className="hello-text">Hello {user?.name || ''}!</h1>
      </div>
      <div className="grid-container-wrapper">
        <h3 className="header-courses">Courses Enrolled</h3>
  
        {!coursesLoaded ? (
          // Still loading courses after authentication
          <div className="enrolled-loading-message">
            <p>Loading your classes...</p>
          </div>
        ) : registeredCourses.length === 0 ? (
          // No courses found after loading completed
          <div className="enrolled-empty-state">
            <p className="enrolled-empty-message">
              You are not registered for any classes!
            </p>
            <Link to="../online-classes">
              <button className="enrolled-explore-btn">
                Click here to explore more classes
              </button>
            </Link>
          </div>
        ) : (
          <div className="enrolled-courses-grid">
            {registeredCourses.map((course) => {
              return (
                <div 
                  key={course._id} 
                  className="enrolled-course-card"
                >
                  {removingCourses.includes(course._id) ? (
                    <div className="enrolled-loading-spinner"></div>
                  ) : (
                    <button
                      onClick={() => removeCourse(course._id)}
                      className="enrolled-delete-btn"
                    >
                      ❌
                    </button>
                  )}
                  <img 
                    src={getCourseImage(course.name)} 
                    alt={course.name} 
                    className={getImageClass(course.name)}
                  />
                  <div className="enrolled-course-content">
                    <h1>{course.name}</h1>
                    <h2>When: {course.schedule || "Dates to be announced"}</h2>
                    <h2>Recommended Grade Level: {course.recommendedGradeLevel || "All grades"}</h2>
                    <h2>{course.description}</h2>
                  </div>
                  <div className="enrolled-button-container">
                    <button 
                      className="enrolled-zoom-btn"
                      onClick={() => handleButtonClick(course._id, 'Zoom')}
                    >
                      Zoom
                      <span className="enrolled-tooltip"> Zoom coming soon!</span>
                    </button>
                    <button 
                      className="enrolled-worksheet-btn"
                      onClick={() => handleButtonClick(course._id, 'Worksheet')}
                    >
                      Worksheet
                      <span className="enrolled-tooltip">Worksheet coming soon!</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
  
        <h3 className="header-recommended">Recommended Courses</h3>
        <div className="recommended-container">
          <div className="recommended-row">
            {[
              {
                id: 1,
                name: "Astronomy",
                description:
                  "In this course we will learn about galaxies, the universe, constellations and much more!",
                image: AstronomyImage,
                link: "/astronomy",
              },
              {
                id: 2,
                name: "Basics of coding",
                description:
                  "In this course we will learn about movement, variables, conditional statements and many more, using Scratch. No prior experience is needed!",
                image: Coding,
                link: "/basics-of-coding",
              },
              {
                id: 3,
                name: "Chemistry",
                description:
                  "In this course, your child will learn about matter, energy, and chemical reactions. The course culminates in a final project that serves as a launching pad to inspire your child to learn more! Parent supervision needed.",
                image: Chemistry,
                link: "/chemistry",
              },
              {
                id: 4,
                name: "Zoology",
                description:
                  "In this course, we will learn about biodiversity, the cycles of the earth, pollution, recycling, and more!",
                image: Zoology,
                link: "/zoology",
              },
              {
                id: 5,
                name: "Environmental Science",
                description:
                  "In this course we will learn about the field of zoology, some topics include biodiversity, taxonomy, and anatomy.",
                image: ES,
                link: "/environmental-science",
              },
            ].map((course) => (
              <div key={course.id} className="course-card">
                <img
                  src={course.image}
                  alt={course.name}
                  className="course-card-image"
                  onClick={() => navigate(course.link)}
                  style={{ cursor: "pointer" }}
                />
                <div className="course-card-content">
                  <h3 className="course-card-title">{course.name}</h3>
                  <p className="course-card-description">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;