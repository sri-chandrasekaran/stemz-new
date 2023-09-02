import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const es1s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 3: Distribution"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/PpDLfndy7zs" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTU_Vd0cmtxnRjC4UivFUa1_p5Ey-nLQTNbGdbgFZa94iQQ9ydwmbQFBCG5S6lafketSyK8A3WmzV3D/pub?start=false&loop=false&delayms=3000&slide=id.gd52056e2db_1_60" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTsG5K2B1xJb9zM3oJfWebqun7Jmr3wEkr5ES_tb7zwGqwFJE_vmzHhK6MMrCexBvs0MdIHCrwgH_FD/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Student Notes</button>
                  </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default es1s
