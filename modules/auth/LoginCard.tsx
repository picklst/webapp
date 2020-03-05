import * as React from "react";
// @ts-ignore
import LoginForm from "./LoginForm.tsx";

const LoginCard: React.FC<React.Props> = () => {

    return <div className="bg-white p-4">
        <h1>Login</h1>
        <LoginForm />
    </div>;

};
export default LoginCard;