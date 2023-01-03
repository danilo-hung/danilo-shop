import { useState, useContext, useEffect } from "react"
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from "../../context/user.context";
import './sign-in-form.style.scss'

import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [errorMsg, setErrorMsg] = useState("");
    const [logInMsg, setLogInMsg] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setLogInMsg("")
        }, 8000);
    }, [logInMsg])


    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext)
    const signInWithGoogle = async () => {
        const res = await signInWithGooglePopup();
        // console.log(res)
        const user = res.user;
        await createUserDocumentFromAuth(user);
        setCurrentUser(user);
    }

    const resetFromField = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password)
            setCurrentUser(user);
            resetFromField();
            setLogInMsg("Successfully Log In !");
            setErrorMsg("")

        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                setErrorMsg("Wrong Email or Password :(")
            } else if (error.code === 'auth/user-not-found') {
                setErrorMsg("Eamil not Found :O ")
            } else {
                setErrorMsg(error.message)
            }

        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    }

    // console.log(formFields)



    return (
        <div className="sign-in-container">
            <h2>Already Have an Account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    htmlFor="email"
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

                <FormInput
                    htmlFor="password"
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />

                {logInMsg ? (
                    <p>{logInMsg}</p>
                ) : <p>{errorMsg}</p>}

                <div className="btns-container">
                    <Button
                        children="Login"
                        type="submit"
                        buttonType="" />
                    <Button
                        type='button'
                        children="GOOGLE Login"
                        onClick={signInWithGoogle}
                        buttonType="google" />
                </div>
            </form>

        </div>
    )
}

export default SignInForm