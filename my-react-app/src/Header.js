// Header.js

import React from 'react';
import './Header.css';
import logo from './SL_logo.png'; // Update the path

const Header = () => {
  return (
    <header>
      <img src={logo} alt="SlimeLine Logo" className="logo" />
      <h1>SlimeLine</h1>
      <nav>
        <ul>
          <li><a href="/">What's New</a></li>
          <li><a href="/about">Following</a></li>
          <li><a href="/contact">About Us</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
