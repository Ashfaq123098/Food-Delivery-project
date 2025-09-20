import React from 'react'
import './Navbar.css'
import Logo from '../../assets/unnamed.png'
import profile from '../../assets/profile.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={Logo} alt="" />
      <img className='profile' src={profile} alt="" />
    </div>
  )
}

export default Navbar