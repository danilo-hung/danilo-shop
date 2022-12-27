import { signInwithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const SignIn = () => {
    const logGoogleUser = async () => {
        const res = await signInwithGooglePopup();
        // console.log(res)
        const user = res.user;
        const userDoc = await createUserDocumentFromAuth(user)    
    }
    return (
        <div>
            <h1>
                sign in page
            </h1>
            <button onClick={logGoogleUser}>
                sign in with google pop up
            </button>
        </div>
    );
};

export default SignIn
