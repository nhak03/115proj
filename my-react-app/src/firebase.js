// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCU0nqBAh-9y12N4MQEM043l3KREJjUags",
    authDomain: "slimeline-7a09a.firebaseapp.com",
    projectId: "slimeline-7a09a",
    storageBucket: "slimeline-7a09a.appspot.com",
    messagingSenderId: "995178713279",
    appId: "1:995178713279:web:95f60a4467c396b697b60a",
    measurementId: "G-DM732FKZ31"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);