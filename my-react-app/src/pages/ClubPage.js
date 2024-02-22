import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Header from '../components/Header/Header.js'
import PostStream from '../components/PostStream/PostStream.js'

function ClubPage() {
  const [posts, setPosts] = useState([]);
  let { clubName } = useParams();

  // change this to only collect club's posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const backend_response = await fetch('/get_posts', {
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
    <div>
      <Header />
      <div>
        <h1>{clubName}</h1>
      </div>
      <PostStream posts={posts} />
  </div>
  );
}

export default ClubPage;