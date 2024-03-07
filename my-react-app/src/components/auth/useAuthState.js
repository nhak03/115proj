// useAuthState.js
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase.js';
import { collection, getDocs, query, where, addDoc, doc, setDoc} from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';


class userObject {
    constructor(authUser, isClub, clubName, Club_Doc_ID) {
        this.authUser = authUser;
        // next 3 fields are only defined if the logged in user is a club owner
        // false, '', '' otherwise
        this.clubStatus = isClub;
        this.clubName = clubName;
        this.Club_Doc_ID = Club_Doc_ID;
        // to get absolute path of a user
        // do `Users/${user.uid}/whatever_field_you_want`
    }
}

class clubStatus{
    constructor(isClub, clubName, Club_Doc_ID){
        this.isClub = isClub; // bool
        this.clubName = clubName; // string
        this.Club_Doc_ID = Club_Doc_ID;
    }
}

const getUserStatus = async (user) => {
    let email = user.email;
    // query the users collection
    // see if the user data exists there --> needed for the followedClubs feature
    let q = query(collection(db, "Users"), where("email", "==", email));
    const qSnapshot = await getDocs(q);
    if(qSnapshot.empty){
        // if empty, we need to add them into it
        // get a reference to the path:

        // the data to be added: 
        const userData = {
            email: email
        };
        // make the document in the database:
        // await addDoc(usersCollectionRef, userData);

        const userDocRef = doc(db, 'Users', `${user.uid}`);

        await setDoc(userDocRef, userData);
        // Set the data for the document
    }
    else{
        // return a success message
        let msg = "Object " + email + " exists in the database!";
        console.log(msg);
    }
}

const getClubStatus = async (user_email) => {
    let email = user_email;
    // query the club objects
    // see if they already have a club
    let q = query(collection(db, "clubs"), where("author", "==", email));
    const qSnapshot = await getDocs(q);

    if(qSnapshot.empty){
        // if it is empty
        // they do not have a club
        let clubInfo = new clubStatus(false, '', '');
        return clubInfo;
    }
    else{
        // else they are a club owner
        const clubName = qSnapshot.docs[0].data().name; // has to be the variable name in the firestore collection
        const Club_Doc_ID = qSnapshot.docs[0].id; // this is needed for absolute path operations
        let msg = 'associated clubname: ' + clubName;
        console.log(msg);
        let clubInfo = new clubStatus(true, clubName, Club_Doc_ID);
        return clubInfo;
    }
}

const useAuthState = () => {
    const [authUser, setAuthUser] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {

            // setAuthUser(user); -- user details in "user"
            // query database rq, see if their email is one of the club authors
            // set true or false depending on if they are a club author
            if(user){
                const is_club_acc = await getClubStatus(user.email);
                const currentUser = new userObject(user, is_club_acc.isClub, is_club_acc.clubName, is_club_acc.Club_Doc_ID);
                setAuthUser(currentUser);
                let msg = "success: " + currentUser.authUser.email;
                console.log(msg);
                getUserStatus(user);
            }
            else{
                console.log("null case");
                setAuthUser(null);
            }
        });

        // Clean up the subscription on unmount
        return unsubscribe;
    }, []);

    return authUser;
};

export default useAuthState;
