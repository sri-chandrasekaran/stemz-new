import React, { useState, useEffect } from 'react';
import './OnlineClasses.css';
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import PhotoCarousel from '../components/PhotoCarousel';
import Physics from '../assets/physics.jpeg'
import { Link } from 'react-router-dom';

function OnlineClasses() {
  const [showForm, setShowForm] = useState(false);

  const show = () => {
    console.log("show")
    setShowForm(true);
  }
  //function showForm() {
    //console.log("called")
    //return <p>hi</p>
    {/*<form class = 'reg_form' id = "reg_form">
    <label for="name">Student name:</label>
    <input type="text" id="student name" name="student name"></input><br></br>
    <label for="email">Parent/Guardian email:</label>
    <input type="email" id="email" name="email"></input><br></br>
    <label for ="text"> By selecting yes and signing bellow, I am giving STEMz Learning permission to take and distribute photographs with my child in them. I understand that the photos may show up on STEMz Learning advertising, website, and social media.</label>
    <label>
      <input type="radio" name="yes_no" checked />
      &nbsp; Yes
    </label>
    <label>
      <input type="radio" name="yes_no"></input>
      &nbsp; No
    </label>
    <label for="email">Parent signature:</label>
    <input type="name" id="parent name" name="parent name"></input><br></br>
  </form>*/}
  //}
  return (
    <div>
        <Navbar />
        <HeroOther overlayText="Online Classes"/>
        <div className='main-online'>
          <h3>Sign Up for Classes!</h3>
          {/* <div className="photo-carousel-container">
            <PhotoCarousel />
          </div> */}
        </div>
        <div className='course-listing'>
        <img src={Physics} alt="Genetics" className="class-img"/>
        <div className='class-description'>
          <h1>Physics</h1>
          <h2>When: 3/25 - 3/28, every day from 10 - 11 AM</h2>
          <h2>Recommended Grade Level: 3rd - 5th Grade</h2>
          <h2>In this course, we’ll be diving into various laws, mechanics and more!</h2>
          {/*<Link to="https://forms.gle/TRN6ki17LPzjMuAXA" target="_blank" rel="noopener noreferrer">*/}
          <button className="class-button" onClick = {show}>Register</button>
          {/*</Link>*/}
          {showForm && <form className = 'reg_form' id = "reg_form">
          <label htmlFor="student name">Student name:</label>
          <input type="text" id="student name" name="student name"></input><br></br>
          <label htmlFor="email">Parent/Guardian email:</label>
          <input type="email" id="email" name="email"></input><br></br>
          By selecting yes and signing bellow, I am giving STEMz Learning permission to take and distribute photographs with my child in them. I understand that the photos may show up on STEMz Learning advertising, website, and social media.
          <label>
          <input type="radio" name="yes_no"/>
          &nbsp; Yes
          </label>
          <label>
          <input type="radio" name="yes_no"></input>
          &nbsp; No
          </label>
          <label htmlFor="parent name">Parent signature:</label>
          <input type="name" id="parent name" name="parent name"></input><br></br>
          </form>}
        </div>
        </div>
        <div style={{ paddingBottom: '230px' }} />
        <Footer />
    </div>
  )
}

export default OnlineClasses
