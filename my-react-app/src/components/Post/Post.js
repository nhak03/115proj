// Post.js

import React from 'react';
import './Post.css'; // Import your CSS file for styling

const Post = ({ title, timestamp, content }) => {
    return (
        <div className="post">
            <h2>{title}</h2>
            <p className="timestamp">Posted on {timestamp}</p>
            <p className="content">{content}</p>
        </div>
    );
}

export default Post;
