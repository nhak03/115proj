import express from 'express';

import bodyParser from 'body-parser';

import { db } from '../src/firebase.js';

// const admin = require('firebase-admin');

import { addDoc, collection } from "firebase/firestore"; 


const app = express();

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

app.post('/AddData', async (req, res) => {
    const { title, author, description, image } = req.body;
    console.log('Submitted data -->');
    console.log('Title:', title);
    console.log('Author:', author);
    console.log('Description:', description);
    console.log('Image:', image);

    try {
        const docRef = await addDoc(collection(db, "posts"), {
            Title: title,
            Description: description,
            Author: author,
            Image: image
          });

        console.log("Document written with ID: ", docRef.id);
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
