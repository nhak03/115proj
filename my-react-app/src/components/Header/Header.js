// Header.js

import React from 'react';
import './Header.css';
import logo from './SL_logo.png'; // Update the path
import CreatePost from '../createPost/createPost.js';
// import '../createPost/createPost.css';
import useAuthState from '../auth/useAuthState.js';

const Header = () => {
  const authUser = useAuthState();
  
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

      {
        /*
        Conditionally render the CreatePost button if and only if a user is authenticated
        And they are a club account as well.
        Extra error handling contained within CreatePost object
        */
      }
      <div>
        {authUser && authUser.clubStatus && <CreatePost/>}
      </div>
      
    </header>
  );
}

export default Header;
