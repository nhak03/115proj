import React, { useEffect, useState } from 'react';
import { auth } from '../firebase.js'; // Ensure this path is correct
import { onAuthStateChanged } from 'firebase/auth';
import { getFollowedClubs } from './FirestoreService.js'; // Ensure this path is correct

const Profile = () => {
    const [authUser, setAuthUser] = useState(null);
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                loadFollowedClubs(user.uid);
            } else {
                setAuthUser(null);
                setClubs([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loadFollowedClubs = async (userId) => {
        try {
            const followedClubs = await getFollowedClubs(userId);
            setClubs(followedClubs);
        } catch (error) {
            console.error("Error fetching followed clubs: ", error);
        }
    };

    if (loading) {
        return <div>Loading profile...</div>;
    }

    return (
        <div>
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
