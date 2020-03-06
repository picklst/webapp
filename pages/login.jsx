import React from 'react';
import Base from "../components/core/Base";
import LoginCard from "../modules/auth/LoginCard.tsx";

const LoginPage = () => {
    return <Base
        meta={{
            title: "Login"
        }}
    >
        <div className="container d-flex align-items-center justify-content-center p-2 min-vh-100">
            <LoginCard />
        </div>
    </Base>;
};

export default LoginPage;