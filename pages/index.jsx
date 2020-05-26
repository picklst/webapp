import React from 'react';
import { useGlobalState } from '../actions/states/Auth.ts';
import {Landing, UserDashboard} from "../components/pages";


const IndexPage = () => {
    const [data] = useGlobalState('UserInfo');
    const isLoggedIn = !!data;

    return isLoggedIn ? <UserDashboard /> :  <Landing />;
};

export default IndexPage;