import React from 'react'
import Navbar from '../../components/Navbar'
import HeroOther from '../../components/HeroOther'
import Footer from '../../components/Footer'
import Quiz from '../../components/Quiz'

import '../css/allvideo.css';

const Chemquiz = () => {
    return (
        <div>
            <Navbar/>
            <HeroOther overlayText="Chemistry Quiz"/>
            <div className='vidbig'>
                <Quiz src="/assets/chemquiz.json" />
            </div>   
            <div style={{ paddingBottom: '200px' }} />
            <Footer />
        </div>
    );
}

export default Chemquiz;