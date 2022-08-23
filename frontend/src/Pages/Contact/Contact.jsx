import React from 'react'
import './contact.css'
import {AiOutlineMail} from 'react-icons/ai'
import {RiMessengerLine,RiWhatsappLine} from 'react-icons/ri'
import Heading from '../../Components/Heading/Heading'
import MetaData from '../../Components/MetaData'

const Contact = () => {

  return (
    <>
    <MetaData title={'Contact Us'}/>
    <Heading heading="Contact Us"/>
    <div className="contact-container">
     <div className="contact-box">
     <div className="contact-links">
      <div className="contact-link-box">
         <div className="icon"><AiOutlineMail/></div>
         <div className="link-name">Email</div>
         <div className="link-detail">tempmail@gmail.com</div>
         <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sv80629159@gmail.com" className="link-send">Send Message</a>
      </div>

      <div className="contact-link-box">
         <div className="icon"><RiMessengerLine/></div>
         <div className="link-name">Messenger</div>
         <div className="link-detail">Sunil Verma</div>
         <a>Send Message</a>
      </div>

      <div className="contact-link-box">
         <div className="icon"><RiWhatsappLine/></div>
         <div className="link-name">WhatsApp</div>
         <div className="link-detail">+1234567890</div>
         <a className="link-send">Send Message</a>
      </div>

     </div>
     <div className="form">
     <form>
     <div class="input-wrapper">
  <input type="text" id="user" required name='name'/>
  <label for="user"> name</label>
</div>

<div class="input-wrapper">
  <input type="email" required name="email"/>
  <label for="user">email</label>
</div>


<div class="input-wrapper">
  <textarea type="text" required rows='10' name='message'/>
  <label for="user">message</label>
</div>
     <button className="contact-hover-button" >Submit form</button>
     </form>
     </div>
     </div>
    </div>
    </>
  )
}

export default Contact