import React, {useState} from 'react';
import TextInput from "../../../forms/TextInput";
import Button from "../../../ui/Button";
import styled from '@emotion/styled'


const SignUpFormWrap = styled.div`
  width: 100%;
  img {
    height: 200px;
    max-height: 20vh;
    margin-bottom: 3vh;
  }
`;

export default ({ onSignUp, startFocused, inviteCode, showIllustration }) => {
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
        <div className="text-center">
            {   showIllustration ?
                    <img alt="invite-required" src={require('../../../../images/assets/illustrations/sign-up.png')} />
                : null
            }
            <h2>Create an Account.</h2>
        </div>
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