import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import './Home.css'
import PhotoCarousel from '../components/PhotoCarousel';
import Cards from '../components/Cards'
import Notification from '../components/Notification'
import Folsom from '../assets/folsom.png'
// import Banner from '../components/banner';

const Home = () => {

    const [showNotification, setShowNotification] = useState(true);

    useEffect(() => {
        const notificationShown = localStorage.getItem('notificationShown');
        if (!notificationShown) {
            setShowNotification(true);
            localStorage.setItem('notificationShown', 'true');
          } else {
            setShowNotification(false);
          }
        }, []);

    const handleCloseNotification = () => {
        setShowNotification(false);
    };


  return (
    <div>
        {showNotification && (<Notification onClose={handleCloseNotification} />)}
        <Navbar />
        <Hero>
            <h1 className="hero-title">Education through experimentation.</h1>
            <p className="hero-description">Making engaging curriculum accessible to all.</p>
        </Hero>
        <div className='mission'>
            <h1>Mission Statement</h1>
            <p>STEMz Learning  strives to provide elementary school students with curriculum centered 
            around experiments and hands-on learning. Our main goal is to introduce complex topics in 
            palatable, engaging ways that inspire kids to learn more.</p>
            <div className="action-buttons">
            <Link to="/online-classes">
                <button className="cta-button">Sign Up for Classes</button>
            </Link>
            <Link to="/self-paced-classes">
                <button className="secondary-button">Access Curriculum</button>
            </Link>
            </div>
        </div>
        <div className='us'>
            <h1>Who Are We?</h1>
            <p> STEMz Learning is a youth-led outreach 501(c)3 nonprofit based in Folsom, California, that wants 
                to make STEM education more accessible to elementary school students, grades 1-6. We 
                provide free curriculum for both self-guided and parent-guided learners as well as free
                online courses.
            </p>
            <img src={Folsom} alt="Folsom" className="folsom-img"/>
        </div>
        <PhotoCarousel />
        <Cards />
        <div style={{ paddingBottom: '100px' }} />
        <Footer />
    </div>
)
}

export default Home
