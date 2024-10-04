import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './css/allvideo.css';

const Astrovid3s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 3: Space and Humans"/>
      <div className='vidbig'>
      <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/v4pT0yllkO0" frameborder="0" allowfullscreen></iframe>
      </div>
      <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vS_xvppSffjBQYinMkvctQfRa5v4oC0AtkGn54254erImV0xHnQi1fWvVEL-VSxDFK_M-KPCsOa4IDy/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Slideshow</button>
        </Link>
        <Link to="/self-paced-classes/astronomy/astrostarmap"> {/* Navigate to AstroStarMap */}
          <button className="course-button">Worksheet</button>
        </Link>
        <Link to="https://docs.google.com/document/d/e/2PACX-1vRJxZ8cM1W83Zu7f_WpP_jzGS5Cb_uPZMH-pUVKVn5rfyUyjOBTu9HFf3HWvdcRlha0tdgHwR9p7e1q/pub" target="_blank" rel="noopener noreferrer">
          <button className="course-button">Student Notes</button>
        </Link>
      </div>
      <div style={{ paddingBottom: '200px' }} />
                  
      <Footer/>
    </div>
  )
}

export default Astrovid3s


// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import HeroOther from '../components/HeroOther';
// import Footer from '../components/Footer';
// import { Link } from 'react-router-dom';
// import './allvideo.css';

// const questions = [
//   { time: 25, text: "Do you know who Nicolaus Copernicus was and what he did?" },
//   { time: 58, text: "Do you know who Isaac Newton was and what he did?" },
//   { time: 220, text: "How have astronomers used technology to study the universe?" },
//   { time: 560, text: "What are some benefits of humans exploring space? What are some consequences?" },
//   { time: 694, text: "Can you summarize the key points of today's lesson?" }
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
//       <HeroOther overlayText="Lesson 3: Space and Humans" />
//       <div className='vidbig'>
//         <iframe
//           id='astrovid'
//           className='astrovid'
//           width="700"
//           height="480"
//           src="https://www.youtube.com/embed/v4pT0yllkO0"
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
//         <div className='centered-container'>
//         <Link to="https://docs.google.com/presentation/d/e/2PACX-1vS_xvppSffjBQYinMkvctQfRa5v4oC0AtkGn54254erImV0xHnQi1fWvVEL-VSxDFK_M-KPCsOa4IDy/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
//           <button className="course-button">Slideshow</button>
//         </Link>
//         <Link to="https://docs.google.com/document/d/e/2PACX-1vRzjSp4DciyO8OjCR_k_nf_4_cbGIzLCWkt7mRAHScRbpH_lqS5D_Q3hvxnseVt6P0KvVcKnSnSNEMe/pub" target="_blank" rel="noopener noreferrer">
//           <button className="course-button">Worksheet</button>
//         </Link>
//         <Link to="https://docs.google.com/document/d/e/2PACX-1vRJxZ8cM1W83Zu7f_WpP_jzGS5Cb_uPZMH-pUVKVn5rfyUyjOBTu9HFf3HWvdcRlha0tdgHwR9p7e1q/pub" target="_blank" rel="noopener noreferrer">
//           <button className="course-button">Student Notes</button>
//         </Link>
//       </div>
//       <div style={{ paddingBottom: '200px' }} />
//       <Footer />
//     </div>
//   );
// }

// export default Astrovid1s;
