import * as React from "react";
// @ts-ignore
import LoginForm from "./LoginForm.tsx";

const LoginCard: React.FC<React.Props> = () => {

    return <div className="bg-white p-4" style={{ width: '450px' }}>
        <h1 className="text-center mb-4">LOGIN</h1>
        <LoginForm />
    </div>;

};
export default LoginCard;