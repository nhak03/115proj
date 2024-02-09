import React, { useState, useEffect } from 'react';
import Post from '../components/Post/Post.js'
import Header from '../components/Header/Header.js'
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase.js'; // Correct way to import

function WhatsNew() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const postCollection = collection(firestore, 'posts');
            const querySnapshot = await getDocs(postCollection);
            const fetchedPosts = [];
            querySnapshot.forEach((doc) => {
                fetchedPosts.push({ id: doc.id, ...doc.data() });
            });
            setPosts(fetchedPosts);
        } catch (error) {
            console.error('Error fetching posts: ', error);
        }
    };

    fetchPosts();
}, []);

  return (
    <div className="Home">
      <Header />
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <h3>{post.Title}</h3>
            <p>Author: {post.Author}</p>
            <p>{post.Description}</p>
            {post.Image && <img src={post.Image} alt="Post" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhatsNew;