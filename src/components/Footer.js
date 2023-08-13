import React from 'react';
import './Footer.css';
import {FaFacebook, FaLinkedin, FaTiktok, FaInstagram, FaTwitter} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='footer fixed-footer'>
      <div className='footer-container'>
        <div className='social'>
          <a href="https://www.facebook.com/alice.gao.96558/" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={40} style={{color:'black', marginRight: '1rem'}} />
          </a>
          <a href="https://www.linkedin.com/company/stemz-learning/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={40} style={{color:'black', marginRight: '1rem'}} />
          </a>
          <a href="https://www.tiktok.com/@stemzlearning?_t=8edHU0jxuuUI&_r=1" target="_blank" rel="noopener noreferrer">
            <FaTiktok size={40} style={{color:'black', marginRight: '1rem'}} />
          </a>
          <a href="https://www.instagram.com/stemzlearning" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={40} style={{color:'black', marginRight: '1rem'}} />
          </a>
          <a href="https://www.twitter.com/stemzlearning" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={40} style={{color:'black', marginRight: '1rem'}} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
