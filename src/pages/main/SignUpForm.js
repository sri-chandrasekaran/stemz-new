import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { call_api } from '../../api';
import '../css/SignUpForm.css';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const SignUpForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [role, setRole] = useState('student'); // default to student
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    const payload = {
      name,
      password,
      email,
      role,
    };

    if (role === 'student') {
      payload.gradeLevel = Number(gradeLevel); // ensure it's a number
    }

    try {
      const response = await call_api(payload, 'auth/signup', 'POST');
      if (response) {
        // Auto-login after successful signup
        const loginResponse = await call_api({ email, password }, 'auth/login', 'POST');
        if (loginResponse?.token) {
          localStorage.setItem('token', loginResponse.token);
          const decoded = jwtDecode(loginResponse.token);
          if (decoded.role === 'teacher') {
            // window.location.href = 'http://localhost:3002';
            window.location.href = 'https://teachers.stemzlearning.org/';
          } else {
            navigate('/dashboard');
          }
        } else {
          console.log('Login after signup failed - no token received');
        }
      } else {
        console.log('Signup failed - no response');
      }
    } catch (error) {
      console.error('Signup failed:', error);
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
                placeholder="Full Name"
                required
              />
            </div>

            {role === 'student' && (
              <div className="form-group">
                <input
                  type="number"
                  min="1"
                  max="6"
                  onChange={(e) => setGradeLevel(e.target.value)}
                  placeholder="Grade (1-6)"
                  required
                />
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

              {/* Role Selection */}
              <div className="form-group role-selection">
            <label>
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === 'student'}
                onChange={() => setRole('student')}
              />
              <span>Student</span>
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="teacher"
                checked={role === 'teacher'}
                onChange={() => setRole('teacher')}
              />
              <span>Teacher</span>
            </label>
          </div>

            <button type="submit">Submit</button>
            <p>
              Already have an account?{' '}
              <Link to="/login" className="login-link4">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
