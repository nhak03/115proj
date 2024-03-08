import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { getFollowedClubs } from './FirestoreService.js';
import './Profile.css';
import Header from '../components/Header/Header.js'

const Profile = () => {
    const [authUser, setAuthUser] = useState(null);
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                loadFollowedClubs(user.uid);
            } else {
                setAuthUser(null);
                setClubs([]);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const loadFollowedClubs = async (userId) => {
        try {
            const followedClubs = await getFollowedClubs(userId);
            setClubs(followedClubs);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching followed clubs: ", error);
            setError("Failed to fetch followed clubs.");
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading profile...</div>;
    }

    return (
        <div>
            <Header />
            <div className="profile-container">
                {error && <p>Error: {error}</p>}
                {authUser ? (
                    <>
                        <p>Signed in as {authUser.email}</p>
                        <h2>Clubs I Follow</h2>
                        {clubs.length > 0 ? (
                            <ul>
                                {clubs.map(club => (
                                    <li key={club.clubID}>{club.name}</li> 
                                ))}
                            </ul>
                        ) : (
                            <p>You are not following any clubs.</p>
                        )}
                    </>
                ) : (
                    <p>Please sign in to see your profile.</p>
                )}
            </div>
            <h1>My Profile</h1>
            {authUser ? (
                <>
                    <p>Signed in as {authUser.email}</p>
                    <h2>Clubs I Follow</h2>
                    <ul>
                        {clubs.map(club => (
                            <li key={club.clubID}>{club.clubName}</li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Please sign in to see your profile.</p>
            )}
        </div>
    );
}

export default Profile;
