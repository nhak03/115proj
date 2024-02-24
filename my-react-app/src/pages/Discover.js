import React from 'react';

// import Post from '../components/post/Post'
import Header from '../components/Header/Header.js'
import SearchBar from '../components/search/SearchBar.js'
import CreateClubButton from '../components/createClubButton/createClubButton.js'
import useAuthState from '../components/auth/useAuthState.js';
import { auth } from '../firebase.js';

// request club_list from backend
// render search_bar, pass parameter, club_list to search_bar



function Discover() {
  const authUser = useAuthState();
    return (
        <div>
          <Header />
          <div>
            {authUser && <CreateClubButton />}
            {authUser && authUser.clubStatus && <p>If you see this, you are a club owner. {authUser.clubName}</p>}
          </div>
          <div>
            <SearchBar />
          </div>
        </div>
    )
}
 
export default Discover;