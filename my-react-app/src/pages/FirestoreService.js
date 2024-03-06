import { db } from '../firebase.js'; // adjust the import path as necessary
import { collection, getDocs } from 'firebase/firestore';

export const getFollowedClubs = async (userId) => {
    const clubsCollection = collection(db, `Users/${userId}/followedClubs`);
    const snapshot = await getDocs(clubsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}