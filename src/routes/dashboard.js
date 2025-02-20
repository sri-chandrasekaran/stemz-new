import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroOther from "../components/HeroOther";
import Dashbar from "../components/Dashbar";
import Footer from "../components/Footer";
import "./css/Dashboard.css";
import AstronomyImage from "../assets/astronomy.PNG";
import Coding from "../assets/coding.jpg";
import Biochemistry from "../assets/biochem.PNG";
import Chemistry from "../assets/chemistry.jpeg";
import Circuits from "../assets/circuits.jpg";
import ES from "../assets/environmentalscience.jpg";
import Psych from "../assets/psych.jpeg";
import Stats from "../assets/statistics.jpeg";
import Zoology from "../assets/zoology.jpg";
import Defaultcourseimg from "../assets/defaultcourseimg.png";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { call_api } from "../api";
import { jwtDecode } from "jwt-decode";

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
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found, redirecting to login page");
        navigate("/about-us");
        return;
      }

      try {
        console.log("token is found");
        const response = await call_api(null, "auth/verify", "POST");
        if (response && response.success) {
          setIsAuthenticated(true); // Set authenticated to true
          setLoading(false); // Stop loading state
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
    if (!isAuthenticated) return; // Only fetch if authenticated
    console.log("I'm on dashboard");
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded.id;
    console.log(userId);
    const fetchDashboardData = async () => {
      try {
        const userResponse = await call_api(null, `users/id/${userId}`, "GET");
        if (userResponse) {
          setUser(userResponse);
          console.log(userResponse);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated]);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Get all courses from the database, and filter out registered courses

  function InsertClass() {
    const [registeredCourses, setRegisteredCourses] = useState([]);
    const [teacherNames, setTeacherNames] = useState({});

    const handleCourseDeleted = (courseId) => {
      setRegisteredCourses((prev) =>
        prev.filter((course) => course._id !== courseId)
      );
    };

    // Helper function to get course image locally
    const getCourseImage = (courseName) => {
      const courseNameLower = courseName.toLowerCase();
      if (courseNameLower.includes("astronomy")) return AstronomyImage;
      if (courseNameLower.includes("coding")) return Coding;
      if (courseNameLower.includes("biochemistry")) return Biochemistry;
      if (courseNameLower.includes("chemistry")) return Chemistry;
      if (courseNameLower.includes("circuits")) return Circuits;
      if (courseNameLower.includes("environmental")) return ES;
      if (courseNameLower.includes("psychology")) return Psych;
      if (courseNameLower.includes("statistics")) return Stats;
      if (courseNameLower.includes("zoology")) return Zoology;

      return Defaultcourseimg;
    };

    const fetchTeacherName = async (teacherId) => {
      try {
        console.log("Fetching teacher with ID:", teacherId);

        const response = await call_api(null, `users/id/${teacherId}`, "GET");
        console.log("Teacher response:", response);
        if (response && response.name) {
          setTeacherNames((prev) => ({
            ...prev,
            [teacherId]: response.name,
          }));

          // Add console.log to verify the teacherNames state update
          console.log("Updated teacherNames:", {
            ...teacherNames,
            [teacherId]: response.name,
          });
        }
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };

    useEffect(() => {
      const fetchMyCourses = async () => {
        try {
          const response = await call_api(
            null,
            "classrooms/user/getUserClassrooms",
            "GET"
          );
          console.log("My courses:", response);
          setRegisteredCourses(response.enrolled);

          response.enrolled.forEach((course) => {
            fetchTeacherName(course.teacher_user_id);
          });
        } catch (error) {
          console.error("Error fetching registered courses:", error);
        }
      };

      if (isAuthenticated) {
        fetchMyCourses();
      }
    }, [isAuthenticated]);

    if (!registeredCourses || registeredCourses.length === 0) {
      return (
        <div className="AddClass">
          <p
            style={{
              fontSize: "24px", // Larger font size
              fontWeight: "400", // Regular weight
              marginBottom: "30px", // Space between text and button
              marginTop: "10px", // Space from top
            }}
          >
            You are not registered for any classes yet!
          </p>
          <Link to="../online-classes" onClick={scrollToTop}>
            <div className="recommendation">
              <button className="dashboard_buttons">
                Click here to explore more classes
              </button>
            </div>
          </Link>
        </div>
      );
    }

    return (
      <div>
        {/* Always show the explore button */}

        {/* Map through and display all registered courses */}
        {registeredCourses.map((course) => (
          <div key={course._id} className="registered-course-box">
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to remove this course?")
                ) {
                  call_api(null, `classrooms/${course._id}/unenroll`, "POST")
                    .then(() => {
                      setRegisteredCourses((prev) =>
                        prev.filter((c) => c._id !== course._id)
                      );
                    })
                    .catch((error) => {
                      console.error("Error removing course:", error);
                    });
                }
              }}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                color: "red",
              }}
            >
              ❌
            </button>

            <div className="course-image-container">
              <img
                src={getCourseImage(course.name)}
                alt={course.name}
                className="registered-course-image"
              />
            </div>
            <div className="course-info">
              <h1>{course.name}</h1>
              <h2>{course.description}</h2>
              <h3>
                Teacher:{" "}
                {teacherNames[course.teacher_user_id]
                  ? teacherNames[course.teacher_user_id]
                  : "Loading..."}
              </h3>

              <div className="button-container">
                <button className="dashboard_buttons zoom-button">Zoom</button>
                <button className="dashboard_buttons worksheet-button">
                  Worksheet
                </button>
              </div>
            </div>
            <br></br>
            <br></br>
          </div>
        ))}

        <div className="explore-more-section">
          {/* <Link to="../CourseList" onClick={scrollToTop}> */}
          <Link to="../OnlineClasses" onClick={scrollToTop}>
            <div className="recommendation">
              <button className="dashboard_buttons">
                Click here to explore more classes
              </button>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  function AddRecommend() {
    // Hardcoded recommended courses!
    const recommendedCourses = [
      {
        id: 1,
        name: "Astronomy",
        description:
          "In this course we will learn about galaxies, the universe, constellations and much more!",
        image: AstronomyImage,
        link: "/self-paced-classes/astronomy",
      },
      {
        id: 2,
        name: "Basics of coding",
        description:
          "In this course we will learn about movement, variables, conditional statements and many more, using Scratch. No prior experience is needed!",
        image: Coding,
        link: "/self-paced-classes/basics-of-coding",
      },
      {
        id: 3,
        name: "Chemistry",
        description:
          "In this course, your child will learn about matter, energy, and chemical reactions. The course culminates in a final project that serves as a launching pad to inspire your child to learn more! Parent supervision needed.",
        image: Chemistry,
        link: "/self-paced-classes/chemistry",
      },
      {
        id: 4,
        name: "Zoology",
        description:
          "In this course, we will learn about biodiversity, the cycles of the earth, pollution, recycling, and more!",
        image: Zoology,
        link: "/self-paced-classes/zoology",
      },
      {
        id: 5,
        name: "Environmental Science",
        description:
          "In this course we will learn about the field of zoology, some topics include biodiversity, taxonomy, and anatomy.",
        image: ES,
        link: "/self-paced-classes/environmental-science",
      },
    ];

    return (
      <div className="recommended-container">
        <div className="recommended-row">
          {recommendedCourses.map((course) => (
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
    );
  }

  return (
    <div>
      <Navbar />
      <Dashbar />
      <div className="hello">
        <h1 className="hello-text">Hello {user?.name}!</h1>
      </div>
      <div className="grid-container-wrapper">
        <h3 className="header-courses">Courses Enrolled</h3>

        <div>{InsertClass()}</div>

        <h3 className="header-recommended">Recommended Courses</h3>
        {AddRecommend()}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </div>
  );
};

export default Dashboard;
