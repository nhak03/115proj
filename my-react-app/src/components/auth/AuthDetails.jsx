import React, { useEffect, useState } from 'react';
import useAuthState from './useAuthState.js';
import { auth } from '../../firebase.js';
import { signOut } from 'firebase/auth';

const AuthDetails = () => {
    const authUser = useAuthState();

    // useEffect(() => {
    //     const listen = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             setAuthUser(user)
    //         } else {
    //             setAuthUser(null)
    //         }
    //     })

    //     return () => {
    //         listen();
    //     }
    // }, []);

    const usersignOut = () => {
        signOut(auth).then(() => {
            console.log("sign out successful")
        }).catch(error => console.log(error))
    }
    return (
        <div>{ authUser ? <><button onClick={usersignOut}>Sign Out</button></> : <p>Signed Out</p>}</div>
    )
}

export default AuthDetails;