//LoginForm.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { call_api } from '../api' 
import './css/LoginForm.css';
// import lightbulbImage from '../assets/lightbulb3.png'
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    
    useEffect(() => {
      const verifyToken = async () => {
          const token = localStorage.getItem('token');
          
          if (!token) {
              // No token found, stay on login page and don't redirect
              console.error("no token:", error);
              return;
          }
  
          try {
              const response = await call_api(null, "auth/verify", "POST");
              if (response.success) {
                  navigate("/dashboard");
              } else {
                  localStorage.removeItem('token');
              }
          } catch (error) {
              console.error("Token verification failed:", error);
              localStorage.removeItem('token');
          }
      };
  
      verifyToken();
  }, [navigate]);
  
    const submit = async (e) => {
      e.preventDefault();
      setError("");

      try {
          const response = await call_api({
              email,
              password,
          }, "auth/login", "POST");
          
          if (response && response.token) {
              localStorage.setItem('token', response.token);
              // console.log("Token stored:", localStorage.getItem('token')); // Verify token storage
              navigate("/dashboard");
          } else {
              setError("Login failed - no token received");
          }
      } catch (error) {
          console.error("Login failed:", error);
          setError("Invalid email or password");
      }
  };

  return (
    <div>
    <Navbar />
    <div className="login-container">
    <div className="login-card">
      <form className="login-form" onSubmit={submit}>
      <h1>Login</h1>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>
            Don't have an account? <Link to="/sign-up" className="sign-up-link">Sign Up</Link>
        </p>
        {/* Display current token for debugging 
        <div style={{fontSize: '12px', wordBreak: 'break-all', margin: '1rem'}}>
            Current Token: {localStorage.getItem('token')}
        </div> */}
        {error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
      </form>
    </div>
  </div>
  </div>
  )
}

export default LoginForm;