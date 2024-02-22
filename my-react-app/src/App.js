
// import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'; // npm install react-router-dom
import Following from './pages/Following.js';
// import HomeForm from './Home.js';
// import Post from './components/Post/Post.js';
// import Header from './components/Header/Header.js';
import './App.css'
import SignIn from './components/auth/SignIn.jsx';
import SignUp from './components/auth/SignUp.jsx';
import AuthDetails from './components/auth/AuthDetails.jsx';
import Discover from './pages/Discover.js';
import Profile from './pages/Profile.js'
import ClubPage from './pages/ClubPage.js'
import WhatsNew from './pages/WhatsNew.js';


function App() {
  

  return (
      <div className="App">
        <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<WhatsNew/>} />
            <Route path="/following" element={<Following/>} />
            <Route path='/discover' element={<Discover/>}/>
            <Route path="/profile" element={<Profile />} />
            <Route path="/club_page/:clubName" element={<ClubPage />} />
          </Routes>
        </div>
        </BrowserRouter>

        <SignIn />
        <SignUp />
        <AuthDetails />

        
        
      </div>
  );
}

export default App;