import React from 'react'
import './Navbar.css'
import logo from '../../assets/unnamed.png';
import profile from '../../assets/courage-get-5-user-login-flashed-prints-user-profile-home-page-login-avatar-user.png';
const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={logo} alt="logo" />
        <img className='profile' src={profile} alt="profile" />
       
    </div>
  )
}

export default Navbar;