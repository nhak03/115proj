// Header.js

import React, { useState } from 'react';
import './Header.css';
import logo from './SL_logo.png';
import Modal from '../Modal.js';
import useAuthState from '../auth/useAuthState.js';
import SignIn from '../auth/SignIn.jsx';
import SignUp from '../auth/SignUp.jsx';
import AuthDetails from '../auth/AuthDetails.jsx';
import CreatePost from '../createPost/createPost.js';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const authUser = useAuthState();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <header className="header">
      <div className="top-bar">
        <div className="logo-container">
          <img src={logo} alt="SlimeLine Logo" className="logo" />
        </div>
        <h1>SlimeLine</h1>
        <div className="auth-controls">
          {authUser ? (
            <>
              <AuthDetails />
              {/* Implement the signOut function and pass it to AuthDetails if needed */}
            </>
          ) : (
            <button onClick={handleOpenModal}>Log In / Sign Up</button>
          )}
        </div>
      </div>
      <nav className="navigation">
        <ul>
          <li><a href="/">What's New</a></li>
          <li><a href="/following">Following</a></li>
          <li><a href="/discover">Discover</a></li>
          {authUser && authUser.clubStatus && <CreatePost />}
        </ul>
      </nav>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <SignIn />
          <SignUp />
        </Modal>
      )}
    </header>
  );
};

export default Header;
