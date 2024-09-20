import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import Quiz from '../components/Quiz'


const Astroquiz = () => {
    return (
        <div>
            <Navbar/>
            <HeroOther overlayText="Astronomy Quiz"/>
            <div className='vidbig'>
                <Quiz src="/assets/astroquiz.json" />
            </div>   
            <div style={{ paddingBottom: '200px' }} />
            <Footer />
        </div>
    );
}

export default Astroquiz;