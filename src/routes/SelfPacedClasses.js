import React, { useState, useEffect } from 'react';
import './css/SelfPacedClasses.css';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import AstronomyImage from '../assets/astronomy.PNG';
import Coding from '../assets/coding.jpg';
import Biochemistry from '../assets/biochem.PNG';
import Chemistry from '../assets/chemistry.jpeg';
import Circuits from '../assets/circuits.jpg';
import ES from '../assets/environmentalscience.jpg';
import Psych from '../assets/psych.jpeg';
import Stats from '../assets/statistics.jpeg';
import Zoology from '../assets/zoology.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { call_api } from '../api'; // Import your API utility

const SelfPacedClasses = () => {
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
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
        console.error("Token verification error:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    
    verifyToken();
  }, [navigate]);

  // Fetch user data
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded.id;
    
    const fetchUserData = async () => {
      try {
        const userResponse = await call_api(null, `users/id/${userId}`, "GET");
        if (userResponse) {
          setUser(userResponse);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchUserData();
  }, [isAuthenticated]);

  // Fetch user progress data
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const fetchUserProgress = async () => {
        let response;
        try {
            response = await call_api(null, "points", "GET");
        } catch (error) {
            console.error("Error fetching user progress:", error);
            setLoading(false);
            throw error;
        }
        if (response) {
          console.log("User progress data:", response); // Debug log
          
          // Using the correct path to log course points
          if (response.courses) {
            Object.keys(response.courses).forEach(courseKey => {
              console.log(`${courseKey} points:`, response.courses[courseKey].coursePoints);
              console.log(`${courseKey} completed:`, response.courses[courseKey].completed);
            });
          }
          
          setUserProgress(response);
          setLoading(false);
        }
    };
    fetchUserProgress();
  }, [isAuthenticated]);


  // Use a fixed value for total possible points for now
  const calculateTotalPossiblePoints = () => {
    return 99999;
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your course progress</p>
      </div>
    );
  }
  
  return (
    <div>
      <Navbar />
      <HeroOther overlayText="Self-Paced Classes"/>
      <div className='shifting-all-grids'>
        <h3 className='header-small'>Each lesson of the course contains a video, presentation, supplementary notes, and occasionally a worksheet.</h3>
        
        <div className="total-points-container">
          <h2>Your Learning Progress: {userProgress?.totalPoints || 0} points earned!</h2>
          <p style={{ marginTop: '10px', fontSize: '16px' }}>Continue learning to earn more points!</p>
        </div>
        
        <div className='grid-container'>
          <div className={`grid-cell ${userProgress?.courses?.astronomy?.completed ? 'course-completed' : ''}`}>
            <Link to="/astronomy" onClick={scrollToTop} className="course-link">
              <img src={AstronomyImage} alt="Astronomy" className="img-course"/>
              <h1>Astronomy</h1>
              <p>In this course we will learn about galaxies, the universe, constellations and much more!</p>
            </Link>
            <div className="course-info-row">
              <div className="course-points">
                {userProgress?.courses?.astronomy?.completed ? (
                  <p>Finished!</p>
                ) : (
                  <p>Points: {userProgress?.courses?.astronomy?.coursePoints || 0}</p>
                )}
              </div>
              <Link to="/astronomy" onClick={scrollToTop}>
                <button className="cta-button spc-courses-button">Access Lessons</button>
              </Link>
            </div>
          </div>
          
          <div className={`grid-cell ${userProgress?.courses?.basicsOfCoding?.completed ? 'course-completed' : ''}`}>
            <Link to="/basics-of-coding" onClick={scrollToTop} className="course-link">
              <img src={Coding} alt="Coding" className="img-course"/>
              <h1>Basics of Coding</h1>
              <p>In this course we will learn about movement, variables, conditional statements and many more, using Scratch. No prior experience is needed!</p>
            </Link>
            <div className="course-info-row">
              <div className="course-points">
                {userProgress?.courses?.basicsOfCoding?.completed ? (
                  <p>Finished!</p>
                ) : (
                  <p>Points: {userProgress?.courses?.basicsOfCoding?.coursePoints || 0}</p>
                )}
              </div>
              <Link to="/basics-of-coding" onClick={scrollToTop}>
                <button className="cta-button spc-courses-button">Access Lessons</button>
              </Link>
            </div>
          </div>
          
          <div className={`grid-cell ${userProgress?.courses?.biochemistry?.completed ? 'course-completed' : ''}`}>
            <Link to="/biochemistry" onClick={scrollToTop} className="course-link">
              <img src={Biochemistry} alt="Biochemistry" className="img-course"/>
              <h1>Biochemistry</h1>
              <p>In this course we will learn about molecules, atoms, proteins and more; we encourage the completion of the Chemistry course prior! Parent supervision is needed.</p>
            </Link>
            <div className="course-info-row">
              <div className="course-points">
                {userProgress?.courses?.biochemistry?.completed ? (
                  <p>Finished!</p>
                ) : (
                  <p>Points: {userProgress?.courses?.biochemistry?.coursePoints || 0}</p>
                )}
              </div>
              <Link to="/biochemistry" onClick={scrollToTop}>
                <button className="cta-button spc-courses-button">Access Lessons</button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className='grid-container'>
          <div className={`grid-cell ${userProgress?.courses?.chemistry?.completed ? 'course-completed' : ''}`}>
            <Link to="/chemistry" onClick={scrollToTop} className="course-link">
              <img src={Chemistry} alt="chemistry" className="img-course"/>
              <h1>Chemistry</h1>
              <p>In this course, your child will learn about matter, energy, and chemical reactions. The course culminates in a final project that serves as a launching pad to inspire your child to learn more! Parent supervision needed.</p>
            </Link>
            <div className="course-info-row">
              <div className="course-points">
                {userProgress?.courses?.chemistry?.completed ? (
                  <p>Finished!</p>
                ) : (
                  <p>Points: {userProgress?.courses?.chemistry?.coursePoints || 0}</p>
                )}
              </div>
              <Link to="/chemistry" onClick={scrollToTop}>
                <button className="cta-button spc-courses-button">Access Lessons</button>
              </Link>
            </div>
          </div>
          
          <div className={`grid-cell ${userProgress?.courses?.circuits?.completed ? 'course-completed' : ''}`}>
            <Link to="/circuits" onClick={scrollToTop} className="course-link">
              <img src={Circuits} alt="Circuits" className="img-course"/>
              <h1>Circuits</h1>
              <p>In this course, your child will learn about the basics of circuits and how they are used in everyday items.</p>
            </Link>
            <div className="course-info-row">
              <div className="cta-button course-points">
                {userProgress?.courses?.circuits?.completed ? (
                  <p>Finished!</p>
                ) : (
                  <p>Points: {userProgress?.courses?.circuits?.coursePoints || 0}</p>
                )}
              </div>
              <Link to="/circuits" onClick={scrollToTop}>
                <button className="cta-button spc-courses-button">Access Lessons</button>
              </Link>
            </div>
          </div>
          
          <div className={`grid-cell ${userProgress?.courses?.environmentalScience?.completed ? 'course-completed' : ''}`}>
            <Link to="/environmental-science" onClick={scrollToTop} className="course-link">
              <img src={ES} alt="Environmental Science" className="img-course"/>
              <h1>Environmental</h1>
              <h1>Science</h1>
              <p>In this course, we will learn about biodiversity, the cycles of the earth, pollution, recycling, and more!</p>
            </Link>
            <div className="course-info-row">
              <div className="course-points">
                {userProgress?.courses?.environmentalScience?.completed ? (
                  <p>Finished!</p>
                ) : (
                  <p>Points: {userProgress?.courses?.environmentalScience?.coursePoints || 0}</p>
                )}
              </div>
              <Link to="/environmental-science" onClick={scrollToTop}>
                <button className="cta-button spc-courses-button">Access Lessons</button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className='grid-container'>
          <div className={`grid-cell ${userProgress?.courses?.psychology?.completed ? 'course-completed' : ''}`}>
            <Link to="/psychology" onClick={scrollToTop} className="course-link">
              <img src={Psych} alt="Psychology" className="img-course"/>
              <h1>Psychology</h1>
              <p>In this course, we will learn about biodiversity, the cycles of the earth, pollution, recycling, and more!</p>
            </Link>
            <div className="course-info-row">
              <div className="course-points">
                {userProgress?.courses?.psychology?.completed ? (
                  <p>Finished!</p>
                ) : (
                  <p>Points: {userProgress?.courses?.psychology?.coursePoints || 0}</p>
                )}
              </div>
              <Link to="/psychology" onClick={scrollToTop}>
                <button className="cta-button spc-courses-button">Access Lessons</button>
              </Link>
            </div>
          </div>
          
          <div className={`grid-cell ${userProgress?.courses?.statistics?.completed ? 'course-completed' : ''}`}>
            <Link to="/statistics" onClick={scrollToTop} className="course-link">
              <img src={Stats} alt="Statistics" className="img-course"/>
              <h1>Statistics</h1>
              <p>In this course, we will dive into different subtopics of statistics, such as fractions & percents, graphing, and real world-applications.</p>
            </Link>
            <div className="course-info-row">
              <div className="course-points">
                {userProgress?.courses?.statistics?.completed ? (
                  <p>Finished!</p>
                ) : (
                  <p>Points: {userProgress?.courses?.statistics?.coursePoints || 0}</p>
                )}
              </div>
              <Link to="/statistics" onClick={scrollToTop}>
                <button className="cta-button spc-courses-button">Access Lessons</button>
              </Link>
            </div>
          </div>
          
          <div className={`grid-cell ${userProgress?.courses?.zoology?.completed ? 'course-completed' : ''}`}>
            <Link to="/zoology" onClick={scrollToTop} className="course-link">
              <img src={Zoology} alt="Zoology" className="img-course"/>
              <h1>Zoology</h1>
              <p>In this course we will learn about the field of zoology, some topics include biodiversity, taxonomy, and anatomy.</p>
            </Link>
            <div className="course-info-row">
              <div className="course-points">
                {userProgress?.courses?.zoology?.completed ? (
                  <p>Finished!</p>
                ) : (
                  <p>Points: {userProgress?.courses?.zoology?.coursePoints || 0}</p>
                )}
              </div>
              <Link to="/zoology" onClick={scrollToTop}>
                <button className="cta-button spc-courses-button">Access Lessons</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div style={{ paddingBottom: '100px' }} />
      <Footer />
    </div>
  );
};

export default SelfPacedClasses;