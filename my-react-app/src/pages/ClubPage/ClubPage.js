import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import PostStream from '../../components/PostStream/PostStream.js'
import './ClubPage.css'

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
    <body>
      <header class='header-content'>
        <div class='profile-img'>
          <img src="club-image.jpg" alt="Club Image"/>
        </div>
        <div class='club-name'>{clubName}</div>
      </header>
      <main>
        <div class='club-info'>
          <h2>Description</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac libero eget diam consequat tincidunt. Mauris eget magna ipsum.</p>
          <h2>Contact Info</h2>
          <p>Email: email@email.com<br/>Other Socials: ?</p>
        </div>
        <div class='post-stream'>
          <PostStream posts={posts} /> 
        </div>
      </main>
    </body>
  );
}

export default ClubPage;