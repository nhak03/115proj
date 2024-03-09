import React, { useState, useEffect } from 'react';
import Post from '../components/Post/Post.js';
import PostStream from '../components/PostStream/PostStream.js'
import Header from '../components/Header/Header.js';
import useAuthState from '../components/auth/useAuthState.js';

function Following(){
    const [posts, setPosts] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const authUser = useAuthState();

    useEffect(() => {
      const fetchPosts = async () => {
          const pageType = 'following';
          if(authUser){
            let email = authUser.authUser.email;
            let userPath = authUser.authUser.uid;
            try {
                const backend_response = await fetch('/get_posts', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ pageType, email, userPath })
                });
                if(backend_response.ok){
                  console.log("Server saw our GET for /following");
                }
                const backendStatus = await backend_response.json();
                if(backend_response.status === 206){
                  console.log("206 case");
                  let msg = backendStatus.message;
                  setErrorMsg(msg);
                  return;
                }
                if(backendStatus.success){
                  // console.log("Server responded with a success!");
                  // success respond means that we have the array
                  setPosts(backendStatus.posts);
                  console.log("displaying posts...");
                }
            } catch (error) {
                console.error('Error fetching posts: ', error);
            }
          }
      };
      
      fetchPosts();
  }, [authUser]);

    return(
      <div>
      <Header/>
      <h1>Following Tab!</h1>
      <h1>{errorMsg}</h1>
      {authUser ? (
          <div>
            <PostStream posts={posts} />
          </div>
      ) : (
          <p>Please sign in to see your following page!</p>
      )}
  </div>
    );
}

export default Following;