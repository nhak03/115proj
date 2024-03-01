import { db } from '../firebase.js'; // adjust the import path as necessary
import { collection, getDocs, doc, setDoc, deleteDoc} from 'firebase/firestore';

export const getFollowedClubs = async (userId) => {
    const clubsCollection = collection(db, `Users/${userId}/followedClubs`);
    const snapshot = await getDocs(clubsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export const setFollowedClub = async (userId, clubName) => {
    const userClubDocRef = doc(db, `Users/${userId}/followedClubs/${clubName}`);
    await setDoc(userClubDocRef, {clubName});
    return userClubDocRef
}

export const deleteFollowedClub = async (userId, clubName) => {
    const userClubDocRef = doc(db, `Users/${userId}/followedClubs/${clubName}`);
    const response = await deleteDoc(userClubDocRef)
    return response
}

