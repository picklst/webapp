import { createGlobalState } from 'react-hooks-global-state';

import store from 'store2';

type State = {
    userInfo: object|null,
};

const defaultState: State = {
    userInfo: store.get('UserInfo') || null,
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