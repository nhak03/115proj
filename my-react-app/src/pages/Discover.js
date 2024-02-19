import React from 'react';

// import Post from '../components/post/Post'
import Header from '../components/Header/Header.js'
import SearchBar from '../components/search/SearchBar.js'
import CreateClubButton from '../components/createClubButton/createClubButton.js'

// request club_list from backend
// render search_bar, pass parameter, club_list to search_bar


function Discover() {
    return (
        <div>
          <Header />
          <div>
            <CreateClubButton />
          </div>
          <div>
            <SearchBar />
          </div>
        </div>
    )
}
 
export default Discover;