import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from "axios";
import './SignUpForm.css';
import { useNavigate, Link } from 'react-router-dom';

function dashboard() {
  return (
    <div>
        <Navbar />
        <p>Welcome to your Dashboard</p>
    </div>
  )
}

export default dashboard
