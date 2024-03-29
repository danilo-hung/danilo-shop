import { useState, useEffect } from "react"
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import  {SignInContainer, BtnsContainer} from './sign-in-form.style.jsx'

import {
    signInWithGooglePopup,
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

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const resetFromField = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password)
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
        <SignInContainer>
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

                <BtnsContainer>
                    <Button
                        children="Login"
                        type="submit"
                        buttonType="" />
                    <Button
                        type='button'
                        children="GOOGLE Login"
                        onClick={signInWithGoogle}
                        buttonType="google" />
                </BtnsContainer>
            </form>

        </SignInContainer>
    )
}

export default SignInForm