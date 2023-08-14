import React, { useState } from 'react';
import './Navbar.css';
import {FaBars, FaTimes} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'


const Navbar = () => {


    const scrollToTop = () => {
        window.scrollTo(0, 0);
    }

    const[click, setClick] = useState(false)
    const handleClick = () => setClick((prevState) => (!prevState))

    const [color, setColor] = useState(false)
        const changeColor =() => {
            if (window.scrollY >= 100) {
                setColor(true)
            } else {
                setColor(false)
            }
        }

        window.addEventListener('scroll', changeColor)
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
                    <Link to='/online-classes' onClick={scrollToTop}>Online Classes</Link>
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
                {/* <li>
                    <Link to='/news'>News</Link>
                </li> */}
                <li>
                    <Link to='/get-involved' onClick={scrollToTop}>Get Involved</Link>
                </li>
                <li>
                    <Link to='/contact' onClick={scrollToTop}>Contact</Link>
                </li>
            </ul>
            <div className='hamburger' onClick={handleClick}>
                {click ? (<FaTimes size={20} style={{color: 'black'}} />) : (<FaBars size={20} style={{color: 'black'}}/>)}
            </div>
        </div>
    )
    }

export default Navbar
