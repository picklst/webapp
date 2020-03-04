import React from 'react';
import { useGlobalState } from '../actions/states/Auth.ts';

const IndexPage = () => {
    const username = useGlobalState('username');
    console.log(username);

    return <h1>Hello {username}</h1>;
};

export default IndexPage;