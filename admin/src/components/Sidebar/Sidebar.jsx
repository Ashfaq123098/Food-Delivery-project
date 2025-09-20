import React from 'react'
import './Sidebar.css'
import add_icon from '../../assets/add_icon_white.png';
import order_icon from '../../assets/307975_stock-photo-shopping-cart-icon-dark-red-isolated-on-white-background.jpg';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to= '/add' className="sidebar-option">
           <img className='add_icon' src={add_icon} alt="add_icon" />
           <p>
            Add Items
           </p>
           </NavLink>
        
         < NavLink to = '/list' className="sidebar-option">
           <img className='order_icon' src={order_icon} alt="order_icon" />
           <p>
            List Items
           </p>
        </NavLink>
         <NavLink to = '/orders' className="sidebar-option">
           <img className='order_icon' src={order_icon} alt="order_icon" />
           <p>
            Orders Items
           </p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar;