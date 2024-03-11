import express from 'express';

import bodyParser from 'body-parser';

import { auth, db } from '../src/firebase.js';

// const admin = require('firebase-admin');

import { addDoc, collection, getDocs, query, where, doc, collectionGroup, orderBy, limit, getDoc } from "firebase/firestore"; 
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

      const posts_subcollection = collection(db, `clubs/${clubId}/posts`);
      const qSnapshot = await getDocs(posts_subcollection);

      // this query logic doesn't work?? -- it returns nothing
      // const q = query(posts_subcollection, orderBy('createdAt', 'desc'), limit(1));
      // const qSnapshot = await getDocs(q);
      
      if(!qSnapshot.empty){
        // console.log("found a post");
        const post = {id: qSnapshot.docs[0].id, ...qSnapshot.docs[0].data() };
        postList.push(post);
      }
    }
    // console.log(postList);
    return postList;
}

async function getPostsForFollowedClubs(db, email, userPath){
  let clubList = [];
  // getting the list of followed clubs
  const clubCollection = collection(db, `Users/${userPath}/followedClubs`);
  const clubSnapshot = await getDocs(clubCollection);
  if(!clubSnapshot.empty){
    clubSnapshot.forEach((clubDoc) => {
      const clubId = clubDoc.id;
      const clubData = {
        clubId // Add club ID to the data
        // Add other relevant club data here (if needed)
      };
      clubList.push(clubData);
    });

    console.log("user follows " + clubList.length + " clubs");
  }
  let postList = []; // declare an empty posts list
  console.log("Checking each club now:");
  for (const clubData of clubList) {
    const clubName = clubData.clubId; // Extract and assign to the variable
    console.log("Checking club: " + clubName);
    // clubId is a name, so we have to query
    const outerClubCollection = collection(db, 'clubs');
    const q = query(outerClubCollection, where('club_url', '==', clubName));
    const qSnapshot = await getDocs(q);
    if(qSnapshot.empty){
      console.log("Somehow nothing came up.");
    }
    const clubDoc = qSnapshot.docs[0];
    if(clubDoc){
      console.log("associated clubdoc exists");
    }
    const clubId = clubDoc.id;

    const posts_subcollection = query(collection(db, `clubs/${clubId}/posts`));
    const posts_snapshot = await getDocs(posts_subcollection);
    if(!posts_snapshot.empty){ // if there are posts to load
      console.log("getPostsForFollowedClubs: " + clubName + " has posts to be rendered");
      // push to the list the first one they have
      const post = {id: posts_snapshot.docs[0].id, ...posts_snapshot.docs[0].data() };
      postList.push(post);
    }
  }
  return postList;
}

async function getAllClubPosts(db, clubName){
  console.log("getAllClubPosts searching for " + clubName);
  let postList = [];
  let clubTitle = '';
  let success_state = false;
  let clubFound = false;
  const clubsCollection = collection(db, 'clubs');
  // clubName here is auto formatted to be all lowercase
  // which is how the club_url is supposed to be
  const q = query(clubsCollection, where('club_url', '==', clubName));
  const qSnapshot = await getDocs(q);
  if(!qSnapshot.empty){
    console.log("getAllClubPosts found the club entry for url: " + clubName);
    clubFound = true;
    const clubDoc = qSnapshot.docs[0];
    const clubId = clubDoc.id;

    clubTitle = await clubDoc.data().name;
    console.log("getAllClubPosts -> clubTitle defined as: " + clubTitle);

    const posts_subcollection = query(collection(db, `clubs/${clubId}/posts`));

    const posts_snapshot = await getDocs(posts_subcollection);

    if(!posts_snapshot.empty){ // if there are posts to load
      console.log("getAllClubPosts: " + clubName + " has posts to be rendered");
      posts_snapshot.forEach((post_doc) => {
        const post_object = { id: post_doc.id, ...post_doc.data() };
        postList.push(post_object);
      }); 
      success_state = true;
    }
  }
  // if it is empty, then return an empty postList and clubTitle
  return {
    postList: postList,
    clubTitle: clubTitle,
    success: success_state,
    clubFound: clubFound
  }
}


// Middleware to parse incoming JSON data
app.use(bodyParser.json());

app.post('/get_posts', async (req, res) => {
    const { pageType } = req.body;
    let from_DB_Posts;
    let clubTitle;
    // pageType = 'whatsnew' OR
    // pageType = 'club_page' -- the actual /path or name of club
    if(pageType === 'whatsnew'){
      // get the clubs since each one has a posts subcollection
      from_DB_Posts = await getLatestPostsFromClubs(db);
      // console.log("From outside the function: " + from_DB_Posts);
    }
    else if(pageType === 'following'){
      const {email} = req.body;
      const {userPath} = req.body;
      console.log("Trying to get following page for " + email);
      console.log("Path to user: " + userPath);
      from_DB_Posts = await getPostsForFollowedClubs(db, email, userPath);
      if(from_DB_Posts.length === 0){
        let err_msg = "No posts to render, follow a club!";
        res.status(206).json({success: false, message: err_msg });
        return;
      }
    }
    else if(pageType === 'clubPage'){
      const {clubName} = req.body;
      // let msg = 'requesting the club page: ' + clubName;
      // console.log(msg);
      let result = await getAllClubPosts(db, clubName);
      if(result.success === false && result.clubFound === true){
        let err_msg = "Club: " + result.clubTitle + " has made no posts yet!";
        console.log(err_msg);
        res.status(206).json({ success: false, message: err_msg });
        return;
      }

      if(result.success === false){
        let err_msg = "We couldn't find that club! (url: " + clubName + ")"; 
        res.status(404).json({ success: false, error: err_msg });
        return;
      }

      from_DB_Posts = result.postList;
      clubTitle = result.clubTitle;
      console.log("Sending club posts from: " + clubTitle);
    }
    
    res.status(200).json({ success: true, posts: from_DB_Posts, clubTitle: clubTitle });
});

app.post('/get_clubs', async (req, res) => {
  // console.log("Someone requested the /get_clubs path");
  const postCollection = collection(firestore, 'clubs');
  const querySnapshot = await getDocs(postCollection);
  let from_DB_Clubs = [];
  querySnapshot.forEach((doc) => {
      from_DB_Clubs.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json({ success: true, clubs: from_DB_Clubs });
});

app.post('/makePost', async (req, res) => {
    const { organizationName, postTitle, postDescription } = req.body;

    try {
        const name = await organizationName;

        const clubs_Snapshot = await getDocs(query(collection(db, "clubs"), where("name", "==", name)));
        // let msg = "Looking for subcollection of club " + name;
        // console.log(msg);
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
      // let msg = "Author email is: " + authorEmail;
      // console.log(msg);

      // see if they already have a club
      let q = query(collection(db, "clubs"), where("author", "==", authorEmail));

      // convert to url form: will be used to render club pages
      let club_url = clubName.toLowerCase();

      // see if the club exists already
      let existingName_query = query(collection(db, "clubs"), where("club_url", "==", club_url));

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
        console.log("createClub: successful club creation");
        
        
        const docRef = await addDoc(collection(db, "clubs"), {
          name: clubName,
          type: clubType,
          author: authorEmail,
          club_url: club_url
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
