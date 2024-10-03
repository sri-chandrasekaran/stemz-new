import React, { useState, useEffect } from 'react';
import './css/OnlineClasses.css';
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import PhotoCarousel from '../components/PhotoCarousel';
import ES from '../assets/environmentalscience.jpg'
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

function OnlineClasses() {
  const [showForm, setShowForm] = useState(false);
  const [Courses, setCourses] = useState();
  const [StudentCourses, setStudentCourses] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
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
  }, [navigate]);


  useEffect(() => {
    const email = user?.email
    const getStudentClasses = async () => {
      try {
        const response = await axios.post('https://www.stemzlearning.org/check-class', {
          user_email: email
        })
        if (response.data) {
          setStudentCourses(response.data);
          setLoading2(false)
        }
      } catch (error) {
        console.error('Axios error:', error);
      }};
      getStudentClasses()
    }, [user]); 



  useEffect(() => {
    const getAllClasses = async () => {
      try {
        const response = await axios.post('https://www.stemzlearning.org/get_all_courses');
        if (response.data) {
          setCourses(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Axios error:', error);
      }}
      getAllClasses()
    }); 


  function Add_to_student(course_id) {
    const postClass = async () => {
      try {
        const res = await axios.post('https://www.stemzlearning.org/register-class', {
          course_id: course_id, user_email: user?.email
        })
        if (res.data) {
          console.log("success")
        }
      } catch (error) {
        console.error('Axios error:', error);
    }};
    postClass();
    var btn = document.getElementById(course_id)
    btn.style.backgroundColor = '#5D86C5'
    btn.innerText = "You are registered!"
   }

  function Check_class_reg(course_id) {
    if (user === null){
      return <div>
        <p style = {{"margin-top":"20px"}}>In order to register for that class, you need to log in to your account</p>
        <button style = {{"margin-top":"10px"}} className="class-button" id = {course_id} onClick = {navigate.bind(this, '/login')}>Go to login page</button>
        </div>
    }
    else if (StudentCourses.includes(course_id)) {
      return <button className="class-button" id = {course_id} style = {{background:'#5D86C5'}}>You're registered!</button>
    }
    else {
      return <button className="class-button" id = {course_id} onClick = {Add_to_student.bind(this, course_id)}>Register</button>
    }
  }




  function ListCourses() {
    
    if (((! isLoading) && (!isLoading2)) || ((!isLoading) && (user === null))){
      let code = []
      for (let i = 0; i < Courses.length; i++) {
        var course = Courses[i]
        let image = require('../assets/' + course['Image'])
        code.push(
          <div className='class-description'>
          <img src={image} alt={course['Class']} className="class-img"/>
          <h1>{course['Class']}</h1>
          <h2>{course['Dates']}</h2>
          <h2>{course['Grade']}</h2>
          <h2>{course['Description']}</h2>
          {Check_class_reg(course['_id'])}
          </div>
        )
      }
      return code;
    }
  }

  // function Submit()
  //       {
  //       var inputs = [document.getElementById('fname'), 
  //       document.getElementById('lname'), document.getElementById('email'), 
  //       document.getElementById('messagetxt')];

  //       var error;

  //       for(var i = 0; i<inputs.length; i++)
  //       // loop through each element to see if value is empty
  //       {
  //           if(inputs[i].value == '')
  //           {
  //               error = 'Please complete all fields.';
  //               alert(error);
  //               return false;
  //               }
  //       }
  //    }

  return (
    <div>
        <Navbar />
        <HeroOther overlayText="Online Classes"/>
        <div className='main-online'>
          <h3>Sign Up for Classes!</h3>
          {/* <div className="photo-carousel-container">
            <PhotoCarousel />
          </div> */}
        </div>
        <div className='course-listing'>
        {ListCourses()}
        <img src={ES} alt="Genetics" className="class-img"/>
        <div className='class-description'>
          <h1>Environmental Science</h1>
          <h2>When: 11/2 - 11/23, every Saturday from 10 - 11 AM</h2>
          <h2>Recommended Grade Level: 3rd - 5th Grade</h2>
          <h2>In this course, we’ll be diving into biomes, environmental characteristics, and more!</h2>
          {/* <button className="class-button" onClick = {show}>Register</button> */}
          <Link to="https://forms.gle/GtsbDbSbytPASxyq8" target="_blank" rel="noopener noreferrer">
                  <button className="class-button">Register</button>
          </Link>
        </div>
        </div>
        <div style={{ paddingBottom: '230px' }} />
        <Footer />
    </div>
  )
}

export default OnlineClasses