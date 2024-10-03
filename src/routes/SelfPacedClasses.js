import React from 'react'
import './css/SelfPacedClasses.css'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import AstronomyImage from '../assets/astronomy.PNG'
import Coding from '../assets/coding.jpg'
import Biochemistry from '../assets/biochem.PNG'
import Chemistry from '../assets/chemistry.jpeg'
import Circuits from '../assets/circuits.jpg'
import ES from '../assets/environmentalscience.jpg'
import Psych from '../assets/psych.jpeg'
import Stats from '../assets/statistics.jpeg'
import Zoology from '../assets/zoology.jpg'
import {Link} from 'react-router-dom'

const SelfPacedClasses = () => {

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    }
  return (
    <div>
        <Navbar />
        <HeroOther overlayText="Self-Paced Classes"/>
        <div className='shifting-all-grids'>
        <h3 className='header-small'>Each lesson of the course contains a video, presentation, supplementary notes, and occasionally a worksheet. </h3>
            <div className='grid-container'>
                <div className='grid-cell'>
                    <img src={AstronomyImage} alt="Astronomy" className="img-course"/>
                    <h1>Astronomy</h1>
                    <p>In this course we will learn about galaxies, the universe, constellations and much more!</p>
                    <Link to="./astronomy" onClick={scrollToTop}>
                    <button className="cta-button courses-button" style={{marginTop:'93px'}}>Access Lessons</button>
                    </Link>
                </div>
                <div className='grid-cell'>
                    <img src={Coding} alt="Coding" className="img-course"/>
                    <h1>Basics of Coding</h1>
                    <p>In this course we will learn about movement, variables, conditional statements and many more, using Scratch. No prior experience is needed!</p>
                    <Link to="./basics-of-coding" onClick={scrollToTop}>
                    <button className="cta-button courses-button">Access Lessons</button>
                    </Link>
                </div>
                <div className='grid-cell'>
                    <img src={Biochemistry} alt="Biochemistry" className="img-course"/>
                    <h1>Biochemistry</h1>
                    <p>In this course we will learn about molecules, atoms, proteins and more; we encourage the completion of the Chemistry course prior! Parent supervision is needed.</p>
                    <Link to="./biochemistry" onClick={scrollToTop}>
                    <button className="cta-button courses-button">Access Lessons</button>
                    </Link>
                </div>
            </div>
            <div className='grid-container'>
                <div className='grid-cell'>
                    <img src={Chemistry} alt="chemistry" className="img-course"/>
                    <h1>Chemistry</h1>
                    <p>In this course, your child will learn about matter, energy, and chemical reactions. The course culminates in a final project that serves as a launching pad to inspire your child to learn more! Parent supervision needed.</p>
                    <Link to="./chemistry" onClick={scrollToTop}>
                    <button className="cta-button courses-button">Access Lessons</button>
                    </Link>
                </div>
                <div className='grid-cell'>
                    <img src={Circuits} alt="Circuits" className="img-course"/>
                    <h1>Circuits</h1>
                    <p>In this course, your child will learn about the basics of circuits and how they are used in everyday items. </p>
                    <Link to="./circuits" onClick={scrollToTop}>
                    <button className="cta-button courses-button" style={{marginTop:'93px'}}>Access Lessons</button>
                    </Link>
                </div>
                <div className='grid-cell'>
                    <img src={ES} alt="Environmental Science" className="img-course"/>
                    <h1>Environmental</h1>
                    <h1>Science</h1>
                    <p>In this course, we will learn about biodiversity, the cycles of the earth, pollution, recycling, and more!</p>
                    <Link to="./environmental-science" onClick={scrollToTop}>
                    <button className="cta-button courses-button">Access Lessons</button>
                    </Link>
                </div>
            </div>
            <div className='grid-container'>
                <div className='grid-cell'>
                    <img src={Psych} alt="Psychology" className="img-course"/>
                    <h1>Psychology</h1>
                    <p>In this course, we will learn about biodiversity, the cycles of the earth, pollution, recycling, and more!</p>
                    <Link to="./psychology" onClick={scrollToTop}>
                    <button className="cta-button courses-button" style={{marginBottom:'90px'}}>Access Lessons</button>
                    </Link>
                </div>
                <div className='grid-cell'>
                    <img src={Stats} alt="Statistics" className="img-course"/>
                    <h1>Statistics</h1>
                    <p>In this course, we will dive into different subtopics of statistics, such as fractions & percents, graphing, and real world-applications.</p>
                    <Link to="./statistics" onClick={scrollToTop}>
                    <button className="cta-button courses-button">Access Lessons</button>
                    </Link>
                </div>
                <div className='grid-cell'>
                    <img src={Zoology} alt="Zoology" className="img-course"/>
                    <h1>Zoology</h1>
                    <p>In this course we will learn about the field of zoology, some topics include biodiversity, taxonomy, and anatomy.</p>
                    <Link to="./zoology" onClick={scrollToTop}>
                    <button className="cta-button courses-button">Access Lessons</button>
                    </Link>
                </div>
            </div>
        </div>
        <div style={{ paddingBottom: '100px' }} />
        <Footer />
    </div>
  )
}

export default SelfPacedClasses