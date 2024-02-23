// Post.js

import React from 'react';
import './Post.css'; // Import your CSS file for styling

function Post(post) {
    return (
        <div class="post">
            <div class='author'><a href={"/club_page/" + post.Author} class="highlight-on-hover">{post.Author}</ a></div>
            <div class='title'>{post.Title}</div>
            <div class='description'>{post.Description}</div>
            {post.Image && <img src={post.Image} alt='Post'/>}
        </div>
    );
}

export default Post;
