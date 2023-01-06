import { useState, useEffect } from "react"

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {SignUpContainer, BtnsContainer} from './sign-up-form.style.jsx'


import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";


const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};



const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormField);
    const [errorMsg, setErrorMsg] = useState("");
    const [signUpMsg, setSignUpMsg] = useState("");
    const { displayName, email, password, confirmPassword } = formFields;

    useEffect(() => {
        setTimeout(() => {
            setSignUpMsg("")
        }, 8000);
    }, [signUpMsg])

    // console.log(formFields);
    const resetFromField = () => {
        setFormFields(defaultFormField);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        //confirm  password matched
        if (password !== confirmPassword) {
            setErrorMsg('passwords do not match');
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            //store sign-up info to firebase db
            await createUserDocumentFromAuth(user, { displayName });
            setSignUpMsg("Successfully Sign Up")
            resetFromField()
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setErrorMsg('Cannot create user, email already in use')
            } else {
                console.dir(error)
            }

        }
        //check if email repeat
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <SignUpContainer>
            <h2>Don't Have an Account?</h2>
            <span>Sign Up with Your Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    htmlFor="display-name"
                    label="Display Name"
                    id="display-name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                />

                <FormInput
                    htmlFor="email"
                    label="Email"
                    id="email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

                <FormInput
                    htmlFor="password"
                    label="Password"
                    id="password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />

                <FormInput
                    htmlFor="comfirm-password"
                    label="Comfirm Password"
                    id="comfirm-password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />
                {signUpMsg ? (
                    <p>{signUpMsg}</p>
                ) : <p>{errorMsg}</p>}

                <BtnsContainer>
                    <Button
                        children="Sign Up"
                        type="submit"
                        buttonType="" />
                </BtnsContainer>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm