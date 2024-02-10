import express from 'express';

import bodyParser from 'body-parser';

import { db } from '../src/firebase.js';

// const admin = require('firebase-admin');

import { addDoc, collection } from "firebase/firestore"; 


const app = express();

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

app.post('/what_new', async (req, res) => {
    console.log("Someone requested the / path");
    res.status(200).json({ success: true });
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
