import { createGlobalState } from 'react-hooks-global-state';

type State = {
    showFeedbackForm: boolean,
};

const defaultState: State = {
    showFeedbackForm: false,
};

const { setGlobalState, useGlobalState } = createGlobalState(defaultState);

export { setGlobalState, useGlobalState };