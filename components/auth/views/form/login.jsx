import React, {useState} from 'react';
import styled from '@emotion/styled'

import { Button } from "../../../ui";
import TextInput from "../../../forms/TextInput";


const LoginFormWrap = styled.div`
  width: 100%;
  img {
    height: 200px;
    max-height: 20vh;
    margin-bottom: 3vh;
  }
`;

export default ({ onLogin, startFocused, onRequestPasswordReset, showIllustration }) => {
    const [invalidUsername, setInvalidUsernameState] = useState(false);
    const [invalidPassword, setInvalidPasswordState] = useState(true);

    const handleLogin = (ev) => {
        ev.preventDefault();
        onLogin({
            email: ev.currentTarget['username-email'].value.toLowerCase(),
            password: ev.currentTarget['password'].value
        })
    };

    return <LoginFormWrap>
        <div className="text-center">
            {
                showIllustration ?
                    <img alt="invite-required" src={require('../../../../images/assets/illustrations/sign-in.png')} />
                : null
            }
            <h3>Login to Your Account.</h3>
        </div>
        <form
            aria-label="Login Form"
            title="Login Form"
            onSubmit={handleLogin}
        >
            <TextInput
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="email"
                spellCheck="false"
                label="Username or Email Address"
                name="username-email"
                type="text"
                disableSpace
                isRequired
                onValidate={(state) => setInvalidUsernameState(!state)}
                minimal
                autoFocus={startFocused}
            />
            <TextInput
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="password"
                spellCheck="false"
                label="Password"
                name="password"
                type="password"
                isRequired
                onValidate={(state) => setInvalidPasswordState(!state)}
                minimal
            />
            <div className="form-group form-check text-left my-4 px-4">
                <input aria-label="Remember User Details" id="remember-me-checkbox" type="checkbox" className="form-check-input" name="remember-me" />
                <label className="form-check-label" htmlFor="remember-me-checkbox">Remember Me</label>
            </div>
            <Button
                text="Login"
                disabled={invalidUsername || invalidPassword}
                type="submit"
                brandAccent
                className="w-100 p-3 font-weight-bold"
            />
            <div className="mt-3 text-center">
                Need Help? <a onClick={onRequestPasswordReset} href="#">Reset Your Password</a>
            </div>
        </form>
    </LoginFormWrap>;
};