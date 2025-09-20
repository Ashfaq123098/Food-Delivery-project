import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import addIcon from '../../assets/add_icon_white.png';
import listIcon from '../../assets/ordericon.png';
import orderIcon from '../../assets/ordericon.png'; // can use different icon if needed

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink
          to="/add"
          className={({ isActive }) => "sidebar-option" + (isActive ? " active" : "")}
        >
          <img src={addIcon} alt="Add Items" />
          <p>Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) => "sidebar-option" + (isActive ? " active" : "")}
        >
          <img src={listIcon} alt="List Items" />
          <p>List Items</p>
        </NavLink>

        <NavLink
          to="/order"
          className={({ isActive }) => "sidebar-option" + (isActive ? " active" : "")}
        >
          <img src={orderIcon} alt="Orders" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
