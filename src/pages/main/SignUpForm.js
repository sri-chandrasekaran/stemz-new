//SignUpForm.js
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { call_api } from '../../api'
import '../css/SignUpForm.css';
import { useNavigate, Link } from 'react-router-dom';

const SignUpForm = () => {

  const navigate = useNavigate();
    
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [role, setRole] = useState('student')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    const payload = { 
      name, 
      password, 
      email, 
      role,
      ...(role === 'student' && { grade }) // grade only gets rendered if role == student
     };
  
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
            <select
                id="role"
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder={role === "student" ? "Student Name" : "Teacher Name"}
              required
            />
          </div>

          {/* grade only shows up if role == student */}
          {role === 'student' && (
              <div className="form-group">
                {/* <input
                  type="text"
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="Grade"
                  required
                /> */}
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select Grade</option>
                  <option value="K">K</option>
                  <option value="1">1st Grade</option>
                  <option value="2">2nd Grade</option>
                  <option value="3">3rd Grade</option>
                  <option value="4">4th Grade</option>
                  <option value="5">5th Grade</option>
                  <option value="6">6th Grade</option>
                </select>
              </div>
            )}

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