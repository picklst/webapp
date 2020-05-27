import React from 'react';
import {Landing, UserDashboard} from "../components/pages";
import {useAuthState} from "../states";


const IndexPage = () => {
    const [data, setData] = useAuthState('userInfo');
    const isLoggedIn = !!data;

    console.log(isLoggedIn);

    return isLoggedIn ? <UserDashboard /> : <Landing />;
};

export default IndexPage;