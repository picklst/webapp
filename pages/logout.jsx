import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { setToken, setRefreshToken, setUsername, useGlobalState } from '../actions/states/Auth.ts';

const LogoutPage = () => {
    const router = useRouter();

    const [token] = useGlobalState('token');

    useEffect(() => {
        if(typeof token === "string")
        {
            setToken(null);
            setRefreshToken(null);
            setUsername(null);
            router.push('/');
        } else {
            router.push('/');
        }
    });

    return typeof token === "string" ? <div>Logging you Out</div>
        : <div>Logging you Out</div>;
};

export default LogoutPage