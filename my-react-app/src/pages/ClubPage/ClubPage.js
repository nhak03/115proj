import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import PostStream from '../../components/PostStream/PostStream.js'
import './ClubPage.css'
import FollowButton from '../../components/FollowButton/FollowButton.js'

//for profile function
import { auth } from '../../firebase.js'; // Ensure this path is correct
import { onAuthStateChanged } from 'firebase/auth';

function ClubPage() {
  const [posts, setPosts] = useState([]);
  let { clubName } = useParams();
  const [authUser, setAuthUser] = useState(null);

  // change this to only collect club's posts
  useEffect(() => {

    //copied from profile page
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } 
      else {
        setAuthUser(null);
      }
    });

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
    return () => unsubscribe(); //call unsubscribe (frontend db query)
  }, []);

  return (
    <body>
      <header class='header-content'>
        <div class='profile-img'>
          <img src="club-image.jpg" alt="Club"/>
        </div>
        <div class='club-name'>{clubName}</div>
        <div><FollowButton user={authUser} clubName={clubName}/></div>
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