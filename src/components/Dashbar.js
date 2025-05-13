import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { call_api } from '../api';
import { jwtDecode } from 'jwt-decode';
import './Dashbar.css';
import defaultProfile from '../assets/defaultprofile.jpg';

const Dashbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Token verification
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("No token found, redirecting to login page");
        navigate('/login');
        return;
      }

      try {
        console.log("token is found");
        const response = await call_api(null, "auth/verify", "POST");
        if (response && response.success) {
          setIsAuthenticated(true);
          setLoading(false);
        } else {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    verifyToken();
  }, [navigate]);

  // Fetch user data
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        
        const userResponse = await call_api(
          null, 
          `users/id/${userId}`,
          "GET"
        );
        if (userResponse) {
          setUser(userResponse);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (isLoading) {
    // return <div>Loading...</div>;
  }

  return (
    <div className="grid-side">
      <img 
        src={defaultProfile} 
        alt="Profile"
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          marginTop: '100px',
          marginBottom: '10px',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      />
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