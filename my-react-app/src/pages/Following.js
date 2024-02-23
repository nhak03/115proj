// import React, { useState } from 'react';
// import Post from '../components/Post/Post.js';
import PostStream from '../components/PostStream/PostStream.js'
import Header from '../components/Header/Header.js';

function Following(){
    const posts = [
        {
          Author: 'Administration',
          Title: 'Information',
          Description: "Serving you the static /following page",
          timestamp: '2021-02-01T18:00:00.000Z'
        },
        {
          Author: 'Art Club',
          Title: 'Art Exhibition',
          Description: 'Explore the world of creativity at our upcoming art exhibition. Our talented artists will showcase their latest works. Admission is free, and everyone is welcome!',
          timestamp: '2024-02-10T19:30:00.000Z'
        },
        {
          Author: 'Computer Science Club',
          Title: 'Coding Workshop',
          Description: 'Learn the basics of coding with our hands-on workshop. Whether you are a beginner or an experienced coder, this event is a great opportunity to enhance your skills and connect with fellow enthusiasts.',
          timestamp: '2024-02-15T15:00:00.000Z'
        },
        {
          Author: 'Environmental Club',
          Title: 'Nature Cleanup Day',
          Description: 'Join us in preserving the environment by participating in our Nature Cleanup Day. Together, we can make a positive impact on our local ecosystem. Gloves and bags will be provided.',
          timestamp: '2024-02-20T09:00:00.000Z'
        },
        // Add more posts as needed
      ];
    return(
        <div className="Following">
            <div>
                <Header />
                <div>
                  <PostStream posts={posts} />
                </div>
            </div>
        </div>
    );
}

export default Following;