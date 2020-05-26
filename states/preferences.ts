import { createGlobalState } from 'react-hooks-global-state';

type State = {
    listViewMode: string,
    hideDistractions: boolean,
    topbarHeight: number
};

const defaultState: State = {
    listViewMode: 'card',
    hideDistractions: false,
    topbarHeight: 0
};

const { setGlobalState, useGlobalState } = createGlobalState(defaultState);

export { setGlobalState, useGlobalState };