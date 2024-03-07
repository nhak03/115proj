import React, { useEffect, useState } from 'react';
import 'reactjs-popup/dist/index.css';

// imports for authstate and firestore frontend queries
import { getFollowedClubs, setFollowedClub, deleteFollowedClub } from '../../pages/FirestoreService.js';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase.js'; // Ensure this path is correct


export default function FollowButton({user, clubName}) {
    // const [authUser, setAuthUser] = useState(null);
    // const [followedClubs, setFollowedClubs] = useState([]);
    const [followingStatus, setFollowingStatus] = useState('Follow+'); //String so the status can easily be used for Button Text


    //copied from Ronith's Profile.js page
    async function loadFollowedClubs(userId) {
        try {
            const followedClubs = await getFollowedClubs(userId);
            if(followedClubs.empty){
                console.log("User does not follow any clubs");
            }
            else{
                console.log("User does follow some clubs");
                // console.log("The first followed club: " + followedClubs[0].clubName);
                for(let i=0; i<followedClubs.length; i++){
                    if(followedClubs[i].clubName === clubName){
                        setFollowingStatus('Following');
                        break;
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching followed clubs: ", error);
        }
    }

    // logic to update the follow button state on click
    async function handleFollowClick() {
        if (!user) {
            alert('You must be signed in to follow a club')
        }

        if  (user) {
            if (followingStatus === 'Following') {
                deleteFollowedClub(user.uid, clubName)
                setFollowingStatus('Follow+')
            }
            else {
                setFollowedClub(user.uid, clubName)
                setFollowingStatus('Following')
            }
        }
    }

    useEffect (() => { 
        console.log("I fire once");
        const followingData = onAuthStateChanged(auth, (user) => {
            if (user) {
                // setAuthUser(user);
                loadFollowedClubs(user.uid);
            } else {
                // setAuthUser(null);
                setFollowingStatus('Follow+');
            }
        });

        return () => followingData();
    });

    return (
        <div>
            <button id="followButton" onClick={handleFollowClick}><h1>{followingStatus}</h1></button>
        </div>
    );
}
