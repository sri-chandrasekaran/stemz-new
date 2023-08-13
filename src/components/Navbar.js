import React, { useState } from 'react';
import './Navbar.css';
import {FaBars, FaTimes} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'


const Navbar = () => {

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
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about-us'>About Us</Link>
                </li>
                <li>
                    <Link to='/online-classes'>Online Classes</Link>
                </li>
                <li>
                    <Link to='/self-paced-classes'>Self-Paced Classes</Link>
                    <ul className="dropdown-menu">
                        <li>
                            <Link to="/self-paced-classes/astronomy">Astronomy</Link>
                        </li>
                        <li>
                            <Link to="/self-paced-classes/basics-of-coding">Basics of Coding</Link>
                        </li>
                        <li>
                            <Link to="/self-paced-classes/biochemistry">Biochemistry</Link>
                        </li>
                        <li>
                            <Link to="/self-paced-classes/chemistry">Chemistry</Link>
                        </li>
                        <li>
                            <Link to="/self-paced-classes/circuits">Circuits</Link>
                        </li>
                        <li>
                            <Link to="/self-paced-classes/environmental-science">Environmental Science</Link>
                        </li>
                        <li>
                            <Link to="/self-paced-classes/psychology">Psychology</Link>
                        </li>
                        <li>
                            <Link to="/self-paced-classes/statistics">Statistics</Link>
                        </li>
                        <li>
                            <Link to="/self-paced-classes/zoology">Zoology</Link>
                        </li>
                    </ul>
                </li>
                {/* <li>
                    <Link to='/news'>News</Link>
                </li> */}
                <li>
                    <Link to='/get-involved'>Get Involved</Link>
                </li>
                <li>
                    <Link to='/contact'>Contact</Link>
                </li>
            </ul>
            <div className='hamburger' onClick={handleClick}>
                {click ? (<FaTimes size={20} style={{color: 'black'}} />) : (<FaBars size={20} style={{color: 'black'}}/>)}
            </div>
        </div>
    )
    }

export default Navbar
