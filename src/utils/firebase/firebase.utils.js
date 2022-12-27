import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCgdnfl7j7RHh5xWJ4r5wrfO0Wm-rPmEsY",
    authDomain: "crwn-clothing-db-62b2f.firebaseapp.com",
    projectId: "crwn-clothing-db-62b2f",
    storageBucket: "crwn-clothing-db-62b2f.appspot.com",
    messagingSenderId: "765209954987",
    appId: "1:765209954987:web:1cf5be0c7c52aef59fc5ee"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});
export const auth = getAuth();
export const signInwithGooglePopup = () => signInWithPopup(auth, provider)

//create DB
const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    //create fake db collection, not create in firestore db 
    const userDocRef = doc(db, "usersCollection", userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    //if user data doesn't exist in firstore db
    if (!userSnapshot.exists()) {
        // define collection form
        const { displayName, email } = userAuth;
        const createAt = new Date();
        // set collection in firestore
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            });
        } catch(error){
            console.log('error creating the user', error.message)
        }

    }

    return userDocRef;
}