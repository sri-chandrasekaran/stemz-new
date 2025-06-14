// import React from 'react';
// import Navbar from '../../components/Navbar';
// import HeroOther from '../components/HeroOther'
// import Form from '../components/Form'
// import Footer from '../components/Footer'

// const Contact = () => {
//   return (
//     <div>
//       <Navbar />
//       <HeroOther overlayText="Contact Us" />
//       <Form />
//       <div className="contact-container" />
//       <div style={{ paddingBottom: '100px' }} />
//       <Footer />
//     </div>
//   )
// }

// export default Contact

import React from "react";
import Navbar from "../../components/Navbar";
import HeroOther from "../../components/HeroOther";
import Form from "../../components/Form";
import Footer from "../../components/Footer";
import "../css/Home.css";
import "../css/Contact.css";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <HeroOther overlayText="Contact Us" />
      <div className="contact-container">
        <Form />
      </div>
      <div style={{ paddingBottom: "100px" }} />
      <Footer />
    </div>
  );
};

export default Contact;
