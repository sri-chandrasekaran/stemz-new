import React from 'react'
import './Form.css'
import emailjs from 'emailjs-com';

const Form = () => {

  function sendEmail(e){
    e.preventDefault();

    emailjs.sendForm('service_7pimng3', 'template_b6eosns', e.target, 'DviTaX-eIKsbAplRV')
    .then(res=>{
      console.log(res);
      setTimeout(() => {
        e.target.reset();
      }, 50);
      
    }).catch(err=> console.log(err));
  }
  return (
    <div className='form'>
        <form onSubmit={sendEmail}>
            <label>Name</label>
            <input type='text' name='name'></input>
            <label>Email</label>
            <input type='email' name='user_email'></input>
            <label>Reason for Contact</label>
            <div>
              <label>
                <input type='radio' name='reason' value='general' />
                General Inquiry
              </label>
              <label>
                <input type='radio' name='reason' value='feedback' />
                Feedback
              </label>
              <label>
                <input type='radio' name='reason' value='request a course' />
                Request a Course
              </label>
              <label>
                <input type='radio' name='reason' value='partnership' />
                Partnership
              </label>
            </div>
            <label>Details</label>
            <textarea rows='6' name='message' placehold='Type your message here'/>
            {/* make the link somehow send to email address */}
            <button type='submit' className="secondary-button" style={{width: '100px', marginLeft: '220px'}}>Submit</button>
        </form>
    </div>
  )
}


export default Form
