import { createGlobalState } from 'react-hooks-global-state';

import store from 'store2';

type State = {
    votes: object|null,
};

const defaultState: State = {
    votes: store.get('listVotes') || null,
};

const { setGlobalState, useGlobalState } = createGlobalState(defaultState);

export const LogVote = (listSlug, itemID) => {
    let votes = store.get('listVotes') || {};
    votes[listSlug] = itemID;
    store.set('listVotes', votes);
    setGlobalState('votes', votes);
};

export const UnlogVote = (listSlug) => {
    let votes = store.get('listVotes') || {};
    votes[listSlug] = null;
    store.set('listVotes', {...votes});
    setGlobalState('votes', {...votes});
};

export { useGlobalState };