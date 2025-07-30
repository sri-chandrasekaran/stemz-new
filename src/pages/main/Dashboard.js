import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Dashbar from "../../components/Dashbar";
import Footer from "../../components/Footer";
import "../css/Dashboard.css";
import { useNavigate, Link } from "react-router-dom";
import { call_api } from "../../api";
import { jwtDecode } from "jwt-decode";
import { FaTimes, FaExternalLinkAlt } from 'react-icons/fa';

// Import Physical Classroom APIs
import { 
  getMyNotifications, 
  getMyAssignments, 
  getNotificationSummary,
  markNotificationAsRead,
  dismissNotification as dismissNotificationAPI,
  clearAllNotifications as clearAllNotificationsAPI
} from "../../utils/NotificationAPIs";

// Import route mapping
import { 
  parseAssignmentLink, 
  getCourseDisplayName, 
  getActivityDisplayName, 
  getActivityIcon 
} from "../../utils/RouteMapping";

// Import toast system
import { ToastContainer, useNotificationToast } from "../../components/NotificationToast";

// Import all images (existing code)
import Coding from "../../assets/coding.jpg";
import CodingBasics1 from "../../assets/coding.jpg";
import CodingBasics2 from "../../assets/coding2.jpg";
import Biochemistry from "../../assets/biochem.PNG";
import Genetics from "../../assets/genetics.jpg";
import Microbiology from "../../assets/microbiology.png";
import DefaultCourseImg from "../../assets/defaultcourseimg.png";
import AstronomyImage from "../../assets/astronomy.PNG";
import Chemistry from "../../assets/chemistry.jpeg";
import Zoology from "../../assets/zoology.jpg";
import ES from "../../assets/environmentalscience.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const { showToast } = useNotificationToast();
  
  // Existing state
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [coursesLoaded, setCoursesLoaded] = useState(false);
  const [removingCourses, setRemovingCourses] = useState([]);
  const [tooltipMessages, setTooltipMessages] = useState({});
  const [userProgress, setUserProgress] = useState(null);
  
  // Physical Classroom notification states
  const [physicalNotifications, setPhysicalNotifications] = useState([]);
  const [physicalAssignments, setPhysicalAssignments] = useState([]);
  const [notificationSummary, setNotificationSummary] = useState({});
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('notifications');
  const [lastNotificationCheck, setLastNotificationCheck] = useState(new Date());

  // CSS for spinner animation (existing)
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

  // Token verification (existing)
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

  // Load Physical Classroom notifications and assignments
  const loadPhysicalClassroomData = async () => {
    try {
      setNotificationsLoading(true);
      
      // Load notifications, assignments, and summary in parallel
      const [notifications, assignments, summary] = await Promise.all([
        getMyNotifications(),
        getMyAssignments(), 
        getNotificationSummary()
      ]);

      // Process notifications with route mapping
      const processedNotifications = notifications.map(notification => ({
        ...notification,
        actualRoute: notification.linkUrl ? parseAssignmentLink(notification.linkUrl) : null,
        courseDisplayName: notification.targetCourse ? getCourseDisplayName(notification.targetCourse) : null,
        activityDisplayName: notification.targetActivity ? getActivityDisplayName(notification.targetActivity) : null,
        activityIcon: notification.targetActivity ? getActivityIcon(notification.targetActivity) : null
      }));

      // Process assignments with route mapping
      const processedAssignments = assignments.map(assignment => ({
        ...assignment,
        actualRoute: assignment.directLink ? parseAssignmentLink(assignment.directLink) : null,
        courseDisplayName: assignment.course ? getCourseDisplayName(assignment.course) : null,
        activityDisplayName: assignment.activityType ? getActivityDisplayName(assignment.activityType) : null,
        activityIcon: assignment.activityType ? getActivityIcon(assignment.activityType) : null,
        lessonDisplayName: assignment.lesson ? assignment.lesson.replace('lesson', 'Lesson ') : null
      }));

      // Check for new notifications to show as toasts
      const newNotifications = processedNotifications.filter(
        notif => new Date(notif.createdAt) > lastNotificationCheck && !notif.isDismissed
      );

      if (newNotifications.length > 0) {
        console.log('New notifications detected:', newNotifications.length);
        // Show toast for the most recent notification
        showToast(newNotifications[0]);
      }

      setPhysicalNotifications(processedNotifications);
      setPhysicalAssignments(processedAssignments);
      setNotificationSummary(summary);
      setLastNotificationCheck(new Date());

    } catch (error) {
      console.error('Error loading Physical Classroom data:', error);
    } finally {
      setNotificationsLoading(false);
    }
  };

  // Dashboard data fetch (existing + Physical Classroom)
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
        setCoursesLoaded(true);
      }
    };

    const fetchUserProgress = async () => {
      try {
        const response = await call_api(null, "points", "GET");
        if (response) {
          console.log("User progress data:", response);
          setUserProgress(response);
        }
      } catch (error) {
        console.error("Error fetching user progress:", error);
      }
    };

    const fetchAllData = async () => {
      await Promise.all([
        fetchDashboardData(),
        fetchRegisteredCourses(),
        fetchUserProgress(),
        loadPhysicalClassroomData() // Add Physical Classroom data
      ]);
    };

    fetchAllData();
  }, [isAuthenticated]);

  // Poll for new notifications every 30 seconds
  useEffect(() => {
    if (!isAuthenticated) return;

    const pollInterval = setInterval(() => {
      loadPhysicalClassroomData();
    }, 30000); // 30 seconds

    return () => clearInterval(pollInterval);
  }, [isAuthenticated, lastNotificationCheck]);

  // Existing course helper functions
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

  const removeCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to remove this course?")) {
      setRemovingCourses(prev => [...prev, courseId]);
      
      try {
        await call_api(null, `classrooms/${courseId}/unenroll`, "POST");
        setRegisteredCourses((prev) =>
          prev.filter((course) => course._id !== courseId)
        );
      } catch (error) {
        console.error("Error removing course:", error);
        setRemovingCourses(prev => prev.filter(id => id !== courseId));
      }
    }
  };

  const handleButtonClick = (courseId, buttonType) => {
    const message = `${buttonType} coming soon!`;
    alert(message);
    
    setTooltipMessages(prev => ({
      ...prev,
      [courseId + buttonType]: message
    }));
    
    setTimeout(() => {
      setTooltipMessages(prev => {
        const newMessages = {...prev};
        delete newMessages[courseId + buttonType];
        return newMessages;
      });
    }, 3000);
  };

  // Physical Classroom notification functions
  const handleNotificationClick = async (notification) => {
    try {
      // Mark as read if not already read
      if (!notification.isRead) {
        await markNotificationAsRead(notification._id);
        loadPhysicalClassroomData(); // Refresh data
      }

      // Navigate if clickable
      if (notification.actualRoute) {
        navigate(notification.actualRoute);
      }
    } catch (error) {
      console.error('Error handling notification click:', error);
    }
  };

  const handleAssignmentClick = (assignment) => {
    if (assignment.actualRoute) {
      navigate(assignment.actualRoute);
    } else {
      alert('This assignment content is not available yet');
    }
  };

  const dismissNotification = async (notificationId) => {
    try {
      await dismissNotificationAPI(notificationId);
      loadPhysicalClassroomData(); // Refresh data
    } catch (error) {
      console.error('Error dismissing notification:', error);
    }
  };

  const clearAllNotifications = async () => {
    try {
      await clearAllNotificationsAPI();
      loadPhysicalClassroomData(); // Refresh data
    } catch (error) {
      console.error('Error clearing all notifications:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'announcement': return '📢';
      case 'assignment': return '📝';
      case 'quiz_failure': return '⚠️';
      default: return '🔔';
    }
  };

  const getNotificationColor = (notification) => {
    if (notification.type === 'quiz_failure') {
      return notification.quizFailureDetails?.failureType === 'red' ? '#ff4757' : '#ffa502';
    }
    if (notification.priority === 'high') return '#e74c3c';
    if (notification.priority === 'medium') return '#f39c12';
    return '#4CAF50';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Loading state (existing)
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
      <ToastContainer /> {/* Add toast container */}
      
      <div className="hello">
        <h1 className="hello-text">Hello {user?.name || ''}!</h1>
        
        {/* Points Dashboard (existing) */}
        {userProgress && (
          <div className="points-dashboard">
            <div className="points-icon">🏆</div>
            <div className="points-info">
              <span className="points-count">{userProgress.totalPoints || 0}</span>
              <span className="points-label">Total Learning Points</span>
            </div>
            <Link to="/self-paced-classes" className="points-button">
              View All Courses
            </Link>
          </div>
        )}
      </div>
      
      <div className="grid-container-wrapper">
        {/* Main Dashboard Content - Side by Side Layout (existing) */}
        <div className="dashboard-main-content">
          
          {/* Enrolled Courses Section (existing) */}
          <div className="enrolled-courses-section">
            <h3 className="header-courses">Courses Enrolled</h3>
            
            {!coursesLoaded ? (
              <div className="enrolled-loading-message">
                <p>Loading your classes...</p>
              </div>
            ) : registeredCourses.length === 0 ? (
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
                {registeredCourses.map((course) => (
                  <div key={course._id} className="enrolled-course-card">
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
                ))}
              </div>
            )}
          </div>

          {/* Physical Classroom Notification Center Section */}
          <div className="notification-center-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <h3 className="header-notifications">Physical Classroom Center</h3>
              <button 
                onClick={loadPhysicalClassroomData}
                style={{
                  // same white background
                  background: 'white',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  fontSize: '20px',
                  // shift up
                  transform: 'translateY(-10px)',
                }}
              >
                🔄 
              </button>
            </div>
            
            {/* Summary badges */}
            {notificationSummary && (
              <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '20px',
                flexWrap: 'wrap'
              }}>
                <span style={{
                  background: '#e3f2fd',
                  color: '#1976d2',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 'bold'
                }}>
                  📬 {notificationSummary.unreadCount || 0} Unread
                </span>
                <span style={{
                  background: '#e8f5e8',
                  color: '#2e7d32',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 'bold'
                }}>
                  📝 {notificationSummary.assignmentCount || 0} Assignments
                </span>
                {(notificationSummary.urgentCount || 0) > 0 && (
                  <span style={{
                    background: '#ffebee',
                    color: '#c62828',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: 'bold'
                  }}>
                    ⚠️ {notificationSummary.urgentCount} Urgent
                  </span>
                )}
              </div>
            )}
            
            <div className="notification-tabs">
              <button 
                className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                Notifications ({physicalNotifications.length})
              </button>
              <button 
                className={`tab-button ${activeTab === 'assignments' ? 'active' : ''}`}
                onClick={() => setActiveTab('assignments')}
              >
                Assignments ({physicalAssignments.length})
              </button>
            </div>

            {notificationsLoading ? (
              <div className="notification-loading">
                <div className="loading-spinner"></div>
                <p>Loading Physical Classroom data...</p>
              </div>
            ) : (
              <>
                {activeTab === 'notifications' && (
                  <div className="notifications-section">
                    <div className="section-header">
                      <h2>Classroom Notifications</h2>
                      {physicalNotifications.length > 0 && (
                        <button 
                          className="clear-all-btn"
                          onClick={clearAllNotifications}
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                    
                    {physicalNotifications.length === 0 ? (
                      <div className="empty-state">
                        <div className="empty-icon">🔔</div>
                        <h3>No classroom notifications</h3>
                        <p>When your teachers create assignments or make announcements, they'll appear here.</p>
                      </div>
                    ) : (
                      <div className="notifications-list">
                        {physicalNotifications.map((notification) => (
                          <div 
                            key={notification._id} 
                            className="notification-card"
                            style={{ borderLeft: `4px solid ${getNotificationColor(notification)}` }}
                            onClick={() => handleNotificationClick(notification)}
                          >
                            <div className="notification-header-row">
                              <div className="notification-icon">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="notification-title">
                                {notification.title}
                              </div>
                              {!notification.isRead && (
                                <span style={{
                                  width: '8px',
                                  height: '8px',
                                  backgroundColor: '#4CAF50',
                                  borderRadius: '50%',
                                  marginLeft: '8px'
                                }}></span>
                              )}
                              <button 
                                className="dismiss-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dismissNotification(notification._id);
                                }}
                                title="Dismiss notification"
                              >
                                <FaTimes />
                              </button>
                            </div>
                            
                            <div className="notification-body">
                              <p className="notification-message">{notification.message}</p>
                              
                              {notification.type === 'assignment' && (
                                <div className="assignment-details">
                                  <div className="assignment-info">
                                    <span className="course-tag">{notification.courseDisplayName}</span>
                                    <span className="activity-type">{notification.activityDisplayName}</span>
                                  </div>
                                  {notification.dueDate && (
                                    <div className="due-date">
                                      Due: {formatDate(notification.dueDate)}
                                    </div>
                                  )}
                                  {notification.actualRoute && (
                                    <div style={{ marginTop: '8px' }}>
                                      <span style={{
                                        background: '#4CAF50',
                                        color: 'white',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        cursor: 'pointer'
                                      }}>
                                        🚀 Click to start {notification.activityDisplayName}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              {notification.type === 'quiz_failure' && notification.quizFailureDetails && (
                                <div className="quiz-failure-details">
                                  <div className="score-info">
                                    Score: {notification.quizFailureDetails.scorePercent}%
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="notification-footer">
                              <span className="classroom-name">
                                {notification.physicalClassroomId?.name || 'Physical Classroom'}
                              </span>
                              <span className="notification-time">
                                {formatDate(notification.createdAt)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'assignments' && (
                  <div className="assignments-section">
                    <div className="section-header">
                      <h2>Your Physical Classroom Assignments</h2>
                    </div>
                    
                    {physicalAssignments.length === 0 ? (
                      <div className="empty-state">
                        <div className="empty-icon">📝</div>
                        <h3>No assignments yet</h3>
                        <p>Your teachers haven't assigned any work from physical classrooms yet.</p>
                      </div>
                    ) : (
                      <div className="assignments-list">
                        {physicalAssignments.map((assignment) => (
                          <div 
                            key={assignment._id} 
                            className="assignment-card"
                            onClick={() => handleAssignmentClick(assignment)}
                            style={{ cursor: assignment.actualRoute ? 'pointer' : 'default' }}
                          >
                            <div className="assignment-header">
                              <h3 className="assignment-title">
                                {assignment.activityIcon} {assignment.title}
                              </h3>
                              <div className="assignment-tags">
                                <span className="course-tag">{assignment.courseDisplayName}</span>
                                <span className="activity-tag">{assignment.activityDisplayName}</span>
                                {assignment.priority === 'high' && (
                                  <span style={{
                                    background: '#f44336',
                                    color: 'white',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontSize: '11px'
                                  }}>
                                    HIGH PRIORITY
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {assignment.description && (
                              <p className="assignment-description">{assignment.description}</p>
                            )}
                            
                            <div className="assignment-details">
                              <div className="assignment-meta">
                                <span>Activity: {assignment.activityTitle}</span>
                                <span>{assignment.lessonDisplayName}</span>
                              </div>
                              
                              {assignment.dueDate && (
                                <div className="due-date">
                                  Due: {formatDate(assignment.dueDate)}
                                </div>
                              )}
                            </div>
                            
                            <div className="assignment-footer">
                              <div className="classroom-teacher">
                                <span>{assignment.physicalClassroomId?.name || 'Physical Classroom'}</span>
                                <span>Teacher: {assignment.teacherId?.name}</span>
                              </div>
                              
                              {assignment.actualRoute ? (
                                <span style={{
                                  background: '#4CAF50',
                                  color: 'white',
                                  padding: '6px 12px',
                                  borderRadius: '4px',
                                  fontSize: '12px',
                                  fontWeight: 'bold'
                                }}>
                                  🚀 Click to Start
                                </span>
                              ) : (
                                <span style={{
                                  background: '#ccc',
                                  color: '#666',
                                  padding: '6px 12px',
                                  borderRadius: '4px',
                                  fontSize: '12px'
                                }}>
                                  Content Not Available
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Recommended Courses Section (existing) */}
        <h3 className="header-recommended">Recommended Courses</h3>
        <div className="recommended-container">
          <div className="recommended-row">
            {[
              {
                id: 1,
                name: "Astronomy",
                description: "In this course we will learn about galaxies, the universe, constellations and much more!",
                image: AstronomyImage,
                link: "/astronomy",
              },
              {
                id: 2,
                name: "Basics of coding",
                description: "In this course we will learn about movement, variables, conditional statements and many more, using Scratch. No prior experience is needed!",
                image: Coding,
                link: "/basicsofcoding",
              },
              {
                id: 3,
                name: "Chemistry",
                description: "In this course, your child will learn about matter, energy, and chemical reactions. The course culminates in a final project that serves as a launching pad to inspire your child to learn more! Parent supervision needed.",
                image: Chemistry,
                link: "/chemistry",
              },
              {
                id: 4,
                name: "Zoology",
                description: "In this course, we will learn about biodiversity, the cycles of the earth, pollution, recycling, and more!",
                image: Zoology,
                link: "/zoology",
              },
              {
                id: 5,
                name: "Environmental Science",
                description: "In this course we will learn about the field of zoology, some topics include biodiversity, taxonomy, and anatomy.",
                image: ES,
                link: "/environmentalscience",
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