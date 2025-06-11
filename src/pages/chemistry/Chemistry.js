import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import HeroOther from "../../components/HeroOther";
import Footer from "../../components/Footer";
import Chemistry from "../../assets/chemistry.jpeg";
import { Link, useNavigate } from "react-router-dom";
import "../css/AllClassHomePage.css";
import { call_api } from "../../api";

const ChemistryPage = () => {
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

        if (response && response.courses && response.courses.chemistry) {
          console.log("Chemistry course progress:", response.courses.chemistry);
          setCourseProgress(response.courses.chemistry);
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
    return courseProgress.lessons[lessonKey].lessonPoints;
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <HeroOther overlayText="Chemistry" />
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
      <HeroOther overlayText="Chemistry" />
      <img src={Chemistry} alt="Chemistry" className="course-img" />
      <div className="course-description">
        <h2>Recommended Grade Level: 3rd - 6th Grade</h2>
        <h2>Length: 4 Lessons, 1 hour each</h2>
        <h2>
          In this course, your child will learn about matter, energy, and
          chemical reactions. The course culminates in a final project that
          serves as a launching pad to inspire your child to learn more! Parent
          supervision needed.
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
        <h1>Parent-Led Lessons</h1>
        <div className="lesson-grid">
          <div className="lesson-item">
            <Link to="/chem1" onClick={scrollToTop} className="lesson-link">
              <img
                src="https://i.ytimg.com/vi/qUcexzJnLew/mqdefault.jpg"
                alt="Lesson 1 Thumbnail"
                className="lesson-thumbnail"
              />
              <h3 className="lesson-title">Lesson 1: Chemistry & Matter</h3>
            </Link>
            <div
              className={
                isLessonCompleted("lesson1") || getLessonPoints("lesson1") >= 10
                  ? "lesson-points completed"
                  : "lesson-points"
              }
            >
              <p>
                Points: {getLessonPoints("lesson1")}{" "}
                {isLessonCompleted("lesson1") ||
                getLessonPoints("lesson1") >= 10
                  ? "(completed!)"
                  : ""}
              </p>
            </div>
          </div>

          <div className="lesson-item">
            <Link to="/chem2" onClick={scrollToTop} className="lesson-link">
              <img
                src="https://i.ytimg.com/vi/EJpJLOAIHRc/mqdefault.jpg"
                alt="Lesson 2 Thumbnail"
                className="lesson-thumbnail"
              />
              <h3 className="lesson-title">Lesson 2: Molecules & Atoms</h3>
            </Link>
            <div
              className={
                isLessonCompleted("lesson2") || getLessonPoints("lesson2") >= 7
                  ? "lesson-points completed"
                  : "lesson-points"
              }
            >
              <p>
                Points: {getLessonPoints("lesson2")}{" "}
                {isLessonCompleted("lesson2") ? "(completed!)" : ""}
              </p>
            </div>
          </div>

          <div className="lesson-item">
            <Link to="/chem3" onClick={scrollToTop} className="lesson-link">
              <img
                src="https://i.ytimg.com/vi/448XzSXabc4/mqdefault.jpg"
                alt="Lesson 3 Thumbnail"
                className="lesson-thumbnail"
              />
              <h3 className="lesson-title">Lesson 3: Chemical Reactions</h3>
            </Link>
            <div
              className={
                isLessonCompleted("lesson3") || getLessonPoints("lesson3") >= 7
                  ? "lesson-points completed"
                  : "lesson-points"
              }
            >
              <p>
                Points: {getLessonPoints("lesson3")}{" "}
                {isLessonCompleted("lesson3") ? "(completed!)" : ""}
              </p>
            </div>
          </div>

          <div className="lesson-item">
            <Link to="/chem4" onClick={scrollToTop} className="lesson-link">
              <img
                src="https://i.ytimg.com/vi/NpQJoCQEa9U/mqdefault.jpg"
                alt="Lesson 4 Thumbnail"
                className="lesson-thumbnail"
              />
              <h3 className="lesson-title">
                Lesson 4: Putting It All Together
              </h3>
            </Link>
            <div
              className={
                isLessonCompleted("lesson4") || getLessonPoints("lesson4") >= 7
                  ? "lesson-points completed"
                  : "lesson-points"
              }
            >
              <p>
                Points: {getLessonPoints("lesson4")}{" "}
                {isLessonCompleted("lesson4") ? "(completed!)" : ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ paddingBottom: "200px" }} />
      <Footer />
    </div>
  );
};

export default ChemistryPage;
