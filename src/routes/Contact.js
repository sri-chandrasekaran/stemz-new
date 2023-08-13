import React from 'react';
import Navbar from '../components/Navbar';
import HeroOther from '../components/HeroOther'
import Form from '../components/Form'
import Footer from '../components/Footer'
// come back to this, make it look nicer

const Contact = () => {
  return (
    <div>
      <Navbar />
      <HeroOther overlayText="Contact Us" />
      <Form />
      <div style={{ paddingBottom: '100px' }} />
      <Footer />
    </div>
  )
}

export default Contact
