import { createGlobalState } from 'react-hooks-global-state';
import Cookies from 'universal-cookie';

import store from 'store2';

const cookies = new Cookies();

type State = {
    token: string|null,
    username: string|null,
    refreshToken: string|null,
    UserInfo: object|null,
    rememberUser: boolean
};

const defaultState: State = {
    token: cookies.get('token') || null,
    refreshToken: cookies.get('refreshToken') || null,
    username: cookies.get('username') || null,
    UserInfo: store.get('UserInfo') || null,
    rememberUser: cookies.get('rememberUser') || false
};

// @ts-ignore
const { setGlobalState, useGlobalState } = createGlobalState(defaultState);

export const setToken = (token: string|null) => {
    if(token === null)
        cookies.remove('token');
    else
        cookies.set('token', token);
    setGlobalState('token', token);
};

export const setRefreshToken = (refreshToken: string|null) => {
    if(refreshToken === null)
        cookies.remove('refreshToken', { path: '/' });
    else
        cookies.set('refreshToken', refreshToken);
    setGlobalState('refreshToken', refreshToken);
};

export const setUsername = (username: string|null) => {
    if(username === null)
        cookies.remove('username', { path: '/' });
    else
        cookies.set('username', username);
    setGlobalState('username', username);
};

export const setUserInfo = (UserInfo: object|null) => {
    console.log('setting user info', UserInfo);
    if(UserInfo === null)
        store.remove('UserInfo');
    else
        store.set('UserInfo', UserInfo);
    setGlobalState('UserInfo', UserInfo);
};

export const setRememberUser = (value: boolean) => {
    cookies.set('rememberUser', value);
    setGlobalState('rememberUser', value);
    if(!value)
    {
        setUsername(null);
        setUserInfo(null);
    }
};

export const Logout = () => {
    setToken(null);
    setRefreshToken(null);
    if(cookies.get('rememberUser') === 'false')
    {
        store.remove('UserInfo');
        console.log('removing user data');
        setUsername(null);
        setUserInfo(null);
    }
};

export { useGlobalState };