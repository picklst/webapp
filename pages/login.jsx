import React from 'react';
import Base from "../components/core/Base";
import LoginCard from "../modules/auth/LoginCard.tsx";

const LoginPage = () => {
    return <Base
        meta={{
            title: "Login"
        }}
    >
        <div className="container p-2">
            <h1>Login</h1>
            <LoginCard />
        </div>
    </Base>;
};

export default LoginPage;