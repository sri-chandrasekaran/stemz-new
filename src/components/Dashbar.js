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
  const [showGradeSelector, setShowGradeSelector] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [savingGrade, setSavingGrade] = useState(false);
  
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
          // Show grade selector if user doesn't have a grade level
          if (!userResponse.gradeLevel) {
            setShowGradeSelector(true);
          }
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

  const handleGradeSubmit = async () => {
    if (!selectedGrade || !user) return;
    
    try {
      setSavingGrade(true);
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      
      const response = await call_api(
        { gradeLevel: parseInt(selectedGrade) },
        `users/${userId}/grade`,
        "PUT"
      );
      
      if (response) {
        setUser({...user, gradeLevel: parseInt(selectedGrade)});
        setShowGradeSelector(false);
        setSelectedGrade('');
      }
    } catch (error) {
      console.error('Error updating grade level:', error);
      alert('Failed to update grade level. Please try again.');
    } finally {
      setSavingGrade(false);
    }
  };

  const handleEditGrade = () => {
    setSelectedGrade(user.gradeLevel?.toString() || '');
    setShowGradeSelector(true);
  };

  const getGradeDisplay = (grade) => {
    if (!grade) return 'Not set';
    const suffixes = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th'];
    const suffix = grade === 1 ? 'st' : grade === 2 ? 'nd' : grade === 3 ? 'rd' : 'th';
    return `${grade}${suffix} Grade`;
  };

  if (isLoading) {
    return (
      <div className="grid-side">
        <div>Loading...</div>
      </div>
    );
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
        <div style={{ marginTop: '15px' }}>
          <p>Grade: {getGradeDisplay(user?.gradeLevel)}</p>
          {user?.gradeLevel && (
            <button 
              onClick={handleEditGrade}
              class ="points-button"
            >
              Change Grade
            </button>
          )}
        </div>
      </div>

      {/* Grade Level Selector Modal */}
      {showGradeSelector && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: '#d3d3d3',
          padding: '40px',
          borderRadius: '8px',
          textAlign: 'center',
          width: '300px',
          fontSize: '18px'
        }}>
          <h3 style={{ marginBottom: '20px' }}>
            Select Your Grade Level
          </h3>
          <p style={{ marginBottom: '20px', color: '#333', fontSize: '15px' }}>
            This helps us provide age-appropriate content and quizzes.
          </p>

          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '3px',
              border: '1px solid #999',
              marginBottom: '20px'
            }}
          >
            <option value="">Choose your grade...</option>
            {[1, 2, 3, 4, 5, 6].map((grade) => (
              <option key={grade} value={grade}>
                {getGradeDisplay(grade)}
              </option>
            ))}
          </select>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <button
              onClick={handleGradeSubmit}
              disabled={!selectedGrade || savingGrade}
              className="bar-buttons"
              style={{
                flex: 1,
                backgroundColor: selectedGrade ? '#357717' : '#ccc',
                color: '#fff',
                cursor: selectedGrade ? 'pointer' : 'not-allowed',
                borderRadius: '8px'
              }}
            >
              {savingGrade ? 'Saving...' : 'Save'}
            </button>

            {user?.gradeLevel && (
              <button
                onClick={() => {
                  setShowGradeSelector(false);
                  setSelectedGrade('');
                }}
                className="bar-buttons"
                style={{
                  flex: 1,
                  backgroundColor: '#df4336',
                  color: '#fff',
                  cursor: selectedGrade ? 'pointer' : 'not-allowed',
                  borderRadius: '8px'
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    )}


      <div>
        <button className="points-button" onClick={handleSignOut}>
          Sign Out
        </button>
        <br />
        {/*<button className="bar-buttons">Delete Account</button>*/}
      </div>
    </div>
  );
};

export default Dashbar;