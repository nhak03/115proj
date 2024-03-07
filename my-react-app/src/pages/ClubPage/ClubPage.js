import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import PostStream from '../../components/PostStream/PostStream.js'
import './ClubPage.css'
import FollowButton from '../../components/FollowButton/FollowButton.js'
import CreatePost from '../../components/createPost/createPost.js'
import Header from '../../components/Header/Header.js'
import ClubEditableTextBox from '../../components/ClubEditableTextBox/ClubEditableTextBox.js';
import useAuthState from '../../components/auth/useAuthState.js';
import { getClubDoc } from '../FirestoreService.js';

function ClubPage() {
  const [posts, setPosts] = useState([]);
  let { clubName } = useParams();
  const authUser = useAuthState();
  const [errorMessage, setErrorMessage] = useState('');
  const clubDoc = getClubDoc(clubName)
  const [description, setClubDescription] = useState('No Club Description');
  const [contactInfo, setClubContactInfo] = useState('No Club Contact Information');
  const [pageOwnerStatus, setPageOwnerStatus] = useState(false);
  
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
          // collect description and contact info for display
          console.log('fetched')
          console.log(clubDoc)
          // console.log("from jacks function" + clubDoc.then(function(result)))
          clubDoc.then(function(club){
            if (club.Description) {
              console.log("Description is set: " + club.Description)
              setClubDescription(club.Description)
            }
            if (club.Contact_Information) {
              setClubContactInfo(club.Contact_Information)
            }
          })

          // confirm club ownership
          if (authUser && authUser.Club_Doc_ID === clubDoc.id) {
            setPageOwnerStatus(true)
          }
          else {
            setPageOwnerStatus(false)
          }
        }
      } catch (error) {
        console.error('Error fetching posts: ', error);
      }
    };
      
    fetchPosts();
  }, [clubName, authUser]);

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
            <div>{!pageOwnerStatus && <FollowButton user={authUser && authUser.authUser} clubName={clubName}/>}</div>
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
            <div><ClubEditableTextBox initialText={description} formTitle={'Description'} Club_Doc_ID={clubDoc.id} pageOwnerStatus={pageOwnerStatus}/></div>
            <div><ClubEditableTextBox initialText={contactInfo} formTitle={'Contact Information'} Club_Doc_ID={clubDoc.id} pageOwnerStatus={pageOwnerStatus}/></div>
          </div>
          <div class='post-stream'>
            <div>
              {pageOwnerStatus && <CreatePost/>}
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