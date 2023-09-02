import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const es1s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 5: Anatomy & Physiology"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/ga7BP8zSDMg" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTdHJsVlLgvbQVEjVLWcEgWSbmOx0PCNNTky_exihuMUrmrgj72S5thj3rdtvtdFv2GKV_jzzc-o6GF/pub?start=false&loop=false&delayms=3000&slide=id.gdd06c6ef78_0_62" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vR0TrMrFGWRMoR-_CYo55k07iRZMU9hnCzqFWWqURjuzFkcntahNQ-MaexbuOlXA6rZrmu4FNpo26NW/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default es1s
