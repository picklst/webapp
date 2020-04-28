import React from 'react';
import shortid from 'shortid';

import Button from "../../../ui/Button";

import LoginForm from './login';
import SignUpForm from './signup';

export default ({ errors, hasErrors, isLoading, isSignup, onSignUp, onLogin }) => {

    const [isNewUser, showSignUp] = React.useState(isSignup);

    return <div className="w-100">
    {
        hasErrors ?
            <div className="alert alert-danger">
                {errors.map(e => <span key={shortid.generate()}>{e.message}</span>)}
            </div> : null
    }
    {
        isLoading ?
            <div className="d-flex align-items-center justify-content-center h-100">
                Please wait while we log you in...
            </div>
        : !isNewUser ?
        <div>
            <h2>Login to Your Account.</h2>
            <LoginForm onLogin={onLogin} />
            <div className="text-center mt-4">
                <hr />
                <p className="mb-2">Do not have an account?</p>
                <div className="d-flex justify-content-center">
                    <Button
                        text="Create Account"
                        className="px-5 w-75 grey-button"
                        onClick={() => showSignUp(true)}
                    />
                </div>
            </div>
        </div>
        : <div>
            <h2>Create an Account.</h2>
            <SignUpForm onSignUp={onSignUp}/>
            <div className="text-center mt-4">
                <hr />
                <p className="mb-2">Already have an account?</p>
                <div className="d-flex justify-content-center">
                    <Button
                        text="Login"
                        className="px-5 w-75 grey-button"
                        onClick={() => showSignUp(false)}
                    />
                </div>
            </div>
        </div>
    }
    </div>

};