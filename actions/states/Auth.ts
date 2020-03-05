import { createGlobalState } from 'react-hooks-global-state';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

type State = {
    token: string|null,
    username: string|null,
    refreshToken: string|null,
    userData: object|null,
    rememberUser: boolean
};

const defaultState: State = {
    token: cookies.get('token') || null,
    refreshToken: cookies.get('refreshToken') || null,
    username: cookies.get('username') || null,
    userData: cookies.get('userData') || null,
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
        cookies.remove('refreshToken');
    else
        cookies.set('refreshToken', refreshToken);
    setGlobalState('refreshToken', refreshToken);
};

export const setUsername = (username: string|null) => {
    if(username === null)
        cookies.remove('username');
    else
        cookies.set('username', username);
    setGlobalState('username', username);
};

export const setUserData = (userData: object|null) => {
    if(userData === null)
        cookies.remove('userData');
    else
        cookies.set('userData', userData);
    setGlobalState('userData', userData);
};

export const setRememberUser = (value: boolean) => {
    cookies.set('rememberUser', value);
    setGlobalState('rememberUser', value);
    if(!value)
    {
        setUsername(null);
        setUserData(null);
    }
};

export const Logout = () => {
    setToken(null);
    setRefreshToken(null);
    if(cookies.get('rememberUser') === 'false')
    {
        cookies.remove('userData');
        console.log('removing user data');
        setUsername(null);
        setUserData(null);
    }
};

export { useGlobalState };