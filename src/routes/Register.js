// import React, { useState } from 'react'
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer'
// import './loginsignup.css'

// const Register = () => {
//     const [state, setState] = React.useState({
//       name: "",
//       email: "",
//       password: ""
//     });
//     const handleChange = evt => {
//       const value = evt.target.value;
//       setState({
//         ...state,
//         [evt.target.name]: value
//       });
//     };

//     const [type, setType] = useState("signIn");
//   const handleOnClick = text => {
//     if (text !== type) {
//       setType(text);
//       return;
//     }
//   };
//   const containerClass =
//     "container " + (type === "signUp" ? "right-panel-active" : "");
  
//     const handleOnSubmit = evt => {
//       evt.preventDefault();
  
//       const { name } = state;
//       alert(
//         `Welcome ${name}`
//       );
  
//       for (const key in state) {
//         setState({
//           ...state,
//           [key]: ""
//         });
//       }
//     };
  
//     return (
//       <div>
//         <Navbar />
//         <div className={`form-container3 sign-up-container ${containerClass}`}>
//         <form onSubmit={handleOnSubmit} className="answers">
//           <h1 className='createAccount'>Create Account</h1>
//           <input
//             type="text"
//             name="name"
//             value={state.name}
//             onChange={handleChange}
//             placeholder="Name"
//             className="answers2"
//           />
//           <input
//             type="email"
//             name="email"
//             value={state.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="answers2"
//           />
//           <input
//             type="password"
//             name="password"
//             value={state.password}
//             onChange={handleChange}
//             placeholder="Password"
//             className="answers2"
//           />
//           <button className='sign-button'>Sign Up</button>
//         </form>
//         </div>
//         <div className="overlay-panel overlay-left">
//               <h1 className='createAccount'>Welcome Back!</h1>
//               <p className='enter-info'>
//                 To keep connected with us please login with your personal info
//               </p>
//               <button
//                 className="sign-button"
//                 id="signIn"
//                 onClick={() => handleOnClick("signIn")}>
//                 Sign In
//               </button>
//             </div>
//         <Footer />
//       </div>
//     );
//   }
  

// export default Register


import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './loginsignup.css'

const Login = () => {
  const [state, setState] = React.useState({
    name:"",
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
      <div className="overlay-panel overlay-right">
              <h1 className='sign-in'>Welcome Back!</h1>
              <button
                className="sign-button "
                id="signIn"
                onClick={() => handleOnClick("signUp")}
              >
                Sign In
              </button>
        </div>
        <div className={`form-container3 sign-in-container ${containerClass}`}>
      <form onSubmit={handleOnSubmit} className="answers">
        <h1 className='sign-in'>Sign Up</h1>
        <input
          type="name"
          placeholder="Name"
          name="name"
          value={state.name}
          onChange={handleChange}
          className="answers2"
        />
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
      <Footer />
    </div>
  );
}

export default Login