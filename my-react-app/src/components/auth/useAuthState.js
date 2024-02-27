// useAuthState.js
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase.js';
import { collection, getDocs, query, where} from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';


class userObject {
    constructor(authUser, isClub, clubName) {
        this.authUser = authUser;
        this.clubStatus = isClub;
        this.clubName = clubName;
    }
}

class clubStatus{
    constructor(isClub, clubName){
        this.isClub = isClub; // bool
        this.clubName = clubName // string
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
        let clubInfo = new clubStatus(false, '');
        return clubInfo;
    }
    else{
        // else they are a club owner
        const clubName = qSnapshot.docs[0].data().name; // has to be the variable name in the firestore collection
        let msg = 'associated clubname: ' + clubName;
        console.log(msg);
        let clubInfo = new clubStatus(true, clubName);
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
                const currentUser = new userObject(user, is_club_acc.isClub, is_club_acc.clubName);
                setAuthUser(currentUser);
                let msg = "success: " + currentUser.authUser.email;
                console.log(msg);
                
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
