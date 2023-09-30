import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const Astrovid3s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 3: Space and Humans"/>
      <div className='vidbig'>
      <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/v4pT0yllkO0" frameborder="0" allowfullscreen></iframe>
      </div>
      <div className='centered-container'>
      <Link to="https://docs.google.com/presentation/d/e/2PACX-1vS_xvppSffjBQYinMkvctQfRa5v4oC0AtkGn54254erImV0xHnQi1fWvVEL-VSxDFK_M-KPCsOa4IDy/pub?start=false&loop=false&delayms=3000" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRzjSp4DciyO8OjCR_k_nf_4_cbGIzLCWkt7mRAHScRbpH_lqS5D_Q3hvxnseVt6P0KvVcKnSnSNEMe/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRJxZ8cM1W83Zu7f_WpP_jzGS5Cb_uPZMH-pUVKVn5rfyUyjOBTu9HFf3HWvdcRlha0tdgHwR9p7e1q/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Student Notes</button>
                  </Link>
      </div>
      <div style={{ paddingBottom: '200px' }} />
                  
      <Footer/>
    </div>
  )
}

export default Astrovid3s
