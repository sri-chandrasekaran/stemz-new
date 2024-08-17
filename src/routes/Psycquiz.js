import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import Quiz from '../components/Quiz'


const Psycquiz = () => {
    return (
        <div>
            <Navbar/>
            <HeroOther overlayText="Psycology Quiz"/>
            <div className='vidbig'>
                <Quiz src="/assets/psycquiz.json" />
            </div>   
            <div style={{ paddingBottom: '200px' }} />
            <Footer />
        </div>
    );
}

export default Psycquiz;