import React, { useEffect, useState } from 'react';
import 'reactjs-popup/dist/index.css';

// imports for authstate and firestore frontend queries
import { getFollowedClubs, setFollowedClub, deleteFollowedClub } from '../../pages/FirestoreService.js';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase.js'; // Ensure this path is correct


export default function FollowButton({user, clubName}) {
    const [followedClubs, setFollowedClubs] = useState([])
    const [followingStatus, setFollowingStatus] = useState('Follow+') //String so the status can easily be used for Button Text


    //copied from Ronith's Profile.js page
    async function loadFollowedClubs(userId) {
        try {
            const followedClubs = await getFollowedClubs(userId);
            setFollowedClubs(followedClubs);
        } catch (error) {
            console.error("Error fetching followed clubs: ", error);
        }
    }

    //collect the followed clubs
    useEffect (() => { //I dont really know what the useEffect does tbh
        const followingData = onAuthStateChanged(auth, (user) => {
            if (user) {
                loadFollowedClubs(user.uid)
                if (followedClubs.some(club => club.name === clubName)) {
                    setFollowingStatus('Following')
                }
                else {
                    setFollowingStatus('Follow+')
                }
            }
            else {
                setFollowingStatus('Follow+')
            }
        });

        return () => followingData();
    }, [user]);


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


    return (
        <div>
            <button id="followButton" onClick={handleFollowClick}><h1>{followingStatus}</h1></button>
        </div>
    )
}
