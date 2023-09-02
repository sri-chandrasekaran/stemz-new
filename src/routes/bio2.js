import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const bio2 = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 2: Proteins & Carbohydrates"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/Vo_1vhGWER8" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vTL1o_Apa39ZYqgeO-gcCEpUGgS7YVJN_yXy-7OKuHHtyGJFvlQv-nVayyCDvboNfDUMrTBznHlSgP_/pub?start=false&loop=false&delayms=3000&slide=id.g5320acc4cf_0_92" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQryoVxTaKuMzfhj25LAxyxWM4rVkQ1z1mMQe1L19FRhN3EgZH_vEyZpfj-OAdOx4kQ5szUXPoQbeHX/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vTqZTd0LqASARcIsOhM94CO2etLbRCUKMt2u0x234m9RvfEbFNV51KL0CBjlXGFl-PNVFT2ccaD3dnf/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default bio2
