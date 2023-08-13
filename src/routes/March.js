import React from 'react'
import Beaker from '../assets/beaker.png'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import './March.css'
import Erica from '../assets/erica.jpeg'
import Vaaruni from '../assets/vaaruni.jpg'
import Class4 from '../assets/class_4.jpg'


const March = () => {
  return (
    <div>
        <Navbar />
        <HeroOther overlayText="March 2023"/>
        <div className='upcoming'>
            <img src={Beaker} alt="Beaker" className="beaker-pic"/>
            <h2>Upcoming Projects</h2>
            <p>• Developing videos for student/parent led courses</p>
            <p>• Check out "When I Grow Up..." our Interview series on our youtube channel @STEMz Learning</p>
            <p>• STEMz Learning is planning a fundraiser in March 2023 - stay tuned for more!</p>
            <p>• Accepting donations at @STEMz Learning Inc on <a href="https://www.paypal.com/donate?hosted_button_id=8DW4JTSCNYKF4" className='hyperlink'>Paypal</a></p>
        </div>
        <div className='volunteer'>
            <h2>Volunteer Spotlight</h2>
            <div className='vol-column'>
              <img src={Vaaruni} alt="Vaaruni" className="vol-pic"/>
              <h3>Vaaruni Khanna</h3>
              <p>School: Junior at Folsom High</p>
              <p>Role: Director of Outreach and Recruitment</p>
              <p>"The kids are honestly the best part of this organization - I love the curiosity they bring to every class and enjoy teaching them because of the amazing environment both teachers and students work to create!"</p>
            </div>
            <div className='vol-column-second'>
              <img src={Erica} alt="Erica" className="vol-pic-second"/>
              <h3>Erica Huang</h3>
              <p>School: Senior at Folsom High</p>
              <p>Role: Internal Operations</p>
              <p>"I do STEMz Learning because I love seeing the bright energy of the kids and their excitement to learn. I also love working with the team and their dedication to doing great work!" </p>
            </div>
        </div>
        <div className='upcoming-other'>
            <img src={Class4} alt="Class" className="class-upcoming"/>
            <h2>Upcoming Classes</h2>
            <p>Zoology: January 7th to February 4th, Every Saturday</p>
            <p>10 - 11 AM PST</p>
            <p>Register <a href="/onlineclasses" className='hyperlink'>here</a>!</p>
        </div>
        <div style={{ paddingBottom: '200px' }} />
        <Footer />
    </div>
  )
}

export default March
