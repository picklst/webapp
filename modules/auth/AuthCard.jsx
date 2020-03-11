import React from 'react';
import dynamic from "next/dynamic";

const LoginForm = dynamic(import("./LoginForm.tsx"));
const SignupForm = dynamic(import("./SignupForm.tsx"));

const AuthCard = ({ showLogin }) => {

    const [showLoginCard, setShowLogin] = React.useState(showLogin);

    return <div className="bg-white p-4" style={{ width: '450px' }}>
        {
            showLoginCard ?
                <div>
                    <div className="mb-4">
                        <h3>Login to your Account</h3>
                    </div>
                    <LoginForm />
                    <div className="text-center my-2">
                        Do not have an account?
                        <a href="#" className="d-block" onClick={() => setShowLogin(false)}>Create Account</a>
                    </div>
                </div>
            : <div>
                <div className="mb-4">
                    <h3>Create an account.</h3>
                </div>
                <SignupForm />
                <div className="text-center my-2">
                    Already have an account?
                    <a href="#" className="d-block" onClick={() => setShowLogin(true)}>Login</a>
                </div>
            </div>
        }
    </div>;

};

export default AuthCard;