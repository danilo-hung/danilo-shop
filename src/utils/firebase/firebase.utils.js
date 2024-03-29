import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCgdnfl7j7RHh5xWJ4r5wrfO0Wm-rPmEsY",
    authDomain: "crwn-clothing-db-62b2f.firebaseapp.com",
    projectId: "crwn-clothing-db-62b2f",
    storageBucket: "crwn-clothing-db-62b2f.appspot.com",
    messagingSenderId: "765209954987",
    appId: "1:765209954987:web:1cf5be0c7c52aef59fc5ee"
};

initializeApp(firebaseConfig);

//googleProvider for google sign in
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});
export const auth = getAuth();
export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider)

//create DB
export const db = getFirestore();

export const addCollectionAndDocuments = async(collectionKey, documentsArr) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    documentsArr.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)
    })

    await batch.commit();
    console.log('done')
}

export const getCategoriesAndDocument = async() => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoriesArray = querySnapshot.docs.map(doc => doc.data())
    return categoriesArray
}

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
    if (!userAuth) return;

    //create fake db collection, not create in firestore db 
    const userDocRef = doc(db, "usersCollection", userAuth.uid);
    // console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists());

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
                createAt,
                ...additionalInformation
            });
        } catch (error) {

        }

    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => { onAuthStateChanged(auth, callback) };