import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import Quiz from '../components/Quiz'


const ESquiz = () => {
    return (
        <div>
            <Navbar/>
            <HeroOther overlayText="Environmental Science Quiz"/>
            <div className='vidbig'>
                <Quiz src="/assets/envsciquiz.json" />
            </div>   
            <div style={{ paddingBottom: '200px' }} />
            <Footer />
        </div>
    );
}

export default ESquiz;