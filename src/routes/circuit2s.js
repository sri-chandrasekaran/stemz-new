import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './css/allvideo.css';

const circuit1s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 2: More Circuit Board Tools"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/pK9h_Ts3gWw" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
          <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTswf_-q8sb9x-TCJ7FXOx6-6XzmwGh_ZZgQRG_0PZ-jRT4mP4bqqHxj9uw6TNLZjFsegpcjJSbxU0C/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Slideshow</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vS6aaf7VWcTHS1_-J4piwOqYitXUt2VWGxx09q33D1DXAcpC7CWw-TTqCvHlpynJu2XyAYAnqc-VOpS/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Worksheet</button>
          </Link>
          <Link to="https://docs.google.com/document/d/e/2PACX-1vQUW5I_4w3lys_aRBmbtFRDuM76orRlvLAob-rVoQHGyNBqu11iu6DQZGh109dIEQEQ1nlYvHsjuhlI/pub" target="_blank" rel="noopener noreferrer">
            <button className="course-button">Student Notes</button>
          </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default circuit1s
