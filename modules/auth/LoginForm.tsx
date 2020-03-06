import * as React from "react";
// @ts-ignore
import Login from "../../actions/functions/Login.ts";
// @ts-ignore
import {setRememberUser, useGlobalState} from "../../actions/states/Auth.ts";
import { useRouter } from "next/router";

import shortid from "shortid";

const LoginForm: React.FC<React.Props> = () => {
    const router = useRouter();
    const usernameField = React.useRef<HTMLInputElement>(null);
    const passwordField = React.useRef<HTMLInputElement>(null);

    const [touched, touch] = React.useState<boolean>(false);
    const [invalidUsername, showUsernameValidationError] = React.useState<boolean>(true);
    const [invalidPassword, showPasswordValidationError] = React.useState<boolean>(true);
    const [invalidCredentials, setInvalidCredentials] = React.useState<boolean>(false);
    const [token, setToken] = useGlobalState('token');

    React.useEffect(() => {
        if(typeof token === "string") { router.push(`/`); }
    });

    function validateInput(input: string): boolean {
        if(input.length < 1)
            return false;
        //@todo more conditions can be added here later
        return true;
    }

    const handleInputBlur: React.ReactEventHandler<HTMLInputElement, Function> = (ev, state) => {
        const value = ev.currentTarget.value;
        touch<boolean>(true);
        //@todo fix ts error
        // @ts-ignore
        state<boolean>(!validateInput<string>(value));
    };
    const [rememberUser] = useGlobalState('rememberUser');
    const [userData] = useGlobalState('userData');

    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<Array<object>|any>(null);
    const handleLogin: React.ReactEventHandler<HTMLFormElement> = (ev) => {
        ev.preventDefault();
        let username = '';
        if(!userData)
            username = ev.currentTarget['username-email'].value.toLowerCase();
        else
            username = userData.username;
        const password = ev.currentTarget['password'].value;
        setLoading(true);
        setRememberUser(ev.currentTarget['remember-me'].checked);
        if(validateInput(username) && validateInput(password))
            Login({username, password}).then(response => {
                setLoading(false);
                if(response.hasOwnProperty('errors'))
                {
                    setErrors(response.errors);
                    setInvalidCredentials(true);
                }
                else
                    setToken(response.token);
            })
    };

    const renderUsernameInput = () => <div>
        {
            rememberUser === 'true' && userData ?
                <div className="p-2">
                    <div className="row m-0">
                        <div className="col-2">
                            <img src={userData.avatarURL} className="w-100" alt="user-avatar" />
                        </div>
                        <div className="col-10 d-flex align-items-center p-2">
                            <div>
                                <div className="font-weight-bold">{userData.firstName} {userData.lastName}</div>
                                <div>@{userData.username}</div>
                                <button onClick={() => setRememberUser(false)} className="btn">Change Account</button>
                            </div>
                        </div>
                    </div>
                </div>
                : <div className="form-group">
                    <label
                        aria-hidden={false}
                        className={invalidUsername ? 'd-none' : 'font-weight-bold text-primary'}
                        htmlFor="username-email"
                    >
                        Username / Email
                    </label>
                    {invalidUsername && touched ? <div className="text-danger mb-1">Please enter a valid username / email</div> : null}
                    <input
                        ref={usernameField}
                        name="username-email"
                        placeholder="Username or Email Address"
                        spellCheck="false"
                        autoComplete="username"
                        autoCorrect="off"
                        autoCapitalize="off"
                        className="d-block p-2 form-control"
                        onFocus={() => {
                            showUsernameValidationError<boolean>(false);
                        }}
                        onBlur={(e) => handleInputBlur<HTMLInputElement, Function>(e, showUsernameValidationError)}
                    />
                </div>
        }
    </div>;


    return <div>
        {
            invalidCredentials ?
                <div className="alert alert-danger">
                    {errors.map(e => <span key={shortid.generate()}>{e.message}</span>)}
                </div>
            : null
        }
        {
            !isLoading ?
                <form onSubmit={handleLogin}>
                    { renderUsernameInput() }
                    <div className="form-group">
                        <label
                            aria-hidden={false}
                            className={invalidPassword ? 'd-none' : 'font-weight-bold text-primary'}
                            htmlFor="password"
                        >
                            Password
                        </label>
                        { invalidPassword && touched ? <div className="text-danger mb-1">Please enter a valid password</div> : null }
                        <input
                            ref={passwordField}
                            name="password"
                            placeholder="Password"
                            type="password"
                            spellCheck="false"
                            autoComplete="password"
                            autoCorrect="off"
                            autoCapitalize="off"
                            className="d-block p-2 form-control"
                            onFocus={() => { showPasswordValidationError<boolean>(false);  }}
                            onBlur={(e) => handleInputBlur<HTMLInputElement, Function>(e, showPasswordValidationError)}
                        />
                    </div>
                    <div className="form-group form-check px-4">
                        <input type="checkbox" className="form-check-input" name="remember-me" />
                        <label className="form-check-label" htmlFor="remember-me">Remember Me</label>
                    </div>
                    <button
                        disabled={(invalidUsername || rememberUser === 'true') || invalidPassword}
                        type="submit"
                        className="btn btn-block p-2 font-weight-bold btn-primary"
                    >
                        LOGIN
                    </button>
                </form>
            : null
        }
    </div>;
};


export default LoginForm;