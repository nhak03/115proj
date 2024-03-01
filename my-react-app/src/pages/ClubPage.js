import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Header from '../components/Header/Header.js'
import PostStream from '../components/PostStream/PostStream.js'

function ClubPage() {
  const [posts, setPosts] = useState([]);
  let { clubName } = useParams();

  // to be used for the html page header
  const [clubTitle, setClubTitle] = useState('');

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
        if(backend_response.ok){
          console.log("Server recieved our request to query the database.");
        }
        const backendStatus = await backend_response.json();
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
      <Header />
      <div>
        <h1>{clubTitle}</h1>
      </div>
      <PostStream posts={posts} />
  </div>
  );
}

export default ClubPage;