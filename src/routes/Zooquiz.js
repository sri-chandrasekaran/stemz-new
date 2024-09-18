import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import Quiz from '../components/Quiz'


const Zooquiz = () => {
    return (
        <div>
            <Navbar/>
            <HeroOther overlayText="Zoology Quiz"/>
            <div className='vidbig'>
                <Quiz src="/assets/zooquiz.json" />
            </div>   
            <div style={{ paddingBottom: '200px' }} />
            <Footer />
        </div>
    );
}

export default Zooquiz;