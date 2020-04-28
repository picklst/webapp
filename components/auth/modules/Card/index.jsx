import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import {useGlobalState} from "../../../../actions/states/Auth.ts";

import Card from "../../../ui/Cards";

import { registerAPI, verifyTokenAPI } from "../../api";
import { AuthForm } from '../../views';

import AlreadyLoggedIn from "./AlreadyLoggedIn";
import BottomPopup from "../../../ui/BottomPopup";

import { TokenCreate } from "../../../../utils/authMutations.ts";
import PopUp from "../../../ui/PopUp";

const LoginModal = styled.div`
    width: 100vw;
    max-width: 800px;
    max-height: 100vh;
    overflow-y: auto;
    position: unset;
    background-color: white;
    .auth-filler{
      background: linear-gradient(to right, #7f00ff, #e100ff);
    }
    .auth-section {
      padding: 7.5vh 1.5rem;
    }
`;

export default ({
    variant, isSignup, onComplete, onClose,
    labels,
}) => {
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const [token] = useGlobalState('token');
    const [hasToken, setHasToken] = useState(!!token);
    const [isTokenVerified, setTokenVerified] = React.useState(false);

    useEffect(() => {
        if(hasToken && !isTokenVerified)
            VerifyToken()
    });

    const VerifyToken = () => {
        verifyTokenAPI({ token }).then(r => {
            if(r.hasOwnProperty('errors'))
                setHasToken(false);
            setTokenVerified(true);
        })
    };

    const handleLogin = ({ email, password }) => {
        setLoading(true);
        console.log('logging in');
        TokenCreate({ username: email, password }).then(r => {
            setLoading(false);
            if(r.hasOwnProperty('errors'))
                setErrors(r.errors);
            else
                onComplete()
        });
    };

    const handleSignUp = ({ email, password }) => {
        setLoading(true);
        registerAPI({ email, password }).then(r => {
            setLoading(false);
            if(r.hasOwnProperty('errors'))
                setErrors(r.errors);
            else
                handleLogin({ email, password })
        });
    };


    const renderAuthComp = hasToken ?
    <AlreadyLoggedIn isVerified={isTokenVerified} onContinue={onComplete} /> :
    <AuthForm
        onSignUp={handleSignUp}
        onLogin={handleLogin}
        isLoading={isLoading}
        errors={errors}
        isSignup={isSignup}
        hasErrors={errors!=null}
    />;

    return variant ==="bottom-popup" ?
        <BottomPopup
            className="bg-white"
            onClose={onClose}
            title={labels && labels.title ? labels.title : hasToken ? "Verifying Session" : "Login Required"}
        >
            <div className="p-4">
                {renderAuthComp}
            </div>
        </BottomPopup>
    : variant === "modal"?
        <PopUp
            isOpen
            onClose={onClose}
            appElement=".app"
            className="bg-none"
        >
            <LoginModal>
                <div className="row m-0">
                    <div className="auth-filler d-none d-md-block col-md-6 p-0">

                    </div>
                    <div className="auth-section col-12 col-md-6">
                        {renderAuthComp}
                    </div>
                </div>
            </LoginModal>
        </PopUp>
    : <Card p="2">{renderAuthComp}</Card>

};