import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import PostStream from '../../components/PostStream/PostStream.js'
import './ClubPage.css'
import FollowButton from '../../components/FollowButton/FollowButton.js'
import CreatePost from '../../components/createPost/createPost.js'

//for profile function
import useAuthState from '../../components/auth/useAuthState.js';

function ClubPage() {
  const [posts, setPosts] = useState([]);
  let { clubName } = useParams();
  const authUser = useAuthState();

  // change this to only collect club's posts
  useEffect(() => {

    //make post fetch request to backend
    const fetchPosts = async () => {
      try {
        const backend_response = await fetch('/get_posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        if(backend_response.ok){
          console.log("Server recieved our request to query the database.");
        }
        const backendStatus = await backend_response.json();
        if(backendStatus.success){
          setPosts(backendStatus.posts);
          console.log("displaying posts...");
        }
      } catch (error) {
        console.error('Error fetching posts: ', error);
      }
    };
      
    fetchPosts(); //call backend request for posts
  }, []);

  return (
    <body>
      <header>
        <div class='header-content'>
          <div class='profile-img'>
            <img src="club-image.jpg" alt="Club"/>
          </div>
          <div class='club-name'>{clubName}</div>
          <div><FollowButton user={authUser} clubName={clubName}/></div>
        </div>
        <div>
          <nav>
            <ul>
              <li><a href="/">What's New</a></li>
              <li><a href="/following">Following</a></li>
              <li><a href="/discover">Discover</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <div class='club-info'>
          <h2>Description</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac libero eget diam consequat tincidunt. Mauris eget magna ipsum.</p>
          <h2>Contact Info</h2>
          <p>Email: email@email.com<br/>Other Socials: ?</p>
        </div>
        <div class='post-stream'>
          <div>
            {authUser && authUser.clubStatus && <CreatePost/>}
          </div>
          <PostStream posts={posts} /> 
        </div>
      </main>
    </body>
  );
}

export default ClubPage;