// import React, { useState } from 'react';
import Post from '../components/Post/Post.js';
import Header from '../components/Header/Header.js';

function Following(){
    const posts = [
        {
          id: 1,
          club: 'Administration',
          title: 'Information',
          content: "Serving you the static /following page",
          timestamp: '2021-02-01T18:00:00.000Z'
        },
        {
          id: 2,
          club: 'Art Club',
          title: 'Art Exhibition',
          content: 'Explore the world of creativity at our upcoming art exhibition. Our talented artists will showcase their latest works. Admission is free, and everyone is welcome!',
          timestamp: '2024-02-10T19:30:00.000Z'
        },
        {
          id: 3,
          club: 'Computer Science Club',
          title: 'Coding Workshop',
          content: 'Learn the basics of coding with our hands-on workshop. Whether you are a beginner or an experienced coder, this event is a great opportunity to enhance your skills and connect with fellow enthusiasts.',
          timestamp: '2024-02-15T15:00:00.000Z'
        },
        {
          id: 4,
          club: 'Environmental Club',
          title: 'Nature Cleanup Day',
          content: 'Join us in preserving the environment by participating in our Nature Cleanup Day. Together, we can make a positive impact on our local ecosystem. Gloves and bags will be provided.',
          timestamp: '2024-02-20T09:00:00.000Z'
        },
        // Add more posts as needed
      ];
    return(
        <div className="Following">
            <div>
                <Header />
                <div>
                    {posts.map(post => (
                    <Post
                        key={post.id}
                        title={post.title}
                        timestamp={new Date(post.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                        content={post.content}
                    />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Following;