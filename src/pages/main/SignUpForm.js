//SignUpForm.js
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { call_api } from '../../api'
import '../css/SignUpForm.css';
import { useNavigate, Link } from 'react-router-dom';

const SignUpForm = () => {

  const navigate = useNavigate();
    
  const [name, setName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    const payload = { name, password, email, gradeLevel };
  
    try {
      const response = await call_api(payload, "auth/signup", "POST");
      console.log("Signuping :", response);
      if (response) { // Check for a successful response
        console.log("Signup successful:", response);
        try {
          const response = await call_api({
            email,
            password,
          }, "auth/login", "POST");
      
          if (response) {
            console.log("login successful:", response);
             if (response && response.token) {
                // Store token in localStorage and navigate to dashboard
                localStorage.setItem('token', response.token);
                navigate("/dashboard");
              } else {
                console.log("Login after signup failed - no token received");
              }
          }
        } catch (error) {
          console.error("Signup failed:", error);
        }
      }else {
        console.log("Signup failed - no token received");
      }    
    } catch (error) {
      console.error("Signup failed:", error);
    }
  }

  return (
    <div>
    <Navbar />
    <div className="signup-container">
      <div className="signup-card">
        <form className="signup-form" onSubmit={submit}>
          <h1>Sign Up</h1>
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Student Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setGradeLevel(e.target.value)}
              placeholder="Grade"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit">Submit</button>
          <p>
          Already have an account? <Link to="/login" className="login-link4">Login</Link>
        </p>
        </form>
      </div>
    </div>
    </div>
  );
}

export default SignUpForm;