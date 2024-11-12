import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './css/allvideo.css';

const Astrovid4s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 4: The Universe"/>
      <div className='vidbig'>
      <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/ImEEVWosix4" frameborder="0" allowfullscreen></iframe>
      </div>
      <div className='centered-container'>
      <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRBR7LWZPQEuS4askp8IyxBgOsIoMZjNXB7vDqIHp3DHQYdL_tbrTz49ufdA47Piq_n82wiLyTTAMJm/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
        <button className="course-button">Slideshow</button>
      </Link>
      <Link to="https://docs.google.com/document/d/e/2PACX-1vRLucP73Qzt0xNM3WWG-MZOBvc07qHmKH6_5IUODTfrDzVwT3x9kenz5DdEr0okM3805Z7YMTTU2Z6I/pub" target="_blank" rel="noopener noreferrer">
        <button className="course-button">Student Notes</button>
      </Link>
      <Link to="/astroquiz" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Quiz</button>
        </Link>
      </div>
      <div style={{ paddingBottom: '200px' }} />
                  
      <Footer/>
    </div>
  )
}

export default Astrovid4s


// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import HeroOther from '../components/HeroOther';
// import Footer from '../components/Footer';
// import { Link } from 'react-router-dom';
// import './allvideo.css';

// const questions = [
//   { time: 34, text: "How big is our universe?" },
//   { time: 138, text: "How do we know dark matter and energy exist if we can’t see them?" },
//   { time: 170, text: "What are some of the biggest unanswered questions in astronomy today?" },
//   { time: 192, text: "Why is it important to study astronomy? What do we gain from exploring space?" },
//   { time: 244, text: "Can you summarize the key points of today's lesson?" }
// ];

// const Astrovid1s = () => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [showQuestion, setShowQuestion] = useState(false);
//   const [answer, setAnswer] = useState("");
//   const [player, setPlayer] = useState(null);
//   const [timeouts, setTimeouts] = useState([]);

//   useEffect(() => {
//     // Load YouTube IFrame API
//     const script = document.createElement("script");
//     script.src = "https://www.youtube.com/iframe_api";
//     script.async = true;
//     document.body.appendChild(script);

//     script.onload = () => {
//       window.onYouTubeIframeAPIReady = () => {
//         const playerInstance = new window.YT.Player('astrovid', {
//           events: {
//             'onReady': onPlayerReady,
//             'onStateChange': onPlayerStateChange
//           }
//         });
//         setPlayer(playerInstance);
//       };
//     };

//     return () => {
//       timeouts.forEach(timeout => clearTimeout(timeout));
//     };
//   }, [timeouts]);

//   const onPlayerReady = (event) => {
//     event.target.playVideo();
//     scheduleNextQuestion(event.target, currentQuestionIndex);
//   };

//   const onPlayerStateChange = (event) => {
//     if (event.data === window.YT.PlayerState.PLAYING && !showQuestion) {
//       scheduleNextQuestion(event.target, currentQuestionIndex);
//     }
//   };

//   const scheduleNextQuestion = (playerInstance, questionIndex) => {
//     if (questionIndex >= questions.length) return;

//     const currentTime = playerInstance.getCurrentTime();
//     const timeUntilNextQuestion = (questions[questionIndex].time - currentTime) * 1000;

//     if (timeUntilNextQuestion > 0) {
//       const timeout = setTimeout(() => {
//         playerInstance.pauseVideo();
//         setShowQuestion(true);
//       }, timeUntilNextQuestion);

//       setTimeouts(prev => [...prev, timeout]);
//     }
//   };

//   const handleAnswerSubmit = () => {
//     setShowQuestion(false);
//     setAnswer("");

//     const nextQuestionIndex = currentQuestionIndex + 1;

//     if (nextQuestionIndex < questions.length) {
//       setCurrentQuestionIndex(nextQuestionIndex);
//       if (player) {
//         player.playVideo();
//         scheduleNextQuestion(player, nextQuestionIndex);
//       }
//     } else {
//       if (player) {
//         player.playVideo();
//       }
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <HeroOther overlayText="Lesson 4: The Universe" />
//       <div className='vidbig'>
//         <iframe
//           id='astrovid'
//           className='astrovid'
//           width="700"
//           height="480"
//           src="https://www.youtube.com/embed/ImEEVWosix4"
//           frameBorder="0"
//           allowFullScreen
//         ></iframe>
//       </div>
//       {showQuestion && (
//         <div className="question-overlay">
//           <div className="question">
//             <p>{questions[currentQuestionIndex].text}</p>
//             <textarea
//               value={answer}
//               onChange={(e) => setAnswer(e.target.value)}
//               placeholder="Type your answer here"
//               className="expanding-textarea"
//             />
//             <button onClick={handleAnswerSubmit}>Submit</button>
//           </div>
//         </div>
//       )}
//       <div className='centered-container'>
//       <Link to="https://docs.google.com/presentation/d/e/2PACX-1vRBR7LWZPQEuS4askp8IyxBgOsIoMZjNXB7vDqIHp3DHQYdL_tbrTz49ufdA47Piq_n82wiLyTTAMJm/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
//         <button className="course-button">Slideshow</button>
//       </Link>
//       <Link to="https://docs.google.com/document/d/e/2PACX-1vRLucP73Qzt0xNM3WWG-MZOBvc07qHmKH6_5IUODTfrDzVwT3x9kenz5DdEr0okM3805Z7YMTTU2Z6I/pub" target="_blank" rel="noopener noreferrer">
//         <button className="course-button">Student Notes</button>
//       </Link>
//       <Link to="/self-paced-classes/astronomy/astroquiz" target="_blank" rel="noopener noreferrer">
//           <button className="course-button">Quiz</button>
//         </Link>
//       </div>
//       <div style={{ paddingBottom: '200px' }} />
//       <Footer />
//     </div>
//   );
// }

// export default Astrovid1s;
