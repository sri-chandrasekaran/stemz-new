import React from 'react'
import './News.css'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import {Link} from 'react-router-dom'
import Class1 from '../assets/class_1.png'

const News = () => {
  return (
    <div>
        <Navbar />
        <HeroOther overlayText="News"/>
        <div className='two-row'>
        <img src={Class1} alt="Class1" className="class-img"/>
        <h3 className='content-header'>March 2023: Exciting Classes to Come!</h3>
        <Link to="/news/march">
                <button className="cta-button">Read More!</button>
        </Link>
        </div>
        <div className='other-row'>
        <img src={Class1} alt="Class1" className="class-img"/>
        <h3 className='content-header'>September 2023: Summer Recap & More!</h3>
        <Link to="/news/march">
                <button className="cta-button">Read More!</button>
        </Link>
        </div>
        <div style={{ paddingBottom: '150px' }} />
        <Footer />
    </div>
  )
}

export default News
