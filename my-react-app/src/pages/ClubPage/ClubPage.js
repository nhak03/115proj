import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import PostStream from '../../components/PostStream/PostStream.js'
import './ClubPage.css'
import FollowButton from '../../components/FollowButton/FollowButton.js'
import CreatePost from '../../components/createPost/createPost.js'
import Header from '../../components/Header/Header.js'

//for profile function
import useAuthState from '../../components/auth/useAuthState.js';

function ClubPage() {
  const [posts, setPosts] = useState([]);
  let { clubName } = useParams();
  const authUser = useAuthState();
  const [errorMessage, setErrorMessage] = useState('');

  // to be used for the html page header
  const [clubTitle, setClubTitle] = useState('');

  // change this to only collect club's posts
  // change this to only collect club's posts
  useEffect(() => {
    const fetchPosts = async () => {
      const pageType = 'clubPage';
      try {
        const backend_response = await fetch('/get_posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pageType, clubName })
        });
        // if(backend_response.ok){
        //   console.log("Server recieved our request to query the database.");
        // }
        const backendStatus = await backend_response.json();

        if(backend_response.status === 404){
          console.log("404 error: " + backendStatus.error);
          let msg = "404 error: " + backendStatus.error;
          setErrorMessage(msg);
          return;
        }
        if(backend_response.status === 206){
          console.log("206 case");
          let msg = "Http 206: " + backendStatus.message;
          setErrorMessage(msg);
          return;
        }
        if(backendStatus.success){
          // console.log("Server responded with a success!");
          // success respond means that we have the array
          setPosts(backendStatus.posts);
          setClubTitle(backendStatus.clubTitle);
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
    {errorMessage &&
      <div>
        <Header/>
        <h1>{errorMessage}</h1>
      </div>
    }
    { !errorMessage &&
      <body>
        {/*Didn't use prebuilt header, since we want follow button to be present here*/}
        <header>
          <div class='header-content'>
            <div class='profile-img'>
              <img src="club-image.jpg" alt="Club"/>
            </div>
            <div class='club-name'>{clubTitle}</div>
            <div><FollowButton user={authUser && authUser.authUser} clubName={clubName}/></div>
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
    }
    </div>
  );
}

export default ClubPage;