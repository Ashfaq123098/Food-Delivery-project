import React from 'react';
import { Link } from 'react-router-dom'; 
import './Footer.css';
import logo from '../../assets/logo.png';
import facebook from '../../assets/facebook.png';
import googleplay from '../../assets/Whatsapp_icon.jpg';
import gmail from '../../assets/gmail.png';

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>
                <div className='footer-content-left'>
                    <img src={logo} alt="Logo" />
                    <p>Welcome To Food Express Limited</p>
                    <div className="footer-social-icons">
                       
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                            <img src={facebook} alt="Facebook" />
                        </a>
                        <a href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer">
                            <img src={googleplay} alt="Google Play" />
                        </a>
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ashfaq.cse.20230104069@aust.edu" target="_blank" rel="noopener noreferrer">
    <img src={gmail} alt="Gmail" />
    </a>
                    </div>
                </div>

                <div className='footer-content-centre'>
                    <h2>Company</h2>
                    <ul>
                       <li><a href="/">Home</a></li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div className='footer-content-right'>
                    <h2>Get In Touch</h2>
                    <ul>
                        <li>
                            <a href="mailto:contact@foodExpress.com">contact@foodExpress.com</a>
                        </li>
                        <li>
                            <a href="tel:+8801993259223">+8801993259223</a>
                        </li>
                    </ul>
                </div>
            </div>

            <hr />

            <p className="footer-copyright">
                Copyright 2025 © FoodExpress.com - All rights reserved.
            </p>
        </div>
    );
};

export default Footer;
