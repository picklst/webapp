import * as React from 'react';

const LoginForm: React.FC<React.Props> = () => {
    const usernameField = React.useRef<HTMLInputElement>(null);
    const passwordField = React.useRef<HTMLInputElement>(null);

    const [touched, touch] = React.useState<boolean>(false);
    const [invalidUsername, showUsernameValidationError] = React.useState<boolean>(true);
    const [invalidPassword, showPasswordValidationError] = React.useState<boolean>(true);

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

    const handleLogin: React.ReactEventHandler<HTMLFormElement> = (ev) => {
        ev.preventDefault();
        const username = ev.currentTarget['username-email'].value.toLowerCase();
        const password = ev.currentTarget['password'].value.toLowerCase();
        if(validateInput(username) && validateInput(password))
            console.log(username, password);
    };

    return <div>
        <form onSubmit={handleLogin}>
            <div className="form-group">
                <label htmlFor="username-email">Username / Email</label>
                <input
                    ref={usernameField}
                    name="username-email"
                    placeholder="Username / Email"
                    spellCheck="false"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    onFocus={() => { showUsernameValidationError<boolean>(false); }}
                    onBlur={(e) => handleInputBlur<HTMLInputElement, Function>(e, showUsernameValidationError)}
                />
                { invalidUsername && touched ? <div className="text-danger">Please enter a valid username / email</div> : null }
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    ref={passwordField}
                    name="password"
                    placeholder="Password"
                    type="password"
                    spellCheck="false"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    onFocus={() => { showPasswordValidationError<boolean>(false);  }}
                    onBlur={(e) => handleInputBlur<HTMLInputElement, Function>(e, showPasswordValidationError)}
                />
                { invalidPassword && touched ? <div className="text-danger">Please enter a valid password</div> : null }
            </div>
            <button
                disabled={invalidUsername || invalidPassword}
                type="submit"
                className="btn btn-primary"
            >
                Login
            </button>
        </form>
    </div>;
};

export default LoginForm;