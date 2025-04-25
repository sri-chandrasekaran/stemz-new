import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../../components/Navbar';
import HeroOther from '../../components/HeroOther';
import Footer from '../../components/Footer';
import ucla from '../../assets/ucla.png';
import ucr from '../../assets/ucr1.png';
import stanford from '../../assets/stanford1.png';
import berkeley from '../../assets/berkeley1.png';
import ucsd from '../../assets/ucsd1.png'
import flc from '../../assets/flc1.png';

import '../css/GetInvolved.css';
import '../css/volunteer.css';
import '../css/About.css';

const Volunteers = () => {
  console.log("Volunteers component rendered");
  return (
    <div>
      <Navbar />
      <HeroOther overlayText="Volunteers" />
      <div className="volunteer-info">
        <h2 className="volunteer-text">
          We are recruiting hard-working high-school and college level students 
          <br/>
          to grow our organization and make an impact in our community!
        </h2>
        <br/>
        <ul className="volunteer-benefits">
          <li>Service and Commitment: Help contribute to your community</li>
          <li>President's Volunteer Service Award</li>
          <li>Skill Development: Gain leadership experience and grow as an individual</li>
          <li>Mentorship: Connect with other volunteers and participate in our mentorship program for high school and early college students </li>
        </ul>
        <br/>
        <br/>
        <br/>
        <h1>What our volunteers do?</h1>
        <div className="box-container">
          <div className='rectangular-box'>
              <h1>Curriculum Developers & Teachers</h1>
              <p>We are recruiting hard-working high-school and college level 
                  students to develop curriculum for use in our synchronous and asynchronous courses and 
                  teach synchronous and asynchronous virtual and in person courses. Apply below.</p>
              <Link to="https://docs.google.com/forms/d/e/1FAIpQLScBsZIUixxNEQKqWpDcev9XXRO6QBYkAjyqbF5iv1vXD6GjFA/viewform" target="_blank" rel="noopener noreferrer">
                  <button className="box-button">Apply Now</button>
              </Link>
          </div>
          <div className='rectangular-box'>
              <h1>Software Engineers</h1>
              <p>We are actively recruiting college-level students and professionals to join our engineering team. If you're interested in building software and making a difference in the education field, send us an email with your resume and why you're a good fit.</p>
              <Link to="mailto:stemzlearning@stemzlearning.org" target="_blank" rel="noopener noreferrer">
                  <button className="box-button">Apply Now</button>
              </Link>
          </div>
          <div className='rectangular-box'>
              <h1>Analysts</h1>
              <p>We are recruiting college-level students and professionals to join our team as Business and Marketing Analysts. If your interested in market research and data analysis, send us an email with your resume and why you're a good fit. </p>
              <Link to="mailto:stemzlearning@stemzlearning.org" target="_blank" rel="noopener noreferrer">
                  <button className="box-button">Apply Now</button>
              </Link>
          </div>
          <div className='rectangular-box'>
              <h1>Other Roles</h1>
              <p>We are always looking for volunteers with ideas for improvement of our organization to fill community needs. If you are interested in roles or projects that are not listed on this page, please feel free to contact us with your proposal!</p>
              <Link to="mailto:stemzlearning@stemzlearning.org" target="_blank" rel="noopener noreferrer">
                  <button className="box-button">Contact Us</button>
              </Link>
          </div>
        </div>
        {/* <div className="apply-button-container">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScBsZIUixxNEQKqWpDcev9XXRO6QBYkAjyqbF5iv1vXD6GjFA/viewform" target="_blank" rel="noopener noreferrer">
            <button className="apply-button">Apply Now</button>
          </a>
        </div> */}
      </div>

      <div className="college-logos-section">
        <h2>Where Our Volunteers Go</h2>
        <div className="college-logos">
          <img src={ucla} alt="College Logo" className="college-logo" />
          <img src={ucr} alt="College Logo" className="college-logo" />
          <img src={stanford} alt="College Logo" className="college-logo" />
        </div>
        <div className="college-logos">
          <img src={berkeley} alt="College Logo" className="college-logo" />
          <img src={ucsd} alt="College Logo" className="college-logo" />
          <img src={flc} alt="College Logo" className="college-logo" />
        </div>
      </div>
      <div style={{ paddingBottom: '120px' }} />
      <Footer />
    </div>
  );
}

export default Volunteers;