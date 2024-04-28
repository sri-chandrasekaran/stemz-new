import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther';
import Dashbar from '../components/Dashbar';
import Footer from '../components/Footer';
import './Dashboard.css'
import AstronomyImage from '../assets/astronomy.PNG'
import Coding from '../assets/coding.jpg'
import Biochemistry from '../assets/biochem.PNG'
import Chemistry from '../assets/chemistry.jpeg'
import Circuits from '../assets/circuits.jpg'
import ES from '../assets/environmentalscience.jpg'
import Psych from '../assets/psych.jpeg'
import Stats from '../assets/statistics.jpeg'
import Zoology from '../assets/zoology.jpg'
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

const dashboard = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  return (
    <div>
        <Navbar />
        <p>Welcome to your Dashboard</p>
    </div>
  )
}

export default dashboard
