import React, {useState} from 'react';
import {useGlobalState} from "../../../../actions/states/Auth.ts";
import { AuthCard } from '../../../auth'

import { ListRequester } from '../../views'

export default ({ username, onComplete, onClose }) => {
    const [token] = useGlobalState('token');
    const [isLoggedIn, setLoggedIn] = useState(!!token);
    const [msg, setMsg] = useState('');

    return isLoggedIn ?
    <ListRequester
        username={username}
        message={msg}
        onChange={setMsg}
        onSubmit={onComplete}
        onClose={onClose}
    /> :
    <AuthCard
        variant="bottom-popup"
        onClose={onClose}
        onComplete={() => setLoggedIn(true)}
    />
};
