
// import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'; // npm install react-router-dom
import Following from './pages/Following.js';
import './App.css'
import SignIn from './components/auth/SignIn.jsx';
import SignUp from './components/auth/SignUp.jsx';
import AuthDetails from './components/auth/AuthDetails.jsx';
import Discover from './pages/Discover.js';

import WhatsNew from './pages/WhatsNew.js';


function App() {
  // const [showHello, setShowHello] = useState(false);
  

  return (

    // SHOULD BE UNCOMMENTED AFTER LOGIN STUFF COMPLETE

      <div className="App">
        <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<WhatsNew/>} />
            <Route path="/following" element={<Following/>} />
            <Route path='/discover' element={<Discover/>}/>
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