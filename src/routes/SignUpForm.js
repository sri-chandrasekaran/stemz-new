//SignUpForm.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from "axios";
import './SignUpForm.css';
import { useNavigate, Link } from 'react-router-dom';

const SignUpForm = () => {

  const navigate = useNavigate();
    
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');  // Default role is student

  async function submit(e){
    e.preventDefault();
    console.log("Submitting signup data:", { name, grade, email, password, role }); 

    try{

      await axios.post("http://localhost:3001/sign-up", {
        withCredentials: true,
        name: name, grade: grade, email: email, password: password, role: role // Include the selected role in the POST request
      })
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
        console.log("there is a problem")
      })
    }
    catch(e){
      console.log(e)
    }
  };

  async function Login(password, email) {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email: email, password: password
      }, {
        withCredentials: true,
      });
      if (response.data.success) {
        if (role === 'teacher') {
          navigate("/teacher-portal");  // Redirect teachers to teacher portal
        } else {
          navigate("/dashboard");  // Redirect students to student dashboard
        }
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
            {/* Add Role Selection Here */}
            <div className="form-group">
              <label>
                <input
                  type="radio"
                  value="student"
                  checked={role === 'student'}
                  onChange={(e) => setRole(e.target.value)}
                />
                I am a student
              </label>
              <label>
                <input
                  type="radio"
                  value="teacher"
                  checked={role === 'teacher'}
                  onChange={(e) => setRole(e.target.value)}
                />
                I am a teacher
              </label>
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