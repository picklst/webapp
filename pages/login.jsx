import React from 'react';
import Base from "../components/core/Base";
import LoginForm from "../modules/auth/LoginForm.tsx";

const LoginPage = () => {
    return <Base
        meta={{
            title: "Login"
        }}
    >
        <div className="container p-2">
            <h1>Login</h1>
            <LoginForm />
        </div>
    </Base>;
};

export default LoginPage;