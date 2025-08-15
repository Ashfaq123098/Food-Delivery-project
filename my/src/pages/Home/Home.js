import React, { useState } from 'react';
import './Home.css'
import MobileAppDownload from '../../components/MobileAppDownload/MobileAppDownload';
import AboutInformation from '../../components/AboutInformation/AboutInformation';
const Home = () => {
  const[category,setCategory]= useState("All")
  return (
    <div>
      <hr/>
      <AboutInformation/>

      
      <hr/>
        <MobileAppDownload/>
        <hr/>
    </div>
  )
}

export default Home