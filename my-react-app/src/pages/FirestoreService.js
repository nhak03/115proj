import { db } from '../firebase.js'; // adjust the import path as necessary
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, query, where} from 'firebase/firestore';

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

export const updateDocKVPair = async (docPath, contentKey, content) => {
    const docRef = doc(db, `${docPath}`);
    contentKey.replace(/ /g, "_");
    const response = await updateDoc(docRef, {[contentKey]: `${content}`})
    return response
}

export const getClubDoc = async (clubName) => {
    clubName = clubName.toLowerCase()
    const q = query(collection(db, 'clubs'), where('club_url', '==', clubName));
    const querySnapshot = await getDocs(q);
    const clubDoc = querySnapshot.docs[0];
    const data = clubDoc.data();
    return { id: clubDoc.id, ...data }; // Include document ID in the result
}

