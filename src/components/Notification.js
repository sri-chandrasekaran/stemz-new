import React from 'react';
import './Notification.css'
import { Link } from 'react-router-dom'

const Notification = ({ onClose }) => {
  return (
    <div>
      <div className="notif">
      <div className="notif-content">
        <button className='close-button' onClick={onClose}><span>X</span></button>
        <h1>Welcome to STEMz Learning!</h1>
        <p>Join our mailing list to get early access to sign up for classes.</p>
            <Link to="https://forms.gle/CU1bpfR8kL6J9kq68" target="_blank" rel="noopener noreferrer">
                <button className="secondary-button">Join Mailing List!</button>
            </Link>
      </div>
    </div>
    </div>
  )
}

export default Notification
