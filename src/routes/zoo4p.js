import React from 'react'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import './allvideo.css';

const es1s = () => {
  return (
    <div>
      <Navbar/>
      <HeroOther overlayText="Lesson 4: Behavior"/>
      <div className='vidbig'>
        <iframe className='astrovid' width="700" height="480" src="https://www.youtube.com/embed/x8jMSVan1Rc" frameborder="0" allowfullscreen></iframe>
        <div className='centered-container'>
        <Link to="https://docs.google.com/presentation/d/e/2PACX-1vS5KaeSf32S394bhu9vua0eUfunuux9VhP7ueX67W2R6-v5YfIlm9C2uaAbp2GTzU7nSBzREG_cRvzZ/pub?start=false&loop=false&delayms=3000&slide=id.p" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Slideshow</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vQyR64BbTWMe_oxssR9UqZqMJyW7-sQNFt6VamLuBk3QPSkdVwcacjZF4vXNNiQnzKN7SGYx5LG6Nib/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Worksheet</button>
                  </Link>
                  <Link to="https://docs.google.com/document/d/e/2PACX-1vRsDEVkyb4Grq57TOiU5JDwqdQla_IgxvjcgeTjOUEK-uhZHluE4zaEU_Mq60OXLtATQJDBP22DdX87/pub" target="_blank" rel="noopener noreferrer">
                    <button className="course-button">Parent Notes</button>
                  </Link>
        </div>
      </div>
      <div style={{ paddingBottom: '200px' }} />
      <Footer/>
    </div>
  )
}

export default es1s
