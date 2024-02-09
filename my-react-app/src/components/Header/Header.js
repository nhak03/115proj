// Header.js

import React from 'react';
import './Header.css';
import logo from './SL_logo.png'; // Update the path
import CreatePost from '../createPost/createPost.js';
// import '../createPost/createPost.css';

const Header = () => {
  return (
    <header>
      <img src={logo} alt="SlimeLine Logo" className="logo" />
      <h1>SlimeLine</h1>
      <nav>
        <ul>
          <li><a href="/">What's New</a></li>
          <li><a href="/following">Following</a></li>
          <li><a href="/discover">Discover</a></li>
        </ul>
      </nav>

      {/* Added this div to display the create post button on all pages */}
      <div>
        <CreatePost/>
      </div>
      
    </header>
  );
}

export default Header;
