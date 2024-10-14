import React, { useState, useEffect } from 'react';
import './Navbar.css';
import {FaBars, FaTimes} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import axios from "axios";

const Navbar = () => {
    const [check, setCheck] = useState(null);
    const [click, setClick] = useState(false);
    const [color, setColor] = useState(false);
  
    const handleClick = () => setClick((prevState) => !prevState);
  
    const changeColor = () => {
      if (window.scrollY >= 45) {
        setColor(true);
      } else {
        setColor(false);
      }
    };
  
    window.addEventListener('scroll', changeColor);
  
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    const updateDashboard = () => {
        window.location.href = '/dashboard';
    };

    const updateOnline = () => {
        window.location.href = '/online-classes';
    };
  
    if (check === null) {
      axios
        .get('https://www.stemzlearning.org/dashboard', {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.success) {
            setCheck(true);
          } else {
            setCheck(false);
          }
        })
        .catch(() => {
          setCheck(false);
        });
  
      return null; // Render nothing while fetching data
    }
  
    return (
        <div className={color ? 'header header-bg' : 'header'}>
            <Link to='/'>
                <img src={logo} alt="STEMz Learning" className="logo"/>
            </Link>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li>
                    <Link to='/' onClick={scrollToTop}>Home</Link>
                </li>
                <li>
                    <Link to='/about-us' onClick={scrollToTop}>About Us</Link>
                </li>
                <li>
                    <Link to='/online-classes' onClick={updateOnline}>Online Classes</Link>
                </li>
                <li>
                    <Link to='/self-paced-classes' onClick={scrollToTop}>Self-Paced Classes</Link>
                    <ul className="dropdown-menu">
                        <li>
                            <Link to="/self-paced-classes/astronomy" onClick={scrollToTop}>Astronomy</Link>
                        </li>
                        <li>
                            <Link to="/self-paced-classes/basics-of-coding" onClick={scrollToTop}>Basics of Coding</Link>
                        </li>
                        <li>
                            <Link to="/self-paced-classes/biochemistry" onClick={scrollToTop}>Biochemistry</Link>
                        </li>
                        <li>
                            <Link to="/self-paced-classes/chemistry" onClick={scrollToTop}>Chemistry</Link>
                        </li>
                        <li>
                            <Link to="/self-paced-classes/circuits" onClick={scrollToTop}>Circuits</Link>
                        </li>
                        <li>
                            <Link to="/self-paced-classes/environmental-science" onClick={scrollToTop}>Environmental Science</Link>
                        </li>
                        <li>
                            <Link to="/self-paced-classes/psychology" onClick={scrollToTop}>Psychology</Link>
                        </li>
                        <li>
                            <Link to="/self-paced-classes/statistics" onClick={scrollToTop}>Statistics</Link>
                        </li>
                        <li>
                            <Link to="/self-paced-classes/zoology" onClick={scrollToTop}>Zoology</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to='/course-boxes' onClick={scrollToTop}>Course Boxes</Link>
                </li>
                <li>
                    <Link to='https://substack.com/@STEMZLEARNING' onClick={scrollToTop}>News</Link>
                </li>
                <li>
                    <Link to='/get-involved' onClick={scrollToTop}>Get Involved</Link>
                    {/* <ul className="dropdown-menu">
                        <li>
                            <Link to="/get-involved/volunteers" onClick={scrollToTop}>Volunteers</Link>
                        </li>
                    </ul> */}
                </li>
                <li>
                    <Link to='/contact' onClick={scrollToTop}>Contact</Link>
                </li>
                {/* <li>
                    {check ? (
                        <Link to="/dashboard" onClick={updateDashboard} className="login-link">Dashboard</Link>
                    ) : (
                        <Link to="/login" onClick={scrollToTop} className="login-link">Log In</Link>
                    )}
                </li> */}
            </ul>
            <div className='hamburger' onClick={handleClick}>
                {click ? (<FaTimes size={20} style={{color: 'black'}} />) : (<FaBars size={20} style={{color: 'black'}}/>)}
            </div>
        </div>
    )
    }

export default Navbar
