import React from 'react';
import Base from "../components/core/Base";
import LoginForm from "../modules/auth/LoginForm.tsx";

const LoginPage = () => {
    return <Base
        meta={{
            title: "Login"
        }}
    >
        <h1>Login</h1>
        <LoginForm />
    </Base>;
};

export default LoginPage;