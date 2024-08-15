import React from 'react';
import './GetInvolved.css';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Footer from '../components/Footer';
import {Link} from 'react-router-dom';

const GetInvolved = () => {
  return (
    <div>
      <Navbar />
      <HeroOther overlayText="Get Involved" />
      <div className='boxes-container'>
        <div className='rectangular-box'>
            <h1>Volunteers</h1>
            <p>We are recruiting hard-working high-school and college level 
                students to teach STEM topics to elementary school students and 
                develop our curriculum! Use the link below to apply.</p>
            <Link to="./volunteers" target="_blank" rel="noopener noreferrer">
                <button className="box-button">Learn More</button>
            </Link>
        </div>
        <div className='rectangular-box'>
            <h1>Parents</h1>
            <p>Members get emails whenever we have a new course available. 
                Additionally, members are able to sign up for classes before 
                everyone else. Membership is completely free! Fill out the form
                to the left and become a member today!</p>
            <Link to="https://substack.com/@stemzlearning" target="_blank" rel="noopener noreferrer">
                <button className="box-button">Become a Member</button>
            </Link>
        </div>
        <div className='rectangular-box'>
            <h1>Schools</h1>
            <p>Contact us to inquire about us hosting an after-school program at your elementary school. 
                The after school program would consist of our in person courses, and we will provide the materials.
                High school students, please contact us about starting a STEMz Learning chapter at your school 
                to increase outreach in your area.</p>
            <Link to="mailto:info@stemzlearning.org" target="_blank" rel="noopener noreferrer">
                <button className="box-button" style={{marginTop: '14px'}}>Email Us</button>
            </Link>
        </div>
        <div className='rectangular-box'>
            <h1>Donate</h1>
            <p>Our program teaches students through experimentation. Unfortunately, experiments cost money. 
                We want to keep our classes free and donations help us buy materials for our in person classes.</p>
            <Link to="https://www.paypal.com/donate?hosted_button_id=8DW4JTSCNYKF4" target="_blank" rel="noopener noreferrer">
                <button className="box-button paypal-button">Paypal</button>
            </Link>
            <Link to="https://venmo.com/u/stemzlearning" target="_blank" rel="noopener noreferrer">
                <button className="box-button venmo-button">Venmo</button>
            </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '120px' }}></div>
      <Footer />
    </div>
  )
}

export default GetInvolved
