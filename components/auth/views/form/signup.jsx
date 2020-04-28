import React, {useState} from 'react';
import TextInput from "../../../forms/TextInput";
import Button from "../../../ui/Button";

export default ({ onSignUp }) => {
    const [invalidEmail, setInvalidEmailState] = useState(false);
    const [invalidPassword, setInvalidPasswordState] = useState(true);

    const handleSignUp = (ev) => {
        ev.preventDefault();
        onSignUp({
            email: ev.currentTarget['email'].value.toLowerCase(),
            password: ev.currentTarget['password'].value
        })
    };

    return <form
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
            autoFocus
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
        <p className="small mt-3 text-center">
            To create an account, you must be at-least 13 years old, and
            you agree to our Terms, Data Policy and Cookie Policy.
        </p>
        <Button
            text="Create Account"
            disabled={invalidEmail || invalidPassword}
            type="submit"
            className="btn btn-block p-2 font-weight-bold btn-primary"
        />
    </form>;
};