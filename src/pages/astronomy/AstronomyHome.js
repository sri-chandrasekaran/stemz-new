import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import HeroOther from "../../components/HeroOther";
import Footer from "../../components/Footer";
import AstronomyImage from "../../assets/astronomy.PNG";
import { Link, useNavigate } from "react-router-dom";
import "../../routes/css/AllClassHomePage.css";
import { call_api } from "../../api";

const Astronomy = () => {
  const [courseProgress, setCourseProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  // Fetch course progress data
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchCourseProgress = async () => {
      try {
        const response = await call_api(null, "points", "GET");

        if (response && response.courses && response.courses.astronomy) {
          console.log("Astronomy course progress:", response.courses.astronomy);
          setCourseProgress(response.courses.astronomy);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching course progress:", err);
        setLoading(false);
      }
    };

    fetchCourseProgress();
  }, [isAuthenticated]);

  // Calculate total possible points for the course
  const calculateTotalPossiblePoints = () => {
    if (!courseProgress) return 100; // Default value

    let total = 0;

    Object.keys(courseProgress.lessons).forEach((lessonKey) => {
      const lesson = courseProgress.lessons[lessonKey];
      Object.keys(lesson.activities).forEach((activityKey) => {
        const activity = lesson.activities[activityKey];
        total += activity.points;
        if (activity.type === "quiz" && activity.extraPoints) {
          total += activity.extraPoints;
        }
      });
    });

    return total || 100; // Fallback to 100 if calculation results in 0
  };

  // Check if a lesson is completed
  const isLessonCompleted = (lessonKey) => {
    if (!courseProgress || !courseProgress.lessons[lessonKey]) return false;
    return courseProgress.lessons[lessonKey].completed;
  };

  // Get points for a specific lesson
  const getLessonPoints = (lessonKey) => {
    if (!courseProgress || !courseProgress.lessons[lessonKey]) return 0;
    return courseProgress.lessons[lessonKey].lessonPoints || 0;
  };

  // Function to consistently display lesson points with completion status
  const renderLessonPoints = (lessonKey) => {
    const points = getLessonPoints(lessonKey);
    const completed = isLessonCompleted(lessonKey);
    
    // Use consistent completion logic for all lessons
    const isComplete = completed || 
      (lessonKey === "lesson1" && points >= 10) || 
      (lessonKey === "lesson2" && points >= 7) || 
      (lessonKey === "lesson3" && points >= 7) || 
      (lessonKey === "lesson4" && points >= 7);
    
    return (
      <div className={isComplete ? "lesson-points completed" : "lesson-points"}>
        <p>
          Points: {points} {isComplete ? "(completed!)" : ""}
        </p>
      </div>
    );
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <HeroOther overlayText="Astronomy" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading course content...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <HeroOther overlayText="Astronomy" />
      <img src={AstronomyImage} alt="Astronomy" className="course-img" />
      <div className="course-description">
        <h2>Recommended Grade Level: 1st - 5th Grade</h2>
        <h2>Length: 4 Lessons, 1 hour each</h2>
        <h2>
          In this course we will learn about galaxies, the universe,
          constellations and much more!
        </h2>
        <h3>Creator: Alice Gao</h3>

        <div className="points-display">
          <p
            className={
              courseProgress && courseProgress.completed
                ? "points-text completed"
                : "points-text"
            }
          >
            Your points: {courseProgress ? courseProgress.coursePoints : 0}/
            {calculateTotalPossiblePoints()}
          </p>
          {courseProgress && courseProgress.completed && (
            <p className="completed-text">Completed!</p>
          )}
        </div>
      </div>

      <div className="student-l1">
        <h1>Student-Led Lessons</h1>
        <div className="lesson-grid">
          <div className="lesson-item">
            <Link
              to="/astrovid1s"
              onClick={scrollToTop}
              className="lesson-link"
            >
              <img
                src="https://i.ytimg.com/vi/vy2NuP1ITFo/mqdefault.jpg"
                alt="Lesson 1 Thumbnail"
                className="lesson-thumbnail"
              />
              <h3 className="lesson-title">Lesson 1: The Solar System</h3>
            </Link>
            {renderLessonPoints("lesson1")}
          </div>

          <div className="lesson-item">
            <Link
              to="/astrovid2s"
              onClick={scrollToTop}
              className="lesson-link"
            >
              <img
                src="https://i.ytimg.com/vi/0MG58dFzUkU/mqdefault.jpg"
                alt="Lesson 2 Thumbnail"
                className="lesson-thumbnail"
              />
              <h3 className="lesson-title">Lesson 2: Galaxies</h3>
            </Link>
            {renderLessonPoints("lesson2")}
          </div>

          <div className="lesson-item">
            <Link
              to="/astrovid3s"
              onClick={scrollToTop}
              className="lesson-link"
            >
              <img
                src="https://i.ytimg.com/vi/v4pT0yllkO0/mqdefault.jpg"
                alt="Lesson 3 Thumbnail"
                className="lesson-thumbnail"
              />
              <h3 className="lesson-title">Lesson 3: Space and Humans</h3>
            </Link>
            {renderLessonPoints("lesson3")}
          </div>

          <div className="lesson-item">
            <Link
              to="/astrovid4s"
              onClick={scrollToTop}
              className="lesson-link"
            >
              <img
                src="https://i.ytimg.com/vi/ImEEVWosix4/mqdefault.jpg"
                alt="Lesson 4 Thumbnail"
                className="lesson-thumbnail"
              />
              <h3 className="lesson-title">Lesson 4: The Universe</h3>
            </Link>
            {renderLessonPoints("lesson4")}
          </div>
        </div>
      </div>

      <div className="student-l1">
        <h1>Parent-Led Lessons</h1>
        <div className="lesson-grid">
          <div className="lesson-item">
            <Link
              to="/astrovid1p"
              onClick={scrollToTop}
              className="lesson-link"
            >
              <img
                src="https://i.ytimg.com/vi/vy2NuP1ITFo/mqdefault.jpg"
                alt="Lesson 1 Thumbnail"
                className="lesson-thumbnail"
              />
              <h3 className="lesson-title">Lesson 1: The Solar System</h3>
            </Link>
            {renderLessonPoints("lesson1")}
          </div>

          <div className="lesson-item">
            <Link
              to="/astrovid2p"
              onClick={scrollToTop}
              className="lesson-link"
            >
              <img
                src="https://i.ytimg.com/vi/0MG58dFzUkU/mqdefault.jpg"
                alt="Lesson 2 Thumbnail"
                className="lesson-thumbnail"
              />
              <h3 className="lesson-title">Lesson 2: Galaxies</h3>
            </Link>
            {renderLessonPoints("lesson2")}
          </div>

          <div className="lesson-item">
            <Link
              to="/astrovid3p"
              onClick={scrollToTop}
              className="lesson-link"
            >
              <img
                src="https://i.ytimg.com/vi/v4pT0yllkO0/mqdefault.jpg"
                alt="Lesson 3 Thumbnail"
                className="lesson-thumbnail"
              />
              <h3 className="lesson-title">Lesson 3: Space and Humans</h3>
            </Link>
            {renderLessonPoints("lesson3")}
          </div>

          <div className="lesson-item">
            <Link
              to="/astrovid4p"
              onClick={scrollToTop}
              className="lesson-link"
            >
              <img
                src="https://i.ytimg.com/vi/ImEEVWosix4/mqdefault.jpg"
                alt="Lesson 4 Thumbnail"
                className="lesson-thumbnail"
              />
              <h3 className="lesson-title">Lesson 4: The Universe</h3>
            </Link>
            {renderLessonPoints("lesson4")}
          </div>
        </div>
      </div>

      <div style={{ paddingBottom: "200px" }} />
      <Footer />
    </div>
  );
};

export default Astronomy;