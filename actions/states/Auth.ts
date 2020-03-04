import { createGlobalState } from 'react-hooks-global-state';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

type State = {
    token: string,
    username: string,
    refreshToken: string
};

const defaultState: State = {
    token: cookies.get('username') || null,
    refreshToken: cookies.get('refreshToken') || null,
    username: cookies.get('username') || null
};

// @ts-ignore
const { setGlobalState, useGlobalState } = createGlobalState(defaultState);

export const setToken = (token: string|null) => {
    if(token === null)
        cookies.remove('token');
    else
        cookies.set('token', token);
    setGlobalState('token', token );
};

export const setRefreshToken = (refreshToken: string|null) => {
    if(refreshToken === null)
        cookies.remove('refreshToken');
    else
        cookies.set('refreshToken', refreshToken);
    setGlobalState('refreshToken', refreshToken );
};

export const setUsername = (username: string|null) => {
    if(username === null)
        cookies.remove('username');
    else
        cookies.set('username', username);
    setGlobalState('username', username );
};

export const Logout = () => {
    setUsername(null);
    setToken(null);
    setRefreshToken(null);
};

export { useGlobalState };