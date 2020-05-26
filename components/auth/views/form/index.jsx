import React from 'react';
import {useRouter} from "next/router";
import shortid from 'shortid';
import { motion, AnimatePresence } from "framer-motion"

import Button from "../../../ui/Button";

import LoginForm from './login';
import SignUpForm from './signup';
import InviteForm from './invite';


export default ({
    errors, hasErrors, isLoading, isSignup, onSignUp, onLogin, startFocused, requireInvite,
    showIllustrations
}) => {

    const [inviteCode, setInviteCode] = React.useState();
    const [showInviteKeyForm, setInviteForm] = React.useState(requireInvite);
    const [isNewUser, showSignUp] = React.useState(isSignup);

    const handleInviteEntry = (code) => {
          setInviteCode(code);
          setInviteForm(false);
    };

    const renderLogin = (i) =>
    <AnimatePresence>{ !i && (
    <motion.div
        initial={{ translateX: "-2vh", opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        exit={{ display: "none", opacity: 0 }}
        transition={{
            type: "tween",
            stiffness: 60,
            damping: 15
        }}
    >
    <LoginForm showIllustration={showIllustrations} onLogin={onLogin} startFocused={startFocused} />
        <div className="text-center mt-2">
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
    </motion.div>)}
    </AnimatePresence>;

    const router = useRouter();
    const handleInvite = () => {
        router.reload();
        router.push('/#get-invite');
    };
    const renderSignUp = (i) =>
    <AnimatePresence> { i &&
    (<motion.div
        initial={{ translateX: "-2vh", opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        exit={{ display: "none", opacity: 0 }}
        transition={{
            type: "tween",
            stiffness: 60,
            damping: 15
        }}
    >
        {   showInviteKeyForm ?
            <InviteForm
                showIllustration={showIllustrations}
                onComplete={handleInviteEntry}
                onRequestInvite={handleInvite}
                onRequestStatus={handleInvite}
            /> :
            <SignUpForm showIllustration={showIllustrations} inviteCode={inviteCode} onSignUp={onSignUp} startFocused={startFocused} />
        }
        <div className="text-center mt-2">
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
    </motion.div>)}
    </AnimatePresence>;

    const renderLoading =
    <div className="d-flex align-items-center justify-content-center h-100">
        <div>
            <div className="d-flex justify-content-center mb-2">
                <div><i className="gg-spinner" /></div>
            </div>
            <div>Please wait while we log you in</div>
        </div>
    </div>;

    return isLoading ? renderLoading :
    <div className="mb-5">
    {   hasErrors ?
            <div className="alert alert-danger">
                { errors && errors.length > 0 ?
                    errors.map(e => <span key={shortid.generate()}>{e.message}</span>) :
                    <span>Some unknown error occurred. Please Try Again.</span>
                }
            </div> : null
    }
    {renderLogin(isNewUser)}
    {renderSignUp(isNewUser)}
    </div>

};