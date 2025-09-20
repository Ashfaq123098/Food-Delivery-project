import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2>Food Express Limited</h2>
          <p>
            We understand that hunger waits for no one. Our mission is to deliver your favorite meals quickly, fresh, and safely right at your doorstep.
          </p>
        </div>

        <div className="footer-center">
          <h3>Company</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#About-Information">About</a></li>
            <li><a href="/">Delivery</a></li>
            <li><a href="https://worldexpressdeliveryinc.com/privacy-policy/index.html">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-right">
          <h3>Get in Touch</h3>
          <ul>
            <li><a href="tel:+88001993259223">📞 +880-019-932-592-23</a></li>
            <li><a href="mailto:contact1@expressdelivery.com">📧 contact1@expressdelivery.com</a></li>
            <li><a href="mailto:contact2@expressdelivery.com">📧 contact2@expressdelivery.com</a></li>
          </ul>

          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">🌐 Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🌐 Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">🌐 Instagram</a>
          </div>
        </div>
      </div>

      <hr />

      <p className="footer-copy">
        &copy; {new Date().getFullYear()} Food Express Limited. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;


