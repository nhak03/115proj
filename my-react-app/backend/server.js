import express from 'express';

import bodyParser from 'body-parser';

import { db } from '../src/firebase.js';



// const admin = require('firebase-admin');

import { addDoc, collection, getDocs } from "firebase/firestore"; 
import { firestore } from '../src/firebase.js'; // Correct way to import

const app = express();

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

app.post('/get_posts', async (req, res) => {
    console.log("Someone requested the / path");
    const postCollection = collection(firestore, 'posts');
    const querySnapshot = await getDocs(postCollection);
    let from_DB_Posts = [];
    querySnapshot.forEach((doc) => {
        from_DB_Posts.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({ success: true, posts: from_DB_Posts });
});

app.post('/get_clubs', async (req, res) => {
  console.log("Someone requested the /get_clubs path");
  const postCollection = collection(firestore, 'clubs');
  const querySnapshot = await getDocs(postCollection);
  let from_DB_Clubs = [];
  querySnapshot.forEach((doc) => {
      from_DB_Clubs.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json({ success: true, posts: from_DB_Clubs });
});

app.post('/makePost', async (req, res) => {
    const { organizationName, postTitle, postDescription } = req.body;

    try {
        const docRef = await addDoc(collection(db, "posts"), {
            Title: postTitle,
            Description: postDescription,
            Author: organizationName
          });

        // console.log("Document written with ID: ", docRef.id);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error adding document: ", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/createClub', async(req, res) => {
    const { clubName, clubType } = req.body;
    
    try{
      const docRef = await addDoc(collection(db, "clubs"), {
        name: clubName,
        type: clubType
      });
      res.status(200).json({ success: true });
    }
    catch(error){
      console.error("Error adding document: ", error);
      res.status(500).json({ success: false, error: error.message });
    }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
