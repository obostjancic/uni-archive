import request from './../common/request';

export const FETCH_BOARD_LIST = 'FETCH_BOARD_LIST';
export const TOGGLE_BOARD_LIST = 'TOGGLE_BOARD_LIST';

const initialState = {
    visibleBoardList: false,
    boards: [],
    fetching: false,
    fetched: false
};

const navbar = (state = initialState, action = {}) => {
    switch (action.type) {
    case TOGGLE_BOARD_LIST:
        return {
            ...state, visibleBoardList: !state.visibleBoardList
        };
    case `${FETCH_BOARD_LIST}_PENDING`:
        return {
            ...state, fetching: true, fetched: false
        };
    case `${FETCH_BOARD_LIST}_FULFILLED`:
        return {
            ...state, fetching: false, fetched: true, boards: action.payload.data
        };
    case `${FETCH_BOARD_LIST}_REJECTED`:
        return {
            ...state, fetching: false, fetched: false, error: action.payload.error
        };
    default:
        return state;
    }
};

export const toggleBoardList = () => (dispatch) => (dispatch({
    type: TOGGLE_BOARD_LIST,
}));

export const fetchBoardList = () => (dispatch) => (dispatch({
    type: FETCH_BOARD_LIST,
    payload: request.get('/boards')
}));

export default navbar;
