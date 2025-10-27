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
            <Link to="https://forms.gle/EGUMu61zX2e74fGt9" target="_blank" rel="noopener noreferrer">
                <button className="cta-button">Apply</button>
            </Link>
        </div>
        <div className='card'>
            {/* <img src={organizations} alt="Organizations" className="card-image"/> */}
            <h3>Building the Teacher Analytics Platform</h3>
            <span className='bar'></span>
            <p>We are building a tool for teachers to monitor their students' qualitative metrics, engagement, and cognitive skills. Join our early access list!</p>
            {/* <Link to="/get-involved" onClick={scrollToTop}>
                <button className="cta-button involved-button">Get Involved</button>
            </Link> */}
            <Link to="https://airtable.com/apphYpekX3PY52RJM/pagIDkCOGCJxrpDDC/form" target="_blank" rel="noopener noreferrer">
                <button className="cta-button">Join</button>
            </Link>
        </div>
    </div>
  )
}

export default Cards
