import React, { useState } from 'react';
import './Navbar.css'; 
import IconImg from '../../assets/unnamed.png';
import SearchImg from '../../assets/search.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const[menu,setMenu]= useState("home");
  return (
    <div className="navbar">
      <img src={IconImg} alt="rc" width="250" height="200" />

      <ul className="navbar-menu">
        <Link onClick={()=>setMenu("Home")}className={menu=="Home"?"active":""}>Home</Link> 
         <a href='#About-Information' onClick={()=>setMenu("About")}className={menu=="About"?"active":""}>About</a> 
          <a href='#Mobile-app-download' onClick={()=>setMenu("Mobile App")}className={menu=="Mobile App"?"active":""}>Mobile App</a>
        <a href='#footer' onClick={()=>setMenu("Contacts")}className={menu=="Contacts"?"active":""}>Contacts</a>   
      </ul>
      <div className="navbar-right">
        <img src={SearchImg} alt="sd" width="25" />
        <div className="dot"></div>
        <button  className="sign-in-Button">Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
