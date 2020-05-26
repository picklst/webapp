import { createGlobalState } from 'react-hooks-global-state';

import store from 'store2';

type State = {
    UserInfo: object|null,
};

const defaultState: State = {
    UserInfo: store.get('UserInfo') || null,
};

// @ts-ignore
const { setGlobalState, useGlobalState } = createGlobalState(defaultState);

export const setUserInfo = (UserInfo: object|null) => {
    if(UserInfo === null)
        store.remove('UserInfo');
    else
        store.set('UserInfo', UserInfo);
    setGlobalState('UserInfo', UserInfo);
};

export { useGlobalState };