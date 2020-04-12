import React, {useState} from 'react';
import TextInput from "../../../forms/TextInput";
import Button from "../../../ui/Button";

export default ({ onLogin }) => {
    const [invalidUsername, setInvalidUsernameState] = useState(false);
    const [invalidPassword, setInvalidPasswordState] = useState(true);

    const handleLogin = (ev) => {
        ev.preventDefault();
        onLogin({
            email: ev.currentTarget['username-email'].value.toLowerCase(),
            password: ev.currentTarget['password'].value
        })
    };

    return <form
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
        <div className="form-group form-check my-4 px-4">
            <input aria-label="Remember User Details" id="remember-me-checkbox" type="checkbox" className="form-check-input" name="remember-me" />
            <label className="form-check-label" htmlFor="remember-me-checkbox">Remember Me</label>
        </div>
        <Button
            text="Login"
            disabled={invalidUsername || invalidPassword}
            type="submit"
            className="btn btn-block p-2 font-weight-bold btn-primary"
        />
    </form>;
};