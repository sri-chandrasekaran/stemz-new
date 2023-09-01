import React from 'react'
import './Cards.css'
import {Link} from 'react-router-dom'
// import {Link} from 'react-router-dom';
// import developing from '../assets/developing.png'
// import volunteers from '../assets/volunteers.png'
// import organizations from '../assets/organizations.png'

const Cards = () => {

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    }
  return (
    <div className='card-container'>
        <div className='card'>
            {/* <img src={developing} alt="Developing Curriculum" className="card-image"/> */}
            <h3>Developing Courses</h3>
            <span className='bar'></span>
            <p>We are constantly creating and improving our curriculum so that your child always has new and exciting things to learn about.</p>
            <Link to="/contact" onClick={scrollToTop}>
                <button className="cta-button courses-button">Request a Course</button>
            </Link>
        </div>
        <div className='card'>
            {/* <img src={volunteers} alt="Volunteers" className="card-image"/> */}
            <h3>Recruiting Dedicated Volunteers</h3>
            <span className='bar'></span>
            <p>We are recruiting hard-working high-school and college level students to teach STEM topics to elementary school students and develop our curriculum! Use the link below to apply.</p>
            <Link to="https://docs.google.com/forms/d/e/1FAIpQLSe3SXzeHYakAGscITjV7NnBBU6u4n_RHkUVHZrMgRKGYmGHvQ/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">
                <button className="cta-button">Apply</button>
            </Link>
        </div>
        <div className='card'>
            {/* <img src={organizations} alt="Organizations" className="card-image"/> */}
            <h3>Connecting with Local Community Organizations</h3>
            <span className='bar'></span>
            <p>We are reaching out to local elementary schools and community programs to host in-person events.</p>
            <Link to="/get-involved" onClick={scrollToTop}>
                <button className="cta-button involved-button">Get Involved</button>
            </Link>
        </div>
    </div>
  )
}

export default Cards
