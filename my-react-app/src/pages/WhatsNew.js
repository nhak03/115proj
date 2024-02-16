import React, { useState, useEffect } from 'react';
// import Post from '../components/Post/Post.js'
import Header from '../components/Header/Header.js'

function WhatsNew() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const backend_response = await fetch('/whats_new', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' }
              // body: JSON.stringify({ clubName, clubType }),
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
      {posts ? (
        posts.map(post => (
          <div key={post.id}>
            <h3>{post.Title}</h3>
            <p>Author: {post.Author}</p>
            <p>{post.Description}</p>
            {post.Image && <img src={post.Image} alt="Post" />}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  </div>
  );
}

export default WhatsNew;