import React from 'react';
import shortid from 'shortid';

import Button from "../../../ui/Button";

import LoginForm from './login';
import SignUpForm from './signup';

export default ({ errors, hasErrors, isLoading, onSignUp, onLogin }) => {

    const [isNewUser, showSignUp] = React.useState(true);

    return <div>
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
            <h4>Login to Your Account.</h4>
            <LoginForm onLogin={onLogin} />
            <div className="text-center mt-4">
                <p>Do not have an account?</p>
                <Button
                    text="Create Account"
                    className="px-5 w-100 grey-button"
                    onClick={() => showSignUp(true)}
                />
            </div>
        </div>
        : <div>
            <h4>Create an Account.</h4>
            <SignUpForm onSignUp={onSignUp}/>
            <div className="text-center mt-4">
                <p>Already have an account?</p>
                <Button
                    text="Login"
                    className="px-5 w-100 grey-button"
                    onClick={() => showSignUp(false)}
                />
            </div>
        </div>
    }
    </div>

};