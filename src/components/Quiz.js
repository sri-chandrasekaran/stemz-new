import React, { useState, useEffect, useCallback } from 'react';
import './Form.css'
import PropTypes from 'prop-types';
import { call_api } from '../api';
import './Quiz.css';
import { jwtDecode } from 'jwt-decode';

const Quiz = ({ courseKey, lessonNumber }) => {
  // State variables (existing)
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [percentCorrect, setPercentCorrect] = useState(0);
  const [savingPoints, setSavingPoints] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusTimeoutRef, setStatusTimeoutRef] = useState(null);
  const [userGrade, setUserGrade] = useState(null);
  const [maxPossiblePoints, setMaxPossiblePoints] = useState(0);
  const [quizNotFound, setQuizNotFound] = useState(false);
  const [total, setTotal] = useState(0);

  // Show status message with auto-fade (existing)
  const showStatus = useCallback((message, duration = 3000) => {
    setStatusMessage(message);
    
    if (statusTimeoutRef) {
      clearTimeout(statusTimeoutRef);
    }
    
    const timeoutId = setTimeout(() => {
      setStatusMessage("");
    }, duration);
    
    setStatusTimeoutRef(timeoutId);
  }, [statusTimeoutRef]);

  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const saveQuizResponsesToDB = async (earnedPoints, correctCount, percentCorrect) => {
    try {
      showStatus("Saving quiz responses...");
      
      // Prepare quiz answers data
      const quizAnswers = questions.map((question, questionIndex) => ({
        questionId: `${courseKey}_${lessonNumber}_q${questionIndex + 1}`,
        selectedAnswer: question.options[selectedAnswers[questionIndex]] || "No answer selected",
        correct: selectedAnswers[questionIndex] === question.correctAnswerIndex
      }));
      
      // Prepare quiz attempt data - this matches your controller expectation
      const quizAttemptData = {
        attemptNumber: 1, // You might want to increment this based on existing attempts
        answers: quizAnswers,
        score: earnedPoints,
        total: maxPossiblePoints,
        submittedAt: new Date()
      };
      
      console.log('Saving quiz response data:', quizAttemptData);
      
      // Save to backend - send quizAttemptData directly since controller expects it in req.body
      // studentId comes from JWT token via authenticateToken middleware
      const saveResponse = await call_api(
        quizAttemptData, 
        `studentresponses/${courseKey}/lesson/${lessonNumber}/quiz`, 
        "POST"
      );
      
      if (saveResponse && saveResponse.success) {
        console.log('✅ Quiz responses saved to backend successfully');
        showStatus("✓ Quiz responses saved!");
        return true;
      } else {
        console.log('❌ Failed to save quiz responses to backend');
        showStatus("❌ Error saving quiz responses");
        return false;
      }
      
    } catch (error) {
      console.error('Error saving quiz responses:', error);
      showStatus("❌ Error saving quiz responses");
      return false;
    }
  };

// // Load quiz data from backend with dynamic grade
// useEffect(() => {
//   const fetchQuizFromBackend = async () => {
//     try {
//       // First, get the current user's grade
//       console.log("Step 1: Getting user info from auth/verify");
//       const userResponse = await call_api(null, "auth/verify", "POST");
//       console.log("Auth verify response:", userResponse);
      
//       if (!userResponse || !userResponse.user) {
//         console.error("Could not get user info");
//         return;
//       }

//       console.log("Step 2: Getting user details with ID:", userResponse.user.id);
//       // Get the full user details to access grade
//       const userDetailsResponse = await call_api(null, `users/id/${userResponse.user.id}`, "GET");
//       console.log("User details response:", userDetailsResponse);
      
//       if (!userDetailsResponse) {
//         console.error("Could not fetch user details");
//         return;
//       }
      
//       if (!userDetailsResponse.gradeLevel) {
//         console.error("User has no grade field. User object:", userDetailsResponse);
//         return;
//       }

//       const userGrade = userDetailsResponse.gradeLevel;
//       console.log(`Step 3: User grade found: ${userGrade}`);

//       // Now fetch quiz questions with dynamic grade
//       console.log(`Step 4: Fetching quiz questions for course: ${courseKey}, grade: ${userGrade}`);
//       const response = await call_api(null, `quizquestions?course_id=${courseKey}&grade=${userGrade}`, "GET");
//       console.log("Quiz API response:", response);
      
//       if (response && response.questions && response.questions.length > 0) {
//         console.log('Loaded questions from backend:', response.questions);
//         setQuestions(response.questions.map(q => ({
//           question: q.question,
//           options: q.options,
//           correctAnswerIndex: q.correctAnswerIndex,
//         })));
//         setTotal(response.questions.length);
//         // setQuizTitle(`${courseKey} Quiz - Grade ${userGrade}`);
//         setQuizTitle(`${capitalizeFirst(courseKey)} Quiz - Grade ${userGrade}`);

//       } else {
//         console.error("No questions found for this grade level");
//       }
//     } catch (err) {
//       console.error("Error fetching quiz questions:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchQuizFromBackend();
// }, [courseKey, lessonNumber]);

  // Get user's grade level (existing)
  useEffect(() => {
    const fetchUserGrade = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        
        const userResponse = await call_api(null, `users/id/${userId}`, "GET");
        if (userResponse?.gradeLevel) {
          setUserGrade(userResponse.gradeLevel);
        } else {
          setUserGrade(1);
          showStatus("Please update your grade level in your profile for personalized quizzes", 5000);
        }
      } catch (error) {
        console.error('Error fetching user grade:', error);
        setUserGrade(1);
      }
    };

    fetchUserGrade();
  }, [showStatus]);

  // // Load quiz data based on user's grade (existing)
  useEffect(() => {
    if (!userGrade) return;

    const loadQuizData = async () => {
      try {
        const quizFileMap = {
          'astronomy': 'astroquiz',
          'basicsOfCoding': 'bcquiz',
          'biochemistry': 'bioquiz',
          'chemistry': 'chemquiz',
          'circuits': 'circuitquiz',
          'environmentalScience': 'envsciquiz',
          'psychology': 'psycquiz',
          'statistics': 'statquiz',
          'zoology': 'zooquiz'
        };
        
        const quizPrefix = quizFileMap[courseKey] || 'quiz';
        
        let quizFile;
        if (userGrade >= 1 && userGrade <= 2) {
          quizFile = `/assets/${quizPrefix}-grade1-2.json`;
        } else if (userGrade >= 3 && userGrade <= 4) {
          quizFile = `/assets/${quizPrefix}-grade3-4.json`;
        } else if (userGrade >= 5 && userGrade <= 6) {
          quizFile = `/assets/${quizPrefix}-grade5-6.json`;
        } else {
          // Default fallback for grades outside 1-6 range
          quizFile = `/assets/${quizPrefix}-grade1-2.json`;
        }
        
        console.log(`Loading quiz from: ${quizFile} for grade ${userGrade}`);
        
        const response = await fetch(quizFile);
        
        if (!response.ok) {
          console.log(`Primary fetch failed: ${response.status} ${response.statusText}`);
          const fallbackResponse = await fetch(`/assets/${quizPrefix}.json`);
          if (!fallbackResponse.ok) {
            const otherGradeFile = userGrade <= 2 ? 
              `/assets/${quizPrefix}-grade5-6.json` : 
              `/assets/${quizPrefix}-grade1-2.json`;
            const lastResortResponse = await fetch(otherGradeFile);
            if (!lastResortResponse.ok) {
              throw new Error(`No quiz file found. Tried: ${quizFile}, /assets/${quizPrefix}.json, ${otherGradeFile}`);
            }
            const lastResortData = await lastResortResponse.json();
            processQuizData(lastResortData);
            return;
          }
          const fallbackData = await fallbackResponse.json();
          processQuizData(fallbackData);
          return;
        }
        
        const data = await response.json();
        processQuizData(data);
        
      } catch (error) {
        console.error('Error loading quiz data:', error);
        setQuizNotFound(true);
        setLoading(false);
      }
    };

    loadQuizData();
  }, [userGrade, courseKey]);

  // Process quiz data and calculate max possible points (existing)
  const processQuizData = (quizData) => {
    console.log('Quiz data loaded:', quizData);
    
    setQuestions(quizData.questions || []);
    setQuizTitle(quizData.title || 'Quiz');
    
    const maxPoints = (quizData.questions || []).reduce((total, question) => {
      return total + (question.score || 1);
    }, 0);
    
    setMaxPossiblePoints(maxPoints);
    console.log(`Max possible points: ${maxPoints}`);
  };

  // Fetch user progress data (existing)
  useEffect(() => {
    if (!userGrade) return;
    
    const fetchUserProgress = async () => {
      try {
        console.log('Fetching user progress data...');
        const response = await call_api(null, "points", "GET");
        
        if (response) {
          console.log('User progress data received:', JSON.stringify(response, null, 2));
          setUserProgress(response);
          
          if (response.courses && 
              response.courses[courseKey] && 
              response.courses[courseKey].lessons && 
              response.courses[courseKey].lessons[lessonNumber] && 
              response.courses[courseKey].lessons[lessonNumber].activities && 
              response.courses[courseKey].lessons[lessonNumber].activities.quiz) {
            
            const quizData = response.courses[courseKey].lessons[lessonNumber].activities.quiz;
            console.log('Existing quiz data found:', quizData);
            
            if (quizData.completed) {
              setPointsEarned(quizData.earned || 0);
              setCorrectAnswers(quizData.correctAnswers || 0);
              setPercentCorrect(quizData.percentCorrect || 0);
              
              if (showStatus) {
                showStatus(`Your best score: ${quizData.earned} points`, 5000);
              }
            }
          }
          
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching course progress:', err);
        setLoading(false);
      }
    };

    fetchUserProgress();
  }, [courseKey, lessonNumber, showStatus, userGrade]);

  // Handle answer selection (existing)
  const handleAnswerChange = (questionIndex, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex,
    });
  };

  // Calculate score and update points on quiz submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Calculate points earned using actual question weights
    let earnedPoints = 0;
    let correctCount = 0;
    
    questions.forEach((question, questionIndex) => {
      const isCorrect = selectedAnswers[questionIndex] === question.correctAnswerIndex;
      if (isCorrect) {
        correctCount++;
        earnedPoints += question.score || 1;
      }
    });
    
    const percentCorrect = Math.round((correctCount / questions.length) * 100);
    console.log(`Quiz results: ${correctCount}/${questions.length} correct (${percentCorrect}%)`);
    console.log(`Points earned: ${earnedPoints}/${maxPossiblePoints}`);
    
    setCorrectAnswers(correctCount);
    setPercentCorrect(percentCorrect);
    setPointsEarned(earnedPoints);
    setShowResults(true);

    await saveQuizResponsesToDB(earnedPoints, correctCount, percentCorrect);
    
    // 🆕 UPDATED: Report quiz failure to Physical Classroom system
    await reportQuizFailureToPhysicalClassroom(earnedPoints, correctCount, percentCorrect);
    
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
  
  // Update points in backend (existing)
  const updateBackend = async (earnedPoints, correctCount, percentCorrect) => {
    if (!userProgress) {
      console.error('No user progress data available. Cannot update backend.');
      return;
    }
    
    try {
      setSavingPoints(true);
      showStatus("Saving quiz results...");
      
      const updatedProgress = JSON.parse(JSON.stringify(userProgress));
      
      if (!updatedProgress.courses[courseKey]) {
        updatedProgress.courses[courseKey] = { 
          title: courseKey,
          coursePoints: 0, 
          completed: false,
          lessons: {}
        };
      }
      
      if (!updatedProgress.courses[courseKey].lessons[lessonNumber]) {
        updatedProgress.courses[courseKey].lessons[lessonNumber] = { 
          title: lessonNumber,
          lessonPoints: 0, 
          completed: false,
          activities: {} 
        };
      }
      
      if (!updatedProgress.courses[courseKey].lessons[lessonNumber].activities) {
        updatedProgress.courses[courseKey].lessons[lessonNumber].activities = {};
      }
      
      if (!updatedProgress.courses[courseKey].lessons[lessonNumber].activities.quiz) {
        updatedProgress.courses[courseKey].lessons[lessonNumber].activities.quiz = {
          title: quizTitle,
          type: "quiz",
          completed: false,
          points: maxPossiblePoints,
          extraPoints: 0,
          questionsCount: questions.length,
          correctAnswers: 0,
          percentCorrect: 0,
          earned: 0,
          isDynamic: true
        };
      }
      
      const quizData = updatedProgress.courses[courseKey].lessons[lessonNumber].activities.quiz;
      quizData.completed = true;
      quizData.correctAnswers = correctCount;
      quizData.percentCorrect = percentCorrect;
      quizData.earned = earnedPoints;
      quizData.questionsCount = questions.length;
      quizData.points = maxPossiblePoints;
      
      console.log(`Quiz completed: ${earnedPoints}/${maxPossiblePoints} points from ${questions.length} questions`);
      
      let lessonPoints = 0;
      const activities = updatedProgress.courses[courseKey].lessons[lessonNumber].activities;
      
      Object.keys(activities).forEach(activityKey => {
        const points = activities[activityKey].earned || 0;
        lessonPoints += points;
      });
      
      updatedProgress.courses[courseKey].lessons[lessonNumber].lessonPoints = lessonPoints;
      
      const videoComplete = updatedProgress.courses[courseKey].lessons[lessonNumber].activities.video?.completed || 
                        (updatedProgress.courses[courseKey].lessons[lessonNumber].activities.video?.percentWatched >= 95);
      
      updatedProgress.courses[courseKey].lessons[lessonNumber].completed = videoComplete;
      
      let coursePoints = 0;
      Object.values(updatedProgress.courses[courseKey].lessons).forEach(lesson => {
        coursePoints += lesson.lessonPoints || 0;
      });
      
      updatedProgress.courses[courseKey].coursePoints = coursePoints;
      
      let totalPoints = 0;
      Object.values(updatedProgress.courses).forEach(course => {
        totalPoints += course.coursePoints || 0;
      });
      
      updatedProgress.totalPoints = totalPoints;
      
      console.log('Updated progress to be sent to backend:', JSON.stringify(updatedProgress, null, 2));
      
      const response = await call_api(updatedProgress, "points", "POST");
      
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

  // 🆕 UPDATED: Report quiz failure to Physical Classroom system
  const reportQuizFailureToPhysicalClassroom = async (earnedPoints, correctCount, percentCorrect) => {
    // Only report if score is below 70% (can be adjusted)
    if (percentCorrect >= 70) {
      console.log(`Quiz passed with ${percentCorrect}%. No failure report needed.`);
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No auth token found. Cannot report quiz failure.');
        return;
      }
      
      const decoded = jwtDecode(token);
      const studentId = decoded.id;
      
      console.log(`Reporting quiz failure: ${percentCorrect}% on ${quizTitle}`);
      
      // 🆕 UPDATED: Use correct field names for Physical Classroom backend
      const failureData = {
        studentId: studentId,
        course: courseKey,           // ✅ Use 'course' not 'courseName'
        lesson: lessonNumber,        // ✅ Use 'lesson' not 'lessonNumber'  
        activityTitle: quizTitle,    // ✅ Use 'activityTitle' not 'quizTitle'
        score: earnedPoints,         // ✅ Add actual score
        maxScore: maxPossiblePoints  // ✅ Add max possible score
      };
      
      console.log('Physical Classroom quiz failure data:', failureData);
      
      // Send to Physical Classroom notification system
      const response = await call_api(failureData, 'notifications/quiz-failure', 'POST');
      
      if (response) {
        console.log('✅ Quiz failure reported to teachers successfully');
        showStatus("Teachers have been notified to provide additional help", 4000);
      } else {
        console.log('Quiz failure report sent but no response received');
      }
      
    } catch (error) {
      console.error('Error reporting quiz failure to Physical Classroom:', error);
      // Don't show error to student - this is background functionality
    }
  };
  
  // Cleanup on unmount (existing)
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

  if (quizNotFound) {
    return (
      <div className="quiz-container">
        <h2>Quiz Not Available</h2>
        <p>Sorry, the quiz for this course is not available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>{quizTitle}</h2>
      
      <div className="quiz-info">
        <p>Grade Level: {userGrade}</p>
        <p>Total Questions: {questions.length}</p>
        <p>Maximum Points: {maxPossiblePoints}</p>
      </div>
      
      {/* Previous best score banner (existing) */}
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
          </div>
        </div>
      )}
      
      {/* Status message notification (existing) */}
      {statusMessage && (
        <div className="status-notification" style={{
          position: 'fixed',
          top: '150px',
          right: '20px',
          padding: '10px 15px',
          backgroundColor: statusMessage.includes("Error") ? 'rgba(231, 76, 60, 0.8)' : 
                           statusMessage.includes("Teachers have been notified") ? 'rgba(255, 152, 0, 0.9)' : '#357717',
          color: 'white',
          borderRadius: '5px',
          fontWeight: 'bold',
          zIndex: 1000,
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          animation: 'fadeIn 0.3s ease-out',
          fontSize: '16px',
          maxWidth: '300px'
        }}>
          {statusMessage.includes("Teachers have been notified") && <span style={{ marginRight: '8px' }}>🎓</span>}
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
              <span className="result-value">{pointsEarned} out of {maxPossiblePoints} points</span>
            </div>
            {/* 🆕 Show if teachers were notified */}
            {percentCorrect < 70 && (
              <div className="result-row" style={{ 
                marginTop: '10px', 
                padding: '8px', 
                backgroundColor: '#fff3cd', 
                border: '1px solid #ffeaa7',
                borderRadius: '4px',
                fontSize: '14px'
              }}>
                <span style={{ color: '#856404' }}>
                  🎓 Your teachers have been notified to provide additional help with this topic.
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {questions.length > 0 ? (
        <form onSubmit={handleSubmit}>
          {questions.map((q, questionIndex) => (
            <div key={questionIndex} className="quiz-question">
              <p>
                <strong>Question {questionIndex + 1}</strong> ({q.score || 1} point{(q.score || 1) > 1 ? 's' : ''})
              </p>
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
              Submit Quiz
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
  courseKey: PropTypes.string.isRequired,
  lessonNumber: PropTypes.string.isRequired
};

export default Quiz;