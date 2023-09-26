import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './loginsignup.css'

const Login = () => {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  const handleOnSubmit = evt => {
    evt.preventDefault();

    const { email, password } = state;
    alert(`You are login with email: ${email} and password: ${password}`);

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className={`form-container3 sign-in-container ${containerClass}`}>
      <form onSubmit={handleOnSubmit} className="answers">
        <h1 className='sign-in'>Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          className="answers2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          className="answers2"
        />
        <button className='sign-button'>Sign In</button>
        <a href="#" className='forgot'>Forgot your password?</a>
      </form>
      </div>
      <div className="overlay-panel overlay-right">
              <h1 className='sign-in'>Are you new to STEMz Learning?</h1>
              <p className='enter-info'>Create an account with us today!</p>
              <button
                className="sign-button "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
      <Footer />
    </div>
  );
}

export default Login