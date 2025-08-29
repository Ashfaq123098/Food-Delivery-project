import React from 'react';
import './MobileAppDownload.css'
import PlayStoreImg from '../../assets/images.jpeg';
import AppStoreImg from '../../assets/AppStore.svg';

const MobileAppDownload = () => {
  return (
    <div className='app-download' id='Mobile-app-download'>
        <p>For Better Experience Download<br/>ExpressDelivery App</p>
        <div className="app-download-platforms">
          <a href="https://play.google.com/store/games?hl=en&pli=1"
          >
             <img src={PlayStoreImg}  width="50" height="250" />
              </a>
              <a href="https://www.apple.com/app-store/"
                       
              >
              <img src={AppStoreImg}  width="50" height="250" />
              </a>
              
        </div>
        <div>
          <p>You want to be served with food that tastes delicious and you do not want to go out of your house? Stop looking! By using our <b>Express Delivery App</b>, your smartphone is all you need to quench the thirst of your stomach. Our application can help you find several restaurants around that offer a variety of meals such as; Pizza, Burger, Biriani, Kachhi or healthy foods.</p>
        </div>
    </div>
  )
}

export default MobileAppDownload