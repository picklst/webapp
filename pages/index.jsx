import React from 'react';
import { useGlobalState } from '../actions/states/Auth.ts';
import Base from "../components/core/Base";
import {Logout} from "../actions/states/Auth.ts";

const IndexPage = () => {
    const [data] = useGlobalState('userData');
    const [token] = useGlobalState('token');
    const isLoggedIn = typeof token === 'string' && token.length>0;

    const renderAuthenticatedView = () =>
    <Base
        meta={{
            title: "Dashboard Page"
        }}
    >
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="bg-white p-2" style={{ minWidth: '500px' }}>
                <img src={data.avatarURL} className="w-25" alt="user-avatar" />
                <h1>Hello {data.firstName} {data.lastName}!</h1>
                <button onClick={Logout} className="btn btn-primary">Logout</button>
            </div>
        </div>
    </Base>;

    const renderUnauthenticatedView = () =>
    <Base
        meta={{
            title: "Home Page"
        }}
    >
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="bg-white p-2" style={{ width: '500px' }}>
                <h1>Welcome!</h1>
                <a href="/login"><button className="btn btn-primary">Login</button></a>
            </div>
        </div>
    </Base>;

    return isLoggedIn ? renderAuthenticatedView() : renderUnauthenticatedView()
};

export default IndexPage;