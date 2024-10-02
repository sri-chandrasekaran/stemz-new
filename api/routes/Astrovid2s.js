import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './css/allvideo.css';

const Astrovid2s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 2: Galaxies"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/0MG58dFzUkU" frameborder="0" allowfullscreen></iframe>
      </div>
      <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSgXqu9vIHDXjitX678G5HqDLyv-MOHxLOEB5kgoNLv5Uf8JinGBASHGVzB7fp7gqUM_iW9E7jClUu7/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Slideshow</button>
        </Link>
        <Link to="https://docs.google.com/document/d/e/2PACX-1vRKnZALs45B6cuCMLoV_o8TjaUZ6wSllEgIuOo6nxUdpHzNmisWkI1YV79X5QPuS5c1PBIwx8mnP8OH/pub" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Student Notes</button>
        </Link>
      </div>
      <div style={{ paddingBottom: '200px' }} />
                  
      <Footer/>
    </div>
  )
}

export default Astrovid2s


// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import HeroOther from '../components/HeroOther';
// import Footer from '../components/Footer';
// import { Link } from 'react-router-dom';
// import './allvideo.css';

// const questions = [
//   { time: 226, text: "What are black holes, and why are they important to our understanding of the universe?" },
//   { time: 389, text: "What do you think happens to a human approaching a black hole?" },
//   { time: 581, text: "What can you tell me about the life cycle of a star?" },
//   { time: 861, text: "What roles do gravity play in galaxies?" },
//   { time: 942, text: "Can you summarize the key points of today's lesson?" }
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
//       <HeroOther overlayText="Lesson 2: Galaxies" />
//       <div className='vidbig'>
//         <iframe
//           id='astrovid'
//           className='astrovid'
//           width="700"
//           height="480"
//           src="https://www.youtube.com/embed/0MG58dFzUkU"
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
//         <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSgXqu9vIHDXjitX678G5HqDLyv-MOHxLOEB5kgoNLv5Uf8JinGBASHGVzB7fp7gqUM_iW9E7jClUu7/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
//           <button className="course-button">Slideshow</button>
//         </Link>
//         <Link to="https://docs.google.com/document/d/e/2PACX-1vRKnZALs45B6cuCMLoV_o8TjaUZ6wSllEgIuOo6nxUdpHzNmisWkI1YV79X5QPuS5c1PBIwx8mnP8OH/pub" target="_blank" rel="noopener noreferrer">
//           <button className="course-button">Student Notes</button>
//         </Link>
//       </div>
//       <div style={{ paddingBottom: '200px' }} />
//       <Footer />
//     </div>
//   );
// }

// export default Astrovid1s;
