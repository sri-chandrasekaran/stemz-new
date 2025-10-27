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
        {/* Links for Privacy Policy and Terms of Use */}
        <div className='footer-links' style={{ marginTop: '1rem' }}>
          <a href="https://docs.google.com/document/d/e/2PACX-1vRRlvzMG1MRStuFFvQUnol5KW5UsQ02sfF2Rk2N7nAgY9xEq8wFJyTvciuRNd6oU8mb-VYkL2kFmJZD/pub" 
             target="_blank" rel="noopener noreferrer" 
             style={{ marginRight: '1rem', color: 'black', textDecoration: 'underline' }}>
            Privacy Policy
          </a>
          <a href="https://docs.google.com/document/d/e/2PACX-1vTMxRohPUgQX_kQF-Pdexq_Pv21EVmnKHFsrHh75nh1EWA0zgCRhJeOguMoDwrUFu2qTRI7ZEkBJ5E9/pub" 
             target="_blank" rel="noopener noreferrer" 
             style={{ color: 'black', textDecoration: 'underline' }}>
            Terms of Use
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
