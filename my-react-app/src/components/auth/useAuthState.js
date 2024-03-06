import { useEffect, useState } from 'react';
import { auth } from '../../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

const useAuthState = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setAuthUser(user);
        });

        // Clean up the subscription on unmount
        return unsubscribe;
    }, []);

    return authUser;
};

export default useAuthState;
