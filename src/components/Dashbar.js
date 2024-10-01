// Dashbar.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashbar.css';

const Dashbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('https://www.stemzlearning.org/dashboard', {
          withCredentials: true,
        });
        if (response.data.success) {
          setUser(response.data.dashboardData.user);
          setDashboardData(response.data.dashboardData);
        }
      } catch (error) {
        console.error('Axios error:', error);
        // Handle error, e.g., redirect to login if token is invalid
        navigate('/login');
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await axios.post('https://www.stemzlearning.org/signout', {}, { withCredentials: true });
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="grid-side">
      <div className="badge">Current badge</div>
      <div className="info">
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
      </div>
      <div>
        <button className="bar-buttons" onClick={handleSignOut}>
          Sign Out
        </button>
        <br />
        {/*<button className="bar-buttons">Delete Account</button>*/}
      </div>
    </div>
  );
};

export default Dashbar;