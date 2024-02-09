import React from 'react';

// import Post from '../components/post/Post'
import Header from '../components/Header/Header.js'
import SearchBar from '../components/search/SearchBar.js'
import CreateClubButton from '../components/createClubButton/createClubButton.js'

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