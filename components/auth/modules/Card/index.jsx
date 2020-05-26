import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import {motion} from "framer-motion";

import { useGlobalState, setUserInfo } from "../../../../actions/states/Auth.ts";

import { AuthForm } from '../../views';

import AlreadyLoggedIn from "./AlreadyLoggedIn";

import { TokenCreate } from "../../../../utils/authMutations.ts";
import {Card, BottomPopup, PopUp } from "../../../ui";
import { LoginSidebar } from "../../../pages";
import {APIRequest} from "../../../../utils";
import {clearAllBodyScrollLocks} from "body-scroll-lock";

const LoginModal = styled.div`
    width: 100vw;
    max-width: 800px;
    max-height: 100vh;
    overflow-y: auto;
    position: unset;
    background-color: white;
`;

export default ({
    variant, isSignup, onComplete, onClose,
    labels, startFocused = true, requireInvite = true,
}) => {
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const [userInfo] = useGlobalState('UserInfo');

    const handleLogin = ({ email, password }) => {
        setLoading(true);
        TokenCreate({ username: email, password }).then((response) => {
            setLoading(false);
            if(response.hasOwnProperty('errors'))
                setErrors(response.errors);
            else if(typeof onComplete === "function")
            {
                setUserInfo({
                    ...response.user,
                    "avatarURL": response.user.avatarURL && response.user.avatarURL.split('?')[0],
                });
                clearAllBodyScrollLocks();
                onComplete()
            }
        });
    };

    const accountCreate = async (variables) => {
        const query = `
        mutation registerUser($email: String!, $password: String!){
          accountCreate(input: {email: $email, password: $password})
          {
            returning
            {
              username
            }
          }
        }`;
        return await APIRequest({ query, variables, requireAuth: false }).then((data) => {
            return {success: true, data}
        }).catch((errors) => { return { success: false, errors } })
    };

    const handleSignUp = ({ email, password }) => {
        setLoading(true);
        accountCreate({ email, password }).then(({ success, data, errors }) => {
            setLoading(false);
            if(success)
            {
                handleLogin({ email, password })
            } else {
                setErrors(errors);
            }
        });
    };


    const renderAuthComp = (showIllustrations) => userInfo ?
    <AlreadyLoggedIn isVerified={false} onContinue={onComplete} /> :
        <AuthForm
            onSignUp={handleSignUp}
            onLogin={handleLogin}
            isLoading={isLoading}
            errors={errors}
            isSignup={isSignup}
            hasErrors={errors!=null}
            startFocused={startFocused}
            requireInvite={requireInvite}
            showIllustrations={showIllustrations}
        />;

    return variant ==="bottom-popup" ?
        <BottomPopup
            className="bg-white"
            onClose={onClose}
            title={labels && labels.title ? labels.title : "Authenticating You"}
        >
            <div className="p-4">
                {renderAuthComp(false)}
            </div>
        </BottomPopup>
    : variant === "modal"?
        <PopUp
            isOpen
            onClose={onClose}
            appElement=".app"
        >
            <LoginModal>
                <div className="row m-0">
                    <div className="d-none d-md-block col-md-6 p-0">
                        <LoginSidebar/>
                    </div>
                    <div className="auth-section col-12 col-md-6">
                        {renderAuthComp(true)}
                    </div>
                </div>
            </LoginModal>
        </PopUp>
    : <motion.div
        initial={{ scale: 0.8, opacity: 0.2 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
            type: "spring",
            stiffness:100,
            damping: 20
        }}
        className="w-100"
    >
        <Card p={4} className="w-100">{renderAuthComp(true)}</Card>
    </motion.div>

};