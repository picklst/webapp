import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router'

import {useAuthState} from "../states";

import Base from "../components/core/Base";

import { AuthCard } from "../components/auth";

const LoginPage = () => {
    const router = useRouter();

    const [isLoaded, setLoaded] = useState(false);

    const [data, setData] = useAuthState('userInfo');

    useEffect(() => {
         if(data && data.username) { router.push('/'); }
         else { setLoaded(true); }
    });

    return <Base meta={{ title: "Login" }}>
    {
        isLoaded ?
        <div className="container p-0 d-flex align-items-center justify-content-center p-md-4">
            <AuthCard onComplete={() => router.push('/')} />
        </div> :
        <div>
            <h1>Loading</h1>
        </div>
    }
    </Base>

};

export default LoginPage;