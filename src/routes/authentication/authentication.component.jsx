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
import {AuthContainer} from './authentication.style.jsx'


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
        <AuthContainer>
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
        </AuthContainer>
    );
};

export default Authentication
