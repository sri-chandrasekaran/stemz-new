import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from "axios";
import './LoginForm.css';
import lightbulbImage from '../assets/lightbulb3.png'
import { useNavigate, Link } from 'react-router-dom';

function LoginForm() {

  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e){
    e.preventDefault();
    console.log("Submitting login data:", { email, password }); 

    try{

      await axios.post("http://localhost:3001/login", {
        email: email, password: password
      })

      .then(res=>{
        if (res.data==="Correct Password"){
            history("/")
        }
        else if (res.data==="Email Not Found"){
            alert("User is not found.")
        }
        else if (res.data==="Incorrect Password"){
            alert("Wrong Password")
        }
      })
      .catch(e=>{
        console.error("Axios error:");
        alert("wrong details")
      })

    }
    catch(e){
      console.log(e)
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