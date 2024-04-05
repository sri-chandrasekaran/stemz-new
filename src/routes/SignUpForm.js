import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from "axios";
import './SignUpForm.css';
import { useNavigate, Link } from 'react-router-dom';

function SignUpForm() {

  const history = useNavigate();

  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e){
    e.preventDefault();
    console.log("Submitting signup data:", { name, grade, email, password }); 

    try{

      await axios.post("http://localhost:3001/sign-up", {
        name: name, grade: grade, email: email, password: password
      })
      .then(res=>{
        if (res.data==="exist"){
            alert("User already exists.")
        }
        else if (res.data==="not exist"){
            history("/")
        }else {
          alert("Unexpected response from the server");
        }
      })
      .catch(e=>{
        alert("wrong details")
        console.log("there is a problem")
      })
    }
    catch(e){
      console.log(e)
    }
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