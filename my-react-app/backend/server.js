import express from 'express';

import bodyParser from 'body-parser';

import { auth, db } from '../src/firebase.js';

// const admin = require('firebase-admin');

import { addDoc, collection, getDocs, query, where, doc, collectionGroup, orderBy, limit } from "firebase/firestore"; 
import { firestore } from '../src/firebase.js'; // Correct way to import 

const app = express();

async function getLatestPostsFromClubs(db) {
    let clubList = [];
    const clubsCollection = collection(db, 'clubs');
    const clubsSnapshot = await getDocs(clubsCollection);
    clubsSnapshot.forEach((clubDoc) => {
      const clubId = clubDoc.id;
      const clubData = {
        clubId // Add club ID to the data
        // Add other relevant club data here (if needed)
      };
      clubList.push(clubData);
    });

    let clubId; // Declare an empty variable
    let postList = []; // declare an empty posts list
    for (const clubData of clubList) {
      clubId = clubData.clubId; // Extract and assign to the variable

      // console.log('processing ' + clubId); // Print the extracted value
      // const postsRef = collection(db, 'clubs', clubId, 'posts');
      // const q = query(postsRef, orderBy('createdAt', 'desc'), limit(1));
      // const qSnapshot = await getDocs(q);
      const posts_subcollection = collection(db, `clubs/${clubId}/posts`);
      const qSnapshot = await getDocs(posts_subcollection);

      if(!qSnapshot.empty){
        // console.log("found a post");
        const post = {id: qSnapshot.docs[0].id, ...qSnapshot.docs[0].data() };
        postList.push(post);
      }
    }
    // console.log(postList);
    return postList;
}


// Middleware to parse incoming JSON data
app.use(bodyParser.json());

app.post('/get_posts', async (req, res) => {
    const { pageType } = req.body;
    let from_DB_Posts;
    // pageType = 'whatsnew' OR
    // pageType = 'club_page' -- the actual /path or name of club
    if(pageType === 'whatsnew'){
      // get the clubs since each one has a posts subcollection
      from_DB_Posts = await getLatestPostsFromClubs(db);
      // console.log("From outside the function: " + from_DB_Posts);
    }

    // console.log("Sending posts to the frontend");
    res.status(200).json({ success: true, posts: from_DB_Posts });
});

app.post('/get_clubs', async (req, res) => {
  // console.log("Someone requested the /get_clubs path");
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
        // const docRef = await addDoc(collection(db, "posts"), {
        //     Title: postTitle,
        //     Description: postDescription,
        //     Author: organizationName
        //   });
        const name = await organizationName;

        const clubs_Snapshot = await getDocs(query(collection(db, "clubs"), where("name", "==", name)));
        let msg = "Looking for subcollection of club " + name;
        console.log(msg);
        if(!clubs_Snapshot.empty){ 
          // we found the club doc -->
          const clubDocId = clubs_Snapshot.docs[0].id;
          // get a reference to the actual club object -->
          const clubDocRef = doc(db, "clubs", clubDocId);
          // we got a reference to the Posts subcollection of the specific club -->
          const postsCollectionRef = collection(clubDocRef, "posts");
          
          await addDoc(postsCollectionRef, {
            Title: postTitle,
            Description: postDescription,
            Author: name
          });
          res.status(200).json({ success: true });
        }
        else{
          console.error("Error adding post to the club subcollection.");
          res.status(500).json({ success: false, error: "Error adding post to club subcollection."});
          return;
        }
        // console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/createClub', async(req, res) => {
    const { clubName, clubType, authorEmail } = req.body;
    
    try{
      let msg = "Author email is: " + authorEmail;
      console.log(msg);

      // see if they already have a club
      let q = query(collection(db, "clubs"), where("author", "==", authorEmail));

      // see if the club exists already
      let existingName_query = query(collection(db, "clubs"), where("name", "==", clubName));

      const qSnapshot = await getDocs(q);
      const existingName = await getDocs(existingName_query);


      if(existingName.empty === false){
        // if it is empty, then club name is unique
        console.log("createClub err: duplicate club name");
        res.status(403).json({
          success: false,
          err_msg: "That club account name already exists!"
        });
      }else if (qSnapshot.empty) {
        // if they don't have a club
        // allow the user to make one
        console.log("createClub: successful club creation")
        const docRef = await addDoc(collection(db, "clubs"), {
          name: clubName,
          type: clubType,
          author: authorEmail
        });
        res.status(200).json({ success: true, message: "Club created successfully!" });
      } else if(!qSnapshot.empty){
        // they already have a club associated with the email
        console.log("createClub err: already a club account");
        res.status(403).json({
          success: false,
          err_msg: "You already have a club account. Please contact support or create a new account with a different email."
        });
      }
      // end of "see if they already have a club"
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
