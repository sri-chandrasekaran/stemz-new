import React, { useState, useEffect, useCallback } from 'react';
import './Form.css'
import PropTypes from 'prop-types';
import { call_api } from '../api';
import './Quiz.css';

const Quiz = ({ src, courseKey, lessonNumber }) => {
  // State variables
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [total, setTotal] = useState(0);
  const [quizTitle, setQuizTitle] = useState('');
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [percentCorrect, setPercentCorrect] = useState(0);
  const [savingPoints, setSavingPoints] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusTimeoutRef, setStatusTimeoutRef] = useState(null);

  // Show status message with auto-fade
  const showStatus = useCallback((message, duration = 3000) => {
    setStatusMessage(message);
    
    // Clear any existing timeout
    if (statusTimeoutRef) {
      clearTimeout(statusTimeoutRef);
    }
    
    // Set new timeout to clear message
    const timeoutId = setTimeout(() => {
      setStatusMessage("");
    }, duration);
    
    setStatusTimeoutRef(timeoutId);
  }, [statusTimeoutRef]);

  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Load quiz data from backend with dynamic grade
useEffect(() => {
  const fetchQuizFromBackend = async () => {
    try {
      // First, get the current user's grade
      console.log("Step 1: Getting user info from auth/verify");
      const userResponse = await call_api(null, "auth/verify", "POST");
      console.log("Auth verify response:", userResponse);
      
      if (!userResponse || !userResponse.user) {
        console.error("Could not get user info");
        return;
      }

      console.log("Step 2: Getting user details with ID:", userResponse.user.id);
      // Get the full user details to access grade
      const userDetailsResponse = await call_api(null, `users/id/${userResponse.user.id}`, "GET");
      console.log("User details response:", userDetailsResponse);
      
      if (!userDetailsResponse) {
        console.error("Could not fetch user details");
        return;
      }
      
      if (!userDetailsResponse.grade) {
        console.error("User has no grade field. User object:", userDetailsResponse);
        return;
      }

      const userGrade = userDetailsResponse.grade;
      console.log(`Step 3: User grade found: ${userGrade}`);

      // Now fetch quiz questions with dynamic grade
      console.log(`Step 4: Fetching quiz questions for course: ${courseKey}, grade: ${userGrade}`);
      const response = await call_api(null, `quizquestions?course_id=${courseKey}&grade=${userGrade}`, "GET");
      console.log("Quiz API response:", response);
      
      if (response && response.questions && response.questions.length > 0) {
        console.log('Loaded questions from backend:', response.questions);
        setQuestions(response.questions.map(q => ({
          question: q.question,
          options: q.options,
          correctAnswerIndex: q.correctAnswerIndex,
        })));
        setTotal(response.questions.length);
        // setQuizTitle(`${courseKey} Quiz - Grade ${userGrade}`);
        setQuizTitle(`${capitalizeFirst(courseKey)} Quiz - Grade ${userGrade}`);

      } else {
        console.error("No questions found for this grade level");
      }
    } catch (err) {
      console.error("Error fetching quiz questions:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchQuizFromBackend();
}, [courseKey, lessonNumber]);


  // Fetch user progress data
  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        console.log('Fetching user progress data...');
        const response = await call_api(null, "points", "GET");
        
        if (response) {
          console.log('User progress data received:', JSON.stringify(response, null, 2));
          setUserProgress(response);
          
          // Check if there's quiz data available
          if (response.courses && 
              response.courses[courseKey] && 
              response.courses[courseKey].lessons && 
              response.courses[courseKey].lessons[lessonNumber] && 
              response.courses[courseKey].lessons[lessonNumber].activities && 
              response.courses[courseKey].lessons[lessonNumber].activities.quiz) {
            
            const quizData = response.courses[courseKey].lessons[lessonNumber].activities.quiz;
            console.log('Existing quiz data found:', quizData);
            
            // Load previous scores for display, but don't automatically show results
            // This allows the student to take the quiz again immediately
            if (quizData.completed) {
              // Just store the previous scores for comparison, don't show results yet
              setPointsEarned(quizData.earned || 0);
              setCorrectAnswers(quizData.correctAnswers || 0);
              setPercentCorrect(quizData.percentCorrect || 0);
              
              // Optional: Show a welcome back message
              if (showStatus) {
                showStatus(`Your best score: ${quizData.earned} points`, 5000);
              }
            }
          } else {
            console.log('No existing quiz data found for this course/lesson');
          }
          
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching course progress:', err);
        setLoading(false);
      }
    };

    fetchUserProgress();
  }, [courseKey, lessonNumber, showStatus]);

  // Handle answer selection
  const handleAnswerChange = (questionIndex, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex,
    });
  };

  // Calculate score and update points on quiz submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Calculate correctAnswers
    let correctCount = 0;
    
    questions.forEach((q, questionIndex) => {
      const isCorrect = selectedAnswers[questionIndex] === q.correctAnswerIndex;
      if (isCorrect) {
        correctCount++;
      }
    });
    
    // Calculate percentage correct
    const percentCorrect = Math.round((correctCount / questions.length) * 100);
    console.log(`Quiz results: ${correctCount}/${questions.length} correct (${percentCorrect}%)`);
    
    // Calculate points earned based on quiz structure
    // If all answers correct (100%), award 5 + 5 bonus = 10 points
    // Otherwise, award based on percentage of 5 points (rounded)
    let earnedPoints = 0;
    
    if (correctCount === questions.length) {
      // Perfect score - gets full points plus bonus
      earnedPoints = 10; // 5 regular + 5 bonus
      console.log('Perfect score! Awarding 10 points (5 regular + 5 bonus)');
    } else {
      // Calculate based on percentage of base points (5)
      // For example: 50% correct = 2.5 → rounds to 3 points
      earnedPoints = Math.round((5 * correctCount) / questions.length);
      console.log(`Partial score. Awarding ${earnedPoints} points`);
    }
    
    // Update state
    setCorrectAnswers(correctCount);
    setPercentCorrect(percentCorrect);
    setPointsEarned(earnedPoints);
    setShowResults(true);
    
    // Only update backend if new score is higher than previous
    const previousPoints = userProgress?.courses?.[courseKey]?.lessons?.[lessonNumber]?.activities?.quiz?.earned || 0;
    console.log(`Previous best score: ${previousPoints} points`);
    
    if (earnedPoints > previousPoints) {
      console.log(`New high score! Updating backend with ${earnedPoints} points`);
      await updateBackend(earnedPoints, correctCount, percentCorrect);
      showStatus(`✓ New high score: ${earnedPoints} points!`, 3000);
    } else if (earnedPoints === previousPoints) {
      console.log('Score matches previous best. Not updating backend.');
      showStatus("You matched your previous score!", 3000);
    } else {
      console.log('Score is lower than previous best. Not updating backend.');
      showStatus(`Previous best: ${previousPoints} points`, 3000);
    }
  };
  
  // Update points in backend
  const updateBackend = async (earnedPoints, correctCount, percentCorrect) => {
    if (!userProgress) {
      console.error('No user progress data available. Cannot update backend.');
      return;
    }
    
    try {
      setSavingPoints(true);
      showStatus("Saving quiz results...");
      
      // Debug info
      console.log('Quiz update parameters:', {
        courseKey, 
        lessonNumber,
        quizTitle,
        earnedPoints,
        correctCount,
        percentCorrect
      });
      
      console.log('User progress before update:', JSON.stringify(userProgress, null, 2));
      
      // Create a deep clone of the userProgress
      const updatedProgress = JSON.parse(JSON.stringify(userProgress));
      
      // Ensure all needed objects exist with correct structure
      if (!updatedProgress.courses[courseKey]) {
        console.log(`Creating missing course: ${courseKey}`);
        updatedProgress.courses[courseKey] = { 
          title: courseKey === "astronomy" ? "Astronomy" : courseKey,
          coursePoints: 0, 
          completed: false,
          lessons: {}
        };
      }
      
      if (!updatedProgress.courses[courseKey].lessons[lessonNumber]) {
        console.log(`Creating missing lesson: ${lessonNumber}`);
        updatedProgress.courses[courseKey].lessons[lessonNumber] = { 
          title: lessonNumber === "lesson4" ? "The Universe" : lessonNumber,
          lessonPoints: 0, 
          completed: false,
          activities: {} 
        };
      }
      
      if (!updatedProgress.courses[courseKey].lessons[lessonNumber].activities) {
        updatedProgress.courses[courseKey].lessons[lessonNumber].activities = {};
      }
      
      // Get or create quiz activity
      if (!updatedProgress.courses[courseKey].lessons[lessonNumber].activities.quiz) {
        console.log('Creating missing quiz activity');
        updatedProgress.courses[courseKey].lessons[lessonNumber].activities.quiz = {
          title: quizTitle || "Astronomy Quiz",
          type: "quiz",
          completed: false,
          points: 5,
          extraPoints: 5,
          questionsCount: questions.length,
          correctAnswers: 0,
          percentCorrect: 0,
          earned: 0
        };
      }
      
      // Update quiz data
      console.log('Updating quiz data with new results');
      const quizData = updatedProgress.courses[courseKey].lessons[lessonNumber].activities.quiz;
      quizData.completed = true;
      quizData.correctAnswers = correctCount;
      quizData.percentCorrect = percentCorrect;
      quizData.earned = earnedPoints;
      quizData.questionsCount = questions.length;
      
      // Recalculate lesson points from ALL activities
      let lessonPoints = 0;
      const activities = updatedProgress.courses[courseKey].lessons[lessonNumber].activities;
      
      Object.keys(activities).forEach(activityKey => {
        const points = activities[activityKey].earned || 0;
        lessonPoints += points;
        console.log(`Activity ${activityKey} contributes ${points} points`);
      });
      
      // Update lesson points
      console.log(`Setting lesson points to ${lessonPoints}`);
      updatedProgress.courses[courseKey].lessons[lessonNumber].lessonPoints = lessonPoints;
      
      // Check if video is complete before marking lesson as completed
      const videoComplete = updatedProgress.courses[courseKey].lessons[lessonNumber].activities.video?.completed || 
                        (updatedProgress.courses[courseKey].lessons[lessonNumber].activities.video?.percentWatched >= 95);
      
      // Only set lesson to complete if both quiz and video are complete
      updatedProgress.courses[courseKey].lessons[lessonNumber].completed = videoComplete;
      
      console.log(`Setting lesson completion to ${videoComplete} (video completed: ${videoComplete}, quiz completed: true)`);
      
      // Recalculate course points
      let coursePoints = 0;
      Object.values(updatedProgress.courses[courseKey].lessons).forEach(lesson => {
        const points = lesson.lessonPoints || 0;
        coursePoints += points;
        console.log(`Lesson "${lesson.title}" contributes ${points} points`);
      });
      
      // Update course points
      console.log(`Setting course points to ${coursePoints}`);
      updatedProgress.courses[courseKey].coursePoints = coursePoints;
      
      // Recalculate total points
      let totalPoints = 0;
      Object.values(updatedProgress.courses).forEach(course => {
        const points = course.coursePoints || 0;
        totalPoints += points;
        console.log(`Course "${course.title}" contributes ${points} points`);
      });
      
      // Update total points
      console.log(`Setting total points to ${totalPoints}`);
      updatedProgress.totalPoints = totalPoints;
      
      console.log('Updated progress to be sent to backend:', JSON.stringify(updatedProgress, null, 2));
      
      // Send to backend and log response
      console.log('Calling API with path "points" and method "POST"');
      const response = await call_api(updatedProgress, "points", "POST");
      
      console.log('API response:', response);
      
      if (response) {
        setUserProgress(updatedProgress);
        showStatus("✓ Quiz results saved!", 3000);
      } else {
        throw new Error("No response from API");
      }
    } catch (error) {
      console.error("Error updating points:", error);
      showStatus("❌ Error saving quiz results", 3000);
    } finally {
      setSavingPoints(false);
    }
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (statusTimeoutRef) {
        clearTimeout(statusTimeoutRef);
      }
    };
  }, [statusTimeoutRef]);

  if (loading) {
    return (
      <div className="quiz-container">
        <div className="loading-spinner"></div>
        <p>Loading quiz content...</p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>{quizTitle}</h2>
      
      <div className="bonus-points-note">
        Getting all questions correct will reward you with extra points!
      </div>
      
      {/* Previous best score banner */}
      {!showResults && userProgress?.courses?.[courseKey]?.lessons?.[lessonNumber]?.activities?.quiz?.completed && (
        <div className="previous-score-banner">
          <div className="score-info">
            <p className="previous-score-text">
              <span className="previous-label">Your best score:</span> 
              <span className="previous-value">{userProgress.courses[courseKey].lessons[lessonNumber].activities.quiz.earned} points</span>
              <span className="previous-details">
                ({userProgress.courses[courseKey].lessons[lessonNumber].activities.quiz.correctAnswers} of {userProgress.courses[courseKey].lessons[lessonNumber].activities.quiz.questionsCount} correct)
              </span>
            </p>
            {userProgress.courses[courseKey].lessons[lessonNumber].activities.quiz.earned === 10 && (
              <p className="perfect-score-message">Perfect score achieved! 🏆</p>
            )}
          </div>
        </div>
      )}
      
      {/* Status message notification */}
      {statusMessage && (
        <div className="status-notification" style={{
          position: 'fixed',
          top: '150px',
          right: '20px',
          padding: '10px 15px',
          backgroundColor: statusMessage.includes("Error") ? 'rgba(231, 76, 60, 0.8)' : '#357717',
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
      
      {showResults && (
        <div className="quiz-results">
          <div className="results-summary">
            <div className="result-row">
              <span className="result-label">Correct answers:</span> 
              <span className="result-value">{correctAnswers} out of {questions.length}</span>
              <span className="result-percentage">({percentCorrect}%)</span>
            </div>
            <div className="result-row">
              <span className="result-label">Points earned:</span>
              <span className="result-value">{pointsEarned} out of {correctAnswers === questions.length ? 10 : 5} points</span>
            </div>
          </div>
        </div>
      )}
      
      {questions.length > 0 ? (
        <form onSubmit={handleSubmit}>
          {questions.map((q, questionIndex) => (
            <div key={questionIndex} className="quiz-question">
              <p>{q.question}</p>
              {q.options.map((option, optionIndex) => {
                const isCorrect = optionIndex === q.correctAnswerIndex;
                const isSelected = selectedAnswers[questionIndex] === optionIndex;
                const isIncorrect = isSelected && !isCorrect;
                
                return (
                  <label
                    key={optionIndex}
                    style={{
                      backgroundColor: showResults
                        ? isCorrect
                          ? 'lightgreen'
                          : isIncorrect
                          ? 'salmon'
                          : 'transparent'
                        : 'transparent',
                    }}
                    className={showResults && isCorrect ? 'correct-answer' : ''}
                  >
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      value={optionIndex}
                      onChange={() => handleAnswerChange(questionIndex, optionIndex)}
                      disabled={showResults}
                      checked={selectedAnswers[questionIndex] === optionIndex}
                    />
                    {option}
                  </label>
                );
              })}
            </div>
          ))}
          {!showResults && (
            <button type="submit" disabled={Object.keys(selectedAnswers).length !== questions.length}>
              Submit Answers
            </button>
          )}
          {showResults && (
            <div className="quiz-complete-container">
              <div className="quiz-complete-message">
                Quiz completed! {pointsEarned > (userProgress?.courses?.[courseKey]?.lessons?.[lessonNumber]?.activities?.quiz?.earned || 0) ? 
                  "New high score saved!" : 
                  "Your best score is still saved."}
              </div>
              <button 
                onClick={() => {
                  setShowResults(false);
                  setSelectedAnswers({});
                }}
                className="retake-quiz-button"
              >
                Retake Quiz
              </button>
            </div>
          )}
        </form>
      ) : (
        <p>Quiz data could not be loaded.</p>
      )}
    </div>
  );
};

Quiz.propTypes = {
  src: PropTypes.string.isRequired,
  courseKey: PropTypes.string.isRequired,
  lessonNumber: PropTypes.string.isRequired
};

export default Quiz;