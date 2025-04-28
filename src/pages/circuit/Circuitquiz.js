import React from 'react'
import Navbar from '../../components/Navbar'
import HeroOther from '../../components/HeroOther'
import Footer from '../../components/Footer'
import Quiz from '../../components/Quiz'

import '../css/allvideo.css';


const Circuitquiz = () => {
    return (
        <div>
            <Navbar/>
            <HeroOther overlayText="Circuit Quiz"/>
            <div className='vidbig'>
                <Quiz src="/assets/circuitquiz.json" />
            </div>   
            <div style={{ paddingBottom: '200px' }} />
            <Footer />
        </div>
    );
}

export default Circuitquiz;