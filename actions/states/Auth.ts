import { createGlobalState } from 'react-hooks-global-state';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

type State = {
    token: string,
    username: string,
    refreshToken: string
};

const defaultState: State = {
    token: cookies.get('username'),
    refreshToken: cookies.get('refreshToken'),
    username: cookies.get('username')
};

// @ts-ignore
const { setGlobalState, useGlobalState } = createGlobalState(defaultState);

export const setToken = (token: string) => {
    cookies.set('token', token);
    setGlobalState('token', token );
};

export const setRefreshToken = (refreshToken: string) => {
    cookies.set('refreshToken', refreshToken);
    setGlobalState('refreshToken', refreshToken );
};

export const setUsername = (username: string) => {
    cookies.set('username', username);
    setGlobalState('username', username );
};

export { useGlobalState };