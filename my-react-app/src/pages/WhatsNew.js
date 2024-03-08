import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header.js'
import PostStream from '../components/PostStream/PostStream.js'

function WhatsNew() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
        const pageType = 'whatsnew';
        try {
            const backend_response = await fetch('/get_posts', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ pageType })
            });
            if(backend_response.ok){
              console.log("Server recieved our request to query the database.");
            }
            const backendStatus = await backend_response.json();
            if(backendStatus.success){
              // console.log("Server responded with a success!");
              // success respond means that we have the array
              setPosts(backendStatus.posts);
              console.log("displaying posts...");
            }
        } catch (error) {
            console.error('Error fetching posts: ', error);
        }
    };
    
    fetchPosts();
}, []);

  return (
    <div className="Home">
      <Header />
      <div>
        <PostStream posts={posts} />
      </div>
    </div>
  );
}

export default WhatsNew;