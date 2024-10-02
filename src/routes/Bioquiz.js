import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import Quiz from '../components/Quiz'


const Bioquiz = () => {
    return (
        <div>
            <Navbar/>
            <HeroOther overlayText="Biochemistry Quiz"/>
            <div className='vidbig'>
                <Quiz src="/assets/bioquiz.json" />
            </div>   
            <div style={{ paddingBottom: '200px' }} />
            <Footer />
        </div>
    );
}

export default Bioquiz;