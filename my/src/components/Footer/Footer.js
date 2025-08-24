import React from 'react'
import './Footer.css'
import logo from '../../assets/logo.png'
import facebook from '../../assets/facebook.png'
import googleplay from '../../assets/google play.jpeg'
import gmail from '../../assets/gmail.png'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>
                <div className='footer-content-left'>
                    <img src={logo} alt=" " />
                    <p>asdfghjklpoiuytrewqazzxcvbnmasdfghjklqwertyuio</p>
                    <div className="footer-social-icons">
                        <img src={facebook} alt=" " />
                        <img src={googleplay} alt=" " />
                        <img src={gmail} alt=" " />
                    </div>
                </div>
                <div className='footer-content-centre'>
                    <h2>  Company </h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className='footer-content-right'>
                    <h2>Get In Touch</h2>
                    <ul>
                        <li>contact@foodExpress.com</li>
                        <li> +8802-01968283116</li>
                    </ul>
                </div>

                
            </div>
            <hr />
            <p className="footer-copyright">
                Copyright 2025 © FoodExpress.com - All rights reserved.
            </p>
        </div>
    )
}

export default Footer
