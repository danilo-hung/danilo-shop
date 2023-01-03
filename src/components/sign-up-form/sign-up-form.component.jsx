import { useState, useEffect, useContext } from "react"

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-up-form.style.scss'


import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

import { UserContext } from "../../context/user.context";

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

    const {setCurrentUser}=useContext(UserContext)

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
        if (password != confirmPassword) {
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
            setCurrentUser(user)
            resetFromField()
            setSignUpMsg("Successfully Sign Up")
        } catch (error) {
            if (error.code == 'auth/email-already-in-use') {
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
        <div className="sign-up-container">
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
                {errorMsg.length > 0 ? (
                    <p>{errorMsg}</p>
                ) : <p>{signUpMsg}</p>}

                <div className="btns-container">
                    <Button
                        children="Sign Up"
                        type="submit"
                        buttonType="" />
                </div>
            </form>
        </div>
    )
}

export default SignUpForm