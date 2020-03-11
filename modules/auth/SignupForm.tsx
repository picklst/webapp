import * as React from "react";
import shortid from "shortid";
import TextInput from "../../components/forms/TextInput";
import Login from "../../actions/functions/Login.ts";
import SignUp from "../../actions/functions/SignUp.ts";
import {useGlobalState} from "../../actions/states/Auth.ts";
import {useRouter} from "next/router";

const SignupForm: React.FC<React.Props> = () => {
    const router = useRouter();

    const [invalidEmail, setInvalidEmailState] = React.useState<boolean>(true);
    const [invalidPassword, setInvalidPasswordState] = React.useState<boolean>(true);
    const [token, setToken] = useGlobalState('token');

    React.useEffect(() => {
        if(typeof token === "string") { router.push(`/`); }
    });
    
    const [isRegistering, setRegistering] = React.useState<boolean>(false);
    const [isLoggingIn, setLoggingIn] = React.useState<boolean>(false);
    const [registrationError, setRegistrationError] = React.useState<boolean>(false);
    const [loginError, setLoginError] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<Array<object>|any>(null);
    
    const handleSignUp: React.ReactEventHandler<HTMLFormElement> = (ev) => {
        ev.preventDefault();
        const email = ev.currentTarget['email'].value.toLowerCase();
        const password = ev.currentTarget['password'].value;
        setRegistering(true);
        SignUp({email, password}).then(response => {
            setRegistering(false);
            if(response.hasOwnProperty('errors'))
            {
                setErrors(response.errors);
                setRegistrationError(true);
            }
            else
            {
                setLoggingIn(true);
                Login({username: email, password}).then(response => {
                    setLoggingIn(false);
                    if(response.hasOwnProperty('errors'))
                    {
                        setErrors(response.errors);
                        setLoginError(true);
                    }
                    else
                        setToken(response.token);
                })
            }
        })
    };

    return <div>
    {
        isRegistering ?
            <div>Registering Account</div>
        : isLoggingIn ?
            <div>Logging into your Account</div>
        : <form
            onSubmit={handleSignUp}
            aria-label="Sign Up Form"
            title="Sign Up Form"
        >
                {
                    registrationError || loginError ?
                    <div className="alert alert-danger">
                        {errors.map(e => <span key={shortid.generate()}>{e.message}</span>)}
                    </div> : null
                }
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
                />
                <p className="small">
                    To create an account, you must be at-least 13 years old, and
                    you agree to our Terms, Data Policy and Cookie Policy.
                </p>
                <button
                    disabled={invalidEmail || invalidPassword}
                    type="submit"
                    className="btn btn-block p-2 font-weight-bold btn-primary"
                >
                    Create Account
                </button>
            </form>
    }
    </div>

};

export default SignupForm;
