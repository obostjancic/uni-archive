import list from './list';

const initialState = {
    40: {
        id: 40,
        name: 'Lorem ipsum list 40 pos 1',
        pos: 1,
        fetching: false,
        fetched: false
    },
    15: {
        id: 15,
        name: 'Lorem ipsum list 15 pos 2',
        pos: 2,
        fetching: false,
        fetched: false
    }
};

const lists = (state = initialState, action = {}) => {
    if (action.payload && action.payload.listId) {
        return {
            ...state,
            [action.payload.listId]: list(state[action.payload.listId], action)
        };
    }
    return state;
};

export default lists;
