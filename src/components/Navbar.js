import React, { useState, useEffect } from 'react';
import './Navbar.css';
import {FaBars, FaTimes} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import axios from "axios";
import { buildApiUrl } from "../config/api-config";


const Navbar = () => {
    const [check, setCheck] = useState(null);
    const [click, setClick] = useState(false);
    const [color, setColor] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const navigate = useNavigate();
  
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
      setClick(false); // Close mobile menu when clicking a link
    };

    const toggleDropdown = (index) => {
      if (window.innerWidth <= 1100) {
        setActiveDropdown(activeDropdown === index ? null : index);
      }
    };

    const updateDashboard = () => {
        window.location.href = '/dashboard';
    };

    const updateOnline = () => {
        window.location.href = '/online-classes';
        setClick(false); // Close mobile menu
    };

    const navigateToDashboard = (e) => {
        e.preventDefault();
        navigate('/dashboard');
        setClick(false); // Close mobile menu
    };
    
    const handleLogout = (e) => {
      e.preventDefault();
      // Clear the token from localStorage
      localStorage.removeItem('token');
      // Update authentication state
      setCheck(false);
      // Navigate to login page
      navigate('/login');
    };
  
    useEffect(() => {
      // Check for token in localStorage first
      const token = localStorage.getItem('token');
      
      if (token) {
        // If token exists in localStorage, we consider user as logged in
        setCheck(true);
      } else {
        // If no token in localStorage, check with the server
        axios
          .get(buildApiUrl('auth/me'), {
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
      }
    }, []);
  
    if (check === null) {
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
                <li className={activeDropdown === 0 ? 'active' : ''} onClick={() => toggleDropdown(0)}>
                    <Link to='/self-paced-classes' onClick={(e) => window.innerWidth <= 1100 && e.preventDefault()}>
                        Self-Paced Classes
                    </Link>
                    <ul className="dropdown-menu">
                        <li>
                            <Link to="/astronomy" onClick={scrollToTop}>Astronomy</Link>
                        </li>
                        <li>
                            <Link to="/basicsofcoding" onClick={scrollToTop}>Basics of Coding</Link>
                        </li>
                        <li>
                            <Link to="/biochemistry" onClick={scrollToTop}>Biochemistry</Link>
                        </li>
                        <li>
                            <Link to="/chemistry" onClick={scrollToTop}>Chemistry</Link>
                        </li>
                        <li>
                            <Link to="/circuits" onClick={scrollToTop}>Circuits</Link>
                        </li>
                        <li>
                            <Link to="/environmentalscience" onClick={scrollToTop}>Environmental Science</Link>
                        </li>
                        <li>
                            <Link to="/psychology" onClick={scrollToTop}>Psychology</Link>
                        </li>
                        <li>
                            <Link to="/statistics" onClick={scrollToTop}>Statistics</Link>
                        </li>
                        <li>
                            <Link to="/zoology" onClick={scrollToTop}>Zoology</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to='/course-boxes' onClick={scrollToTop}>Course Boxes</Link>
                </li>
                <li>
                    <Link to='https://substack.com/@STEMZLEARNING' onClick={scrollToTop}>News</Link>
                </li>
                <li className={activeDropdown === 1 ? 'active' : ''} onClick={() => toggleDropdown(1)}>
                    <Link to='/get-involved' onClick={(e) => window.innerWidth <= 1100 && e.preventDefault()}>
                        Get Involved
                    </Link>
                    <ul className="dropdown-menu">
                        <li>
                            <Link to="/volunteer" onClick={scrollToTop}>Volunteers</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to='/contact' onClick={scrollToTop}>Contact</Link>
                </li>
                <li className="login-item">
                    {check ? (
                        <Link to="/dashboard" onClick={navigateToDashboard} className="login-link">Dashboard</Link>
                    ) : (
                        <Link to="/login" onClick={scrollToTop} className="login-link">Log In</Link>
                    )}
                </li>
            </ul>
            <div className='hamburger' onClick={handleClick}>
                {click ? (<FaTimes size={20} style={{color: 'black'}} />) : (<FaBars size={20} style={{color: 'black'}}/>)}
            </div>
        </div>
    )
}

export default Navbar;