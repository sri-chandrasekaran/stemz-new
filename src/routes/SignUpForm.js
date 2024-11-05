//SignUpForm.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { call_api } from '../api'
import './css/SignUpForm.css';
import { useNavigate, Link } from 'react-router-dom';

const SignUpForm = () => {

  const navigate = useNavigate();
    
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e){
    e.preventDefault();
    console.log("Submitting signup data:", { name, grade, email, password }); 
    let payload = {
      "name": name,
      "password": password,
      "email": email,
    }
    call_api(payload, "users/create", "POST");
  };

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
              onChange={(e) => setGrade(e.target.value)}
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