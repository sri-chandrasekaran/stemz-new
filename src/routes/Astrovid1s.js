// import React from 'react'
// import Navbar from '../components/Navbar'
// import HeroOther from '../components/HeroOther'
// import Footer from '../components/Footer'
// import { Link } from 'react-router-dom';
// import './allvideo.css';

// const Astrovid1s = () => {
//   return (
//     <div>
//       <Navbar/>
//       <HeroOther overlayText="Lesson 1: The Solar System"/>
//       <div className='vidbig'>
//         <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/vy2NuP1ITFo" frameborder="0" allowfullscreen></iframe>
//       </div>
//       <div className='centered-container'>
//         <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSHCaacBter5Vp_LpWpW8qmNphqR4CZdmyFp9OIRzzuvveXNrmg-iTwFLOcsIdQMDazL6KyxAfk9ftU/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
//           <button className="course-button">Slideshow</button>
//         </Link>
//         <Link to="https://docs.google.com/document/d/e/2PACX-1vRIOzhgRMh-YFQLCwSmjrLXnVwfZ-nZw5S_M9hUrbxKiZIJ6E4PEIbUx_YySRCVuEmlotLtCuV1qGK8/pub" target="_blank" rel="noopener noreferrer">
//           <button className="course-button">Worksheet</button>
//         </Link>
//         <Link to="https://docs.google.com/document/d/e/2PACX-1vRvLzrRtS52Gup_N7UbX3YdJN9DBAhImvR8jqu8yKo7Fwt2pY0UoOfxJlkt2HJKKrA1M3-L-KHihTpF/pub" target="_blank" rel="noopener noreferrer">
//           <button className="course-button">Student Notes</button>
//         </Link>
//       </div>
//       <div style={{ paddingBottom: '200px' }} />
                  
//       <Footer/>
//     </div>
//   )
// }

// export default Astrovid1s

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import './allvideo.css';

const questions = [
  { time: 224, text: "What is your favorite planet and why? Tell me one fact about it." },
  { time: 440, text: "What can the study of stars teach us about the universe?" },
  { time: 688, text: "In what ways is Earth the same as the other planets? In what ways is it unique?" },
  { time: 765, text: "What can the study of stars teach us about the universe?" },
  { time: 876, text: "Can you summarize the key points of today's lesson?" }
];

const Astrovid1s = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [answer, setAnswer] = useState("");
  const [player, setPlayer] = useState(null);
  const [timeouts, setTimeouts] = useState([]);

  useEffect(() => {
    // Load YouTube IFrame API
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.onYouTubeIframeAPIReady = () => {
        const playerInstance = new window.YT.Player('astrovid', {
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
        setPlayer(playerInstance);
      };
    };

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [timeouts]);

  const onPlayerReady = (event) => {
    event.target.playVideo();
    scheduleNextQuestion(event.target, currentQuestionIndex);
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING && !showQuestion) {
      scheduleNextQuestion(event.target, currentQuestionIndex);
    }
  };

  const scheduleNextQuestion = (playerInstance, questionIndex) => {
    if (questionIndex >= questions.length) return;

    const currentTime = playerInstance.getCurrentTime();
    const timeUntilNextQuestion = (questions[questionIndex].time - currentTime) * 1000;

    if (timeUntilNextQuestion > 0) {
      const timeout = setTimeout(() => {
        playerInstance.pauseVideo();
        setShowQuestion(true);
      }, timeUntilNextQuestion);

      setTimeouts(prev => [...prev, timeout]);
    }
  };

  const handleAnswerSubmit = () => {
    setShowQuestion(false);
    setAnswer("");

    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      if (player) {
        player.playVideo();
        scheduleNextQuestion(player, nextQuestionIndex);
      }
    } else {
      if (player) {
        player.playVideo();
      }
    }
  };

  return (
    <div>
      <Navbar />
      <HeroOther overlayText="Lesson 1: The Solar System" />
      <div className='vidbig'>
        <iframe
          id='astrovid'
          className='astrovid'
          width="700"
          height="480"
          src="https://www.youtube.com/embed/vy2NuP1ITFo?enablejsapi=1"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      {showQuestion && (
        <div className="question-overlay">
          <div className="question">
            <p>{questions[currentQuestionIndex].text}</p>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here"
              className="expanding-textarea"
            />
            <button onClick={handleAnswerSubmit}>Submit</button>
          </div>
        </div>
      )}
      <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vSHCaacBter5Vp_LpWpW8qmNphqR4CZdmyFp9OIRzzuvveXNrmg-iTwFLOcsIdQMDazL6KyxAfk9ftU/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Slideshow</button>
        </Link>
        <Link to="https://docs.google.com/document/d/e/2PACX-1vRIOzhgRMh-YFQLCwSmjrLXnVwfZ-nZw5S_M9hUrbxKiZIJ6E4PEIbUx_YySRCVuEmlotLtCuV1qGK8/pub" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Worksheet</button>
        </Link>
        <Link to="https://docs.google.com/document/d/e/2PACX-1vRvLzrRtS52Gup_N7UbX3YdJN9DBAhImvR8jqu8yKo7Fwt2pY0UoOfxJlkt2HJKKrA1M3-L-KHihTpF/pub" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Student Notes</button>
        </Link>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer />
    </div>
  );
}

export default Astrovid1s;
