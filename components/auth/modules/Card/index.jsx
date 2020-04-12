import React, {useEffect, useState} from 'react';
import {useGlobalState} from "../../../../actions/states/Auth.ts";

import Card from "../../../ui/Cards";

import { getTokenAPI, registerAPI, verifyTokenAPI } from "../../api";
import { AuthForm } from '../../views';

import AlreadyLoggedIn from "./AlreadyLoggedIn";
import BottomPopup from "../../../ui/BottomPopup";

export default ({ variant, onComplete, onClose }) => {
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
        getTokenAPI({ username: email, password }).then(r => {
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
        hasErrors={errors!=null}
    />;

    return variant ==="bottom-popup" ?
        <BottomPopup
            className="bg-white"
            onClose={onClose}
            title={hasToken ? "Verifying Session" : "Login Required"}
        >
            <div className="p-4">
                {renderAuthComp}
            </div>
        </BottomPopup>
    : <Card p="2">{renderAuthComp}</Card>

};