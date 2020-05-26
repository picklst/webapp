import { createGlobalState } from 'react-hooks-global-state';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

type State = {
    email: string|null
}

const defaultState: State = {
    email: cookies.get('inviteEmail') || null,
};

const { setGlobalState, useGlobalState } = createGlobalState(defaultState);

export const setEmail = (email: string|null) => {
    if(email === null) cookies.remove('inviteEmail');
    else cookies.set('inviteEmail', email)
    setGlobalState('email', email);
};

export { useGlobalState };
