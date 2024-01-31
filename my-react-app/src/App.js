

import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'; // npm install react-router-dom
import TerminalForm from './TerminalForm';
import MultipleChoiceForm from './MultipleChoiceForm';

import Post from './Post';
import Header from './Header';


function App() {
  const [showHello, setShowHello] = useState(false);

  const posts = [
    {
      id: 1,
      club: 'Astronomy Club',
      title: 'Stargazing Night',
      content: "Join us for a stargazing night on the Science Hill. We'll have telescopes set up to observe the wonders of the night sky. Don't miss this celestial experience!",
      timestamp: '2024-02-01T18:00:00.000Z'
    },
    {
      id: 2,
      club: 'Art Club',
      title: 'Art Exhibition',
      content: 'Explore the world of creativity at our upcoming art exhibition. Our talented artists will showcase their latest works. Admission is free, and everyone is welcome!',
      timestamp: '2024-02-10T19:30:00.000Z'
    },
    {
      id: 3,
      club: 'Computer Science Club',
      title: 'Coding Workshop',
      content: 'Learn the basics of coding with our hands-on workshop. Whether you are a beginner or an experienced coder, this event is a great opportunity to enhance your skills and connect with fellow enthusiasts.',
      timestamp: '2024-02-15T15:00:00.000Z'
    },
    {
      id: 4,
      club: 'Environmental Club',
      title: 'Nature Cleanup Day',
      content: 'Join us in preserving the environment by participating in our Nature Cleanup Day. Together, we can make a positive impact on our local ecosystem. Gloves and bags will be provided.',
      timestamp: '2024-02-20T09:00:00.000Z'
    },
    // Add more posts as needed
  ];
  

  return (
    <>
    <BrowserRouter>
      <div>
        <button onClick={() => setShowHello(true)}>Say Hello</button>
        {showHello && <p>Hello!</p>}

        <Routes>
          <Route path="/" element={<TerminalForm/>} />
          <Route path="/foo" element={<MultipleChoiceForm/>} />
        </Routes>
      </div>
    </BrowserRouter>

    <div>
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
    </div>
    </>
  );
}

export default App;