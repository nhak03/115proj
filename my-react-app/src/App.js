
import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'; // npm install react-router-dom
import FollowingForm from './Following.js';
import HomeForm from './Home.js';
import Post from './Post.js';
import Header from './Header.js';
import './App.css'
import SignIn from './components/auth/SignIn.jsx';
import SignUp from './components/auth/SignUp.jsx';
import AuthDetails from './components/AuthDetails.jsx';

import AddData from './AddData.js';


function App() {
  const [showHello, setShowHello] = useState(false);
  

  return (

    // SHOULD BE UNCOMMENTED AFTER LOGIN STUFF COMPLETE

      <div className="App">
        
        {/* <div>
          <Header />
          <div>
            {posts.map(post => (
              <Post
                key={post.id}
                title={post.title}
                timestamp={new Date(post.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                content={post.content}
              />
            ))}
          </div>
        </div> */}

        <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<HomeForm/>} />
            <Route path="/following" element={<FollowingForm/>} />
            <Route path='/AddData' element={<AddData/>}/>
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