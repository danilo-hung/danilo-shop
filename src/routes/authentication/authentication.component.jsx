// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';
// import {
//     auth,
//     signInWithGooglePopup,
//     signInWithGoogleRedirect,
//     createUserDocumentFromAuth
// } from '../../utils/firebase/firebase.utils';
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.style.scss'


const Authentication = () => {
    // useEffect(()=>{
    //     async function fetchData(){
    //         const res = await getRedirectResult(auth);
    //         if(res){
    //             const userDocRef = await createUserDocumentFromAuth(res.user)
    //         }
    //     }
    //     fetchData()
    // }, [])

    // const logGoogleUserPopUp = async () => {
    //     const res = await signInWithGooglePopup();
    //     // console.log(res)
    //     const user = res.user;
    //     const userDocRef = await createUserDocumentFromAuth(user)
    // }


    return (
        <div className="auth-container">
            {/* <h1>
                sign in page
            </h1>
            <button onClick={logGoogleUserPopUp}>
                sign in with google pop up
            </button> */}

            <SignInForm />
            {/* <button onClick={signInWithGoogleRedirect}>
                sign in with google redirect
            </button> */}
            <SignUpForm />
        </div>
    );
};

export default Authentication
