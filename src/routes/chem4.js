import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const bc4p = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 4: Putting It All Together"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/NpQJoCQEa9U" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vT7pJ3jD7xBrpJPYs5pdNhZjROSvuC5ETJclQoR_n9o_xOCnYkPGks8bQfCIpSMvg7Qe6eEGQdFBR7b/pub?start=false&loop=false&delayms=3000&slide=id.g98ed887a27_0_98" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQ00xvBVGfp47ThJkE75BoeRpYFXkqWYZ86btMZrcIcjAbWdBFTETtOOLbCTimydRrMSPJJpl4MdDG2/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default bc4p
