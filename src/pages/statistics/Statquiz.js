import React from 'react'
import Navbar from '../../components/Navbar'
import HeroOther from '../../components/HeroOther'
import Footer from '../../components/Footer'
import Quiz from '../../components/Quiz'

import '../css/allvideo.css';

const Statquiz = () => {
    return (
        <div>
            <Navbar/>
            <HeroOther overlayText="Statistics Quiz"/>
            <div className='vidbig'>
                <Quiz src="/assets/statquiz.json" />
            </div>   
            <div style={{ paddingBottom: '200px' }} />
            <Footer />
        </div>
    );
}

export default Statquiz;