import React from 'react';
import Base from "../components/core/Base";
import AuthCard from "../modules/auth/AuthCard";

const SignUpPage = () => {
    return <Base
        meta={{
            title: "SignUp"
        }}
    >
        <div className="container d-flex align-items-center justify-content-center p-2 min-vh-100">
            <AuthCard />
        </div>
    </Base>;
};

export default SignUpPage;