//LoginForm.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from "axios";
import './LoginForm.css';
import lightbulbImage from '../assets/lightbulb3.png'
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const submit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:3001/login", {
          email,
          password,
        }, {
          withCredentials: true,
        });
        if (response.data.success) {
          navigate("/dashboard");
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Axios error:", error);
        alert("Wrong details");
      }
    };

  return (
    // <div className="login">
    //   <h1>Login</h1>
    //   <form onSubmit={submit}>
    //       <input type='email' onChange={(e) => {setEmail(e.target.value)}} placeholder='Email' name='' id=''></input>
    //       <input type='password' onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' name='' id=''></input>
    //       <button type='submit'>Submit</button>
    //   </form>

    //   <br />
    //   <p>OR</p>
    //   <br />

    //   <Link to='/sign-up'>Signup</Link>

    // </div>
    <div>
    <Navbar />
    <div className="login-container">
    <div className="login-card">
      <form className="login-form" onSubmit={submit}>
      <h1>Login</h1>
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
        <button type="submit">Login</button>
        <p>
        Don't have an account? <Link to="/sign-up" className="sign-up-link">Sign Up</Link>
      </p>
      </form>
    </div>
  </div>
  </div>
  )
}

export default LoginForm;