import React from 'react'
import './footer.css';
import {AiFillInstagram,AiFillFacebook,AiFillYoutube} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className="footer">
        <div className="wrapper">
            <div className="row">
                <div className="logo">ShopApp</div>
                <div className="icon">
                    <a href="/"><AiFillInstagram/></a>
                    <a href="/"><AiFillFacebook/></a>
                    <a href="/"><AiFillYoutube/></a>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="footer-heading">Info</div>
                <a href="/">About us</a>
                <a href="/">contact us</a>
                <a href="/">work with us</a>
                <a href="/">ts & cs</a>
                <a href="/">privacy policy</a>
            </div>
            <hr />
            <div className="row">
                <div className="footer-heading">Customer care</div>
                <a href="/">shipping</a>
                <a href="/">returns</a>
                <a href="/">inclusive sizing</a>
                <a href="/">payment methods</a>
                <a href="/">gift cards</a>
            </div>
        </div>
        <div className="contact-info">
         <p>customerservice@ashopapp.com | +91 1234567890 | mon - fri | 9AM - 5PM</p>
        </div>
    </div>
  )
}

export default Footer