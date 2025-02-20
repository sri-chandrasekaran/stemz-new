import React, { useState, useEffect } from 'react';
import './css/CourseList.css';
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom';
import { call_api } from "../api";

// Import the default course image
import Defaultcourseimg from '../assets/defaultcourseimg.png';

function CourseList() {
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [Courses, setCourses] = useState([]);
  const [teacherNames, setTeacherNames] = useState({});

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const response = await call_api(null, "classrooms", "GET");
        if (response) {
          console.log("Courses:", response);
          setCourses(response);
          setLoading(false);
          
          response.forEach(course => {
            if (course.teacher_user_id) {
              fetchTeacherName(course.teacher_user_id);
            }
          });
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    getAllCourses();
  }, []);

  const fetchTeacherName = async (teacherId) => {
    try {
      console.log("Fetching teacher with ID:", teacherId);
      const response = await call_api(null, `users/id/${teacherId}`, "GET");
      
      if (response && response.name) {
        setTeacherNames(prev => ({
          ...prev,
          [teacherId]: response.name
        }));
      }
    } catch (error) {
      console.error("Error fetching teacher data:", error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <HeroOther overlayText="Course List" />
      
      <div className="content-wrapper">
        <div className="grid-container-wrapper">
          <div className="header-container">
            {/* <h3 className="header-courses">Available Courses</h3> */}
          </div>
          
          {isLoading ? (
            <div className="loading-message">Loading courses...</div>
          ) : (
            <div className="course-grid">
              {Courses.map(course => (
                <div key={course._id} className="registered-course-box">
                  <div className="course-image-box">
                    <img 
                      src={Defaultcourseimg} 
                      alt={course.name} 
                      className="reg-course-image"
                    />
                  </div>
                  <div className="courselist-info">
                    <h1>{course.name}</h1>
                    <h2>{course.description}</h2>
                    <h3>
                      Teacher: {teacherNames[course.teacher_user_id] 
                        ? teacherNames[course.teacher_user_id] 
                        : "Loading..."}
                    </h3>
                    <div className="reg-button-container">
                      <button className="dashboard_buttons worksheet-button">
                        Register for Course
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  
      <div style={{ paddingBottom: '230px' }} />
      <Footer />
    </div>
  );
}

export default CourseList;