import React, {useState} from 'react';
import styled from '@emotion/styled';
import shortid from "shortid";

import { Button, TextInput } from "../../../ui";


const LoginFormWrap = styled.div`
  width: 100%;
  img {
    height: 200px;
    max-height: 20vh;
    margin-bottom: 3vh;
  }
`;

export default ({ onLogin, startFocused, onRequestPasswordReset, showIllustration, hasErrors, errors }) => {
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
        <div className="text-center mb-2">
            {
                !hasErrors && showIllustration ?
                    <img alt="invite-required" src={require('../../../../images/assets/illustrations/sign-in.png')} />
                : <div className="mt-3" />
            }
            <h3>Login to Your Account.</h3>
        </div>
        {(hasErrors && errors && (errors.length > 1 || errors[0].code !== 'EMAIL_IN_USE')) &&
            <div className="alert alert-danger p-2 mt-3">
                {errors && errors.length > 0 ?
                    errors.map(e => <span key={shortid.generate()}>{e.message}</span>) :
                    <span>Some unknown error occurred. Please Try Again.</span>
                }
            </div>
        }
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