// useAuthState.js
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase.js';
import { collection, getDocs, query, where} from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';


class userObject {
    constructor(authUser, isClub) {
        this.authUser = authUser;
        this.clubStatus = isClub;
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
        return false;
    }
    else{
        // else they are a club owner
        return true;
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
                const currentUser = new userObject(user, is_club_acc);
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
