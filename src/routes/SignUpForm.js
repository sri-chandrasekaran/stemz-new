//SignUpForm.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from "axios";
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

    try{

      await axios.post("https://www.stemzlearning.org/api/sign-up", {
        name: name, grade: grade, email: email, password: password
      }, {withCredentials: true})
      .then(res=>{
        console.log(res.data)
        if (res.data==="Email Already Exists"){
            alert("User already exists.")
        }
        else if (res.data.message==="New User Created"){
          Login(res.data.password, res.data.email)
          //navigate("/dashboard");
        }else {
          alert("Unexpected response from the server");
        }
      })
      .catch(e=>{
        alert(e)
        // console.log("there is a problem")
        console.log(e)
      })
    }
    catch(e){
      console.log(e)
    }
  };

  async function Login(password, email) {
    try {
      const response = await axios.post("https://www.stemzlearning.org/login", {
        email: email, password: password
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