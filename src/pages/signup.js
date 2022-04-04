import React, { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase';
import { FooterContainer } from '../containers/footer';
import { HeaderContainer } from '../containers/header';
import { Form } from '../components';
import * as ROUTES from '../constants/routes';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
    const history = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { firebase } = useContext(FirebaseContext);
    const auth = getAuth();
    
    const isInvalid = firstName === '' || password === '' || emailAddress === '';
    
    const handleSignup = (event) => {
        event.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(emailAddress, password)
            .then((r) => { 
                r.user
                    .updateProfile({
                        displayName: firstName,
                        photoURL: Math.floor(Math.random() * 5) + 1,
                    }).then(() => { 
                        history(ROUTES.BROWSE);
                    })
            }).catch((error) => { 
                setFirstName('');
                setEmailAddress('');
                setPassword('');
                setError(error.message);
            })
    };
    
    return (
        <>
            <HeaderContainer>
                <Form>
                    <Form.Title>Sign Up</Form.Title>
                    {error && <Form.Error>{error}</Form.Error>}
                    
                    <Form.Base onSubmit={handleSignup} method="POST">
                        <Form.Input
                            placeholder="First Name"
                            value={firstName}
                            onChange={({ target }) => setFirstName(target.value)}
                        />
                        <Form.Input
                            placeholder="Email Address"
                            value={emailAddress}
                            onChange={({ target }) => setEmailAddress(target.value)}
                        />
                        <Form.Input
                            type="password"
                            value={password}
                            autoComplete="off"
                            placeholder="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        <Form.Submit disabled={isInvalid} type="submit">
                            Sign Up
                        </Form.Submit>
                        
                        <Form.Text>
                            Already a user? <Form.Link to="/signin">Sign up now.</Form.Link>
                        </Form.Text>
                        <Form.TextSmall>
                            This page is protected by Google reCAPTCHA.
                        </Form.TextSmall>
                    </Form.Base>
                </Form>
            </HeaderContainer>
            <FooterContainer />
        </>
    )
}