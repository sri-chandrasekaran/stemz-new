import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Login = () => {
  return (
    <div>
      <Navbar />
      <div className='login'>
      <form>
            <label>Username</label>
            <input type='text' name='name'></input>
            <label>Password</label>
            <input type='email' name='user_email'></input>
            <button type='submit' className="secondary-button" style={{width: '100px', marginLeft: window.innerWidth <= 800 ? '130px' : '220px',}}>Log In</button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Login

