import React from 'react'
import './News.css'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import {Link} from 'react-router-dom'
import Class8 from '../assets/class_8.PNG'
import Class7 from '../assets/class_7.jpg'


const News = () => {

  const scrollToTop = () => {
    window.scrollTo(0, 0);
}

  return (
    <div>
        <Navbar />
        <HeroOther overlayText="News"/>


        <div className='news-container'>
          <div className='news-item'>
          <img src={Class7} alt="Class1" className="class-img"/>
          <h3 className='content-header'>September 2023: Summer Recap & More!</h3>
          <Link to="/news/september" onClick={scrollToTop}>
                  <button className="cta-button">Read More!</button>
          </Link>
          </div>
          <div className='news-item'>
          <img src={Class8} alt="Class1" className="class-img"/>
            <h3 className='content-header'>March 2023: Exciting Classes to Come!</h3>
            <Link to="/news/march" onClick={scrollToTop}>
                  <button className="cta-button">Read More!</button>
            </Link>
        </div>
        </div>
        <div style={{ paddingBottom: '150px' }} />
        <Footer />
    </div>
  )
}

export default News
