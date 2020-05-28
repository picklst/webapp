import { createGlobalState } from 'react-hooks-global-state';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
import store from 'store2';

type State = {
    userInfo: object|null,
};

const defaultState: State = {
    userInfo: cookies.get('JWTRefreshExpiry') && store.get('UserInfo') || null,
};

// @ts-ignore
const { setGlobalState, useGlobalState } = createGlobalState(defaultState);

export const setUserInfo = (userInfo: object|null) => {
    if(userInfo === null)
        store.remove('UserInfo');
    else
        store.set('UserInfo', userInfo);
    setGlobalState('userInfo', userInfo);
};

export { useGlobalState };