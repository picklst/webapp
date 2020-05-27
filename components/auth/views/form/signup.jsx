import React, {useState} from 'react';
import { Button, TextInput } from "../../../ui";
import styled from '@emotion/styled'
import shortid from "shortid";


const SignUpFormWrap = styled.div`
  width: 100%;
  img {
    height: 200px;
    max-height: 20vh;
    margin-bottom: 3vh;
  }
`;

export default ({  hasErrors, errors, onSignUp, startFocused, inviteCode, showIllustration }) => {
    const [invalidEmail, setInvalidEmailState] = useState(false);
    const [invalidPassword, setInvalidPasswordState] = useState(true);

    const handleSignUp = (ev) => {
        ev.preventDefault();
        onSignUp({
            email: ev.currentTarget['email'].value.toLowerCase(),
            password: ev.currentTarget['password'].value
        })
    };

    return <SignUpFormWrap>
        <div className="text-center mb-2">
            {
                !hasErrors && showIllustration ?
                    <img alt="invite-required" src={require('../../../../images/assets/illustrations/sign-up.png')} />
                : <div className="mt-3" />
            }
            <h2>Create an Account.</h2>
        </div>
        {(hasErrors && errors && (errors.length > 1 || errors[0].code !== 'EMAIL_IN_USE')) &&
            <div className="alert alert-danger p-2">
                {errors && errors.length > 0 ?
                    errors.map(e => <span key={shortid.generate()}>{e.message}</span>) :
                    <span>Some unknown error occurred. Please Try Again.</span>
                }
            </div>
        }
        {inviteCode ? <div className="my-2 text-center">Invite Code: <b>{inviteCode}</b></div> : null }
        <form
            onSubmit={handleSignUp}
            aria-label="Sign Up Form"
            title="Sign Up Form"
        >
            <TextInput
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="email"
                label="Email Address"
                name="email"
                type="email"
                spellCheck="false"
                onValidate={(state) => setInvalidEmailState(!state)}
                isRequired
                minimal
                autoFocus={startFocused}
                hasErrors={hasErrors}
                errorText={(hasErrors && errors && errors.length > 0 && errors[0].code === "EMAIL_IN_USE") && errors[0].message}
            />
            <TextInput
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                spellCheck="false"
                label="Password"
                name="password"
                type="password"
                onValidate={(state) => setInvalidPasswordState(!state)}
                isRequired
                minimal
            />
            <p className="small text-secondary mt-3 text-center">
                To create an account, you must be at-least 13 years old, and
                you agree to our Terms of Use & Privacy Policies.
            </p>
            <Button
                text="Create Account"
                disabled={invalidEmail || invalidPassword}
                type="submit"
                brandAccent
                className="w-100 p-3 font-weight-bold"
            />
        </form>
    </SignUpFormWrap>;
};