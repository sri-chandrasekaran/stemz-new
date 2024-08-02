import React from 'react';
import './About.css';
import HeroOther from '../components/HeroOther';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Sri from '../assets/sri.jpeg'
import Taleen from '../assets/taleen.jpeg'
import Erica from '../assets/erica.jpeg'
import Beaker from '../assets/beaker.png'
import Braden from '../assets/braden.jpg'
import Emily from '../assets/emily.jpg'
import Maanya from '../assets/maanya.jpg'
import Steven from '../assets/steven.jpg'
import Vaaruni2 from '../assets/vaaruni2.jpg'
// import Lightbulb from '../assets/lightbulb.png'

const About = () => {
  return (
    <div className='about-container'>
        <Navbar />
        <HeroOther overlayText="About Us"/>
      <div className='story'>
        <h1 className='story-header'>Our Story</h1>
        <div className='story-content'>
        <p className='text'>During the COVID-19 pandemic, we found that children were unable to receive adequate educational opportunities. 
        Kids needed a way to challenge their brains without the added stress that supplementary education too often carries. 
        We quickly recognized the lack of structured courses for kids that offered engaging learning, and took initiative.

        Thus, STEMz Learning was born. STEMz Learning tackles these problems with a combination of nontraditional curriculum 
        and experiment-driven learning. Better yet, our courses can be accessed from the comfort of your own home. As students, 
        we understand that you have to enjoy learning to want to learn. Keeping this sentiment in mind, we designed our courses 
        to be a launching pad, not a finish line. </p>
        <img src={Beaker} className='beaker-img' alt='beaker' />
        </div>
      </div>
      <div className='content'>
        <h1 className='heading'>Our Board</h1>
        <div className='profiles'>
          <div className='profile'>
            <img src={Sri} className='profile-img' alt='Sri Chandrasekaran' />
            <h3>Sri Chandrasekaran</h3>
            <h5>Chief Executive Officer</h5>
          </div>
          <div className='profile'>
            <img src={Taleen} className='profile-img' alt='Taleen Shomar' />
            <h3>Taleen Shomar</h3>
            <h5>Chief Financial Officer</h5>
          </div>
          <div className='profile'>
            <img src={Erica} className='profile-img' alt='Erica Huang' />
            <h3>Erica Huang</h3>
            <h5>Chief Operations Officer</h5>
          </div>
        </div>
        <h1 className='heading'>Our Leaders</h1>
        <div className='profiles'>
          <div className='profile'>
            <img src={Emily} className='profile-img' alt='Emily Puthur Simon' />
            <h3>Emily Puthur Simon</h3>
            <h5>Head of Teaching</h5>
          </div>
          <div className='profile'>
            <img src={Braden} className='profile-img' alt='Braden Van Buskirk' />
            <h3>Braden Van Buskirk</h3>
            <h5>Head of Curriculum Development</h5>
          </div>
        </div>
        <div className='profiles'>
          <div className='profile'>
            <img src={Maanya} className='profile-img' alt='Maanya Shukla' />
            <h3>Maanya Shukla</h3>
            <h5>Programs Director</h5>
          </div>
          <div className='profile'>
            <div className='profile-img-container'>
            <img src={Steven} className='profile-img' alt='Steven Biji' style={{ objectPosition: '-250px center' }}/>
            </div>
            <h3>Steven Biji</h3>
            <h5>Marketing Director</h5>
          </div>
          <div className='profile'>
            <img src={Vaaruni2} className='profile-img' alt='Vaaruni Khanna' />
            <h3>Vaaruni Khanna</h3>
            <h5>Outreach & Recruitment Director</h5>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About
