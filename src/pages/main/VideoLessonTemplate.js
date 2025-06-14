import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import HeroOther from '../../components/HeroOther';
import Footer from '../../components/Footer';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useVideoProgress } from '../../utils/VideoProgressTracker';
import '../../pages/css/Allvideo.css';

/**
 * Template for video lesson pages
 * 
 * @param {Object} props - Component props
 * @param {string} props.courseKey - Course identifier (e.g. "astronomy")
 * @param {string} props.lessonNumber - Lesson identifier (e.g. "lesson1")
 * @param {string} props.lessonTitle - Lesson title to display
 * @param {string} props.videoId - YouTube video ID
 * @param {string} props.worksheetPath - Path to worksheet page
 * @param {string} props.slideshowUrl - URL to slideshow
 * @param {string} props.notesUrl - URL to student notes
 * @param {number} props.maxPoints - Total maximum points for lesson
 * @returns {JSX.Element} - Video lesson component
 */
const VideoLessonTemplate = ({
  courseKey,
  lessonNumber,
  lessonTitle,
  videoId,
  worksheetPath,
  slideshowUrl,
  notesUrl,
  maxPoints = 12
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoElementId = "youtube-player";
  
  // Use the shared tracking hook
  const {
    loading,
    videoWatched,
    highestVideoProgress, // Use this for display and calculations
    worksheetCompleted,
    pointsEarned,
    savingPoints,
    statusMessage,
    verifyToken,
    fetchProgress,
    initializeYouTube,
    updateBackend,
    cleanup,
    navigateToWorksheet
  } = useVideoProgress(courseKey, lessonNumber);
  
  // Verify token on mount
  useEffect(() => {
    verifyToken(navigate);
  }, [navigate, verifyToken]);
  
  // Initialize YouTube player
  useEffect(() => {
    const cleanupYouTube = initializeYouTube(videoElementId);
    
    return () => {
      cleanup();
      if (cleanupYouTube) cleanupYouTube();
    };
  }, [initializeYouTube, cleanup]);
  
  // Update backend when progress changes
  useEffect(() => {
    updateBackend();
  }, [pointsEarned, videoWatched, worksheetCompleted, updateBackend]);
  
  // Handle worksheet button click
  const handleWorksheetClick = () => {
    navigateToWorksheet(navigate, worksheetPath);
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <HeroOther overlayText={lessonTitle}/>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading lesson content...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar/>
      <HeroOther overlayText={lessonTitle}/>
      
      {/* Status message notification */}
      {statusMessage && (
        <div className="status-notification" style={{
          position: 'fixed',
          top: '70px',
          right: '20px',
          padding: '10px 15px',
          backgroundColor: statusMessage.includes("Error") ? 'rgba(231, 76, 60, 0.8)' : 'rgba(46, 204, 113, 0.8)',
          color: 'white',
          borderRadius: '5px',
          fontWeight: 'bold',
          zIndex: 1000,
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          animation: 'fadeIn 0.3s ease-out',
          fontSize: '16px'
        }}>
          {statusMessage}
        </div>
      )}
      
      <div className="points-status">
        <div className="points-row">
          <span className="points-label">Video progress:</span> 
          <span className="points-value">{highestVideoProgress}%</span>
          <span className="points-earned">({pointsEarned.video} points)</span>
        </div>
        <div className="points-row">
          <span className="points-label">Worksheet:</span> 
          <span className="points-value">{worksheetCompleted ? "Completed" : "Not completed"}</span>
          <span className="points-earned">({pointsEarned.worksheet} points)</span>
        </div>
        <div className="points-row total">
          <span className="points-label">Total lesson points:</span>
          <span className="points-value">{pointsEarned.video + pointsEarned.worksheet} out of {maxPoints}</span>
        </div>
      </div>
      
      <div className="vidbig">
        <div id="youtube-player-container">
          <iframe 
            id={videoElementId}
            className="astrovid" 
            width="700" 
            height="480" 
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`}
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
      
      <div className="centered-container">
        {slideshowUrl && (
          <Link to={slideshowUrl} target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
        )}
        
        <button className="course-button" onClick={handleWorksheetClick}>
          Worksheet
        </button>
        
        {notesUrl && (
          <Link to={notesUrl} target="_blank" rel="noopener noreferrer">
            <button className="course-button">Student Notes</button>
          </Link>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>
      
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  );
};

export default VideoLessonTemplate;