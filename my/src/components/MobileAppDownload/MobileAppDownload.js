import React from 'react';
import './MobileAppDownload.css';

const MobileApp = () => {
  return (
    <section className="mobile-app" id="Mobile-app-download">
      <h2>📱 Download Our Mobile App</h2>

      <div className="mobile-app-content">
        {/* Left Side: Features */}
        <div className="app-features">
          <h3>Get the best experience with our app</h3>
          <ul>
            <li>🍔 Order food with just a few taps</li>
            <li>🚴 Track your delivery in real-time</li>
            <li>💰 Exclusive app-only discounts</li>
            <li>❤️ Save your favorite orders</li>
            <li>⚡ Quick reordering</li>
          </ul>

          {/* App Store / Google Play Buttons */}
          <div className="app-download-buttons">
            <a 
              href="https://www.apple.com/app-store/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="store-btn apple-btn"
            >
               Download on App Store
            </a>
            <a 
              href="https://play.google.com/store/games?hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="store-btn google-btn"
            >
              ▶ Get it on Google Play
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileApp;
