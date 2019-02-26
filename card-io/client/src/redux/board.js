import request from './../common/request';

export const FETCH_ACTIVE_BOARD = 'FETCH_ACTIVE_BOARD';
export const UPDATE_ACTIVE_BOARD = 'UPDATE_ACTIVE_BOARD';
export const ADD_NEW_LIST = 'ADD_NEW_LIST';
export const TOGGLE_LABEL_TEXT = 'TOGGLE_LABEL_TEXT';
export const OPEN_CARD_DETAIL = 'OPEN_CARD_DETAIL'; // done
export const CLOSE_CARD_DETAIL = 'CLOSE_CARD_DETAIL'; // done


const initialState = {
    id: null,
    name: 'Lorem ipsum board',
    admin: null,
    lists: [],
    cards: [],
    labelTextVisible: false,
    fetching: false,
    fetched: false,
    members: [{ color: 'green', user: { id: 5, firstName: 'Ognjen', lastName: 'Bostjančić' } },
        { color: 'orange', user: { id: 7, firstName: 'Muhamed', lastName: 'Ahmatović' } },
        { color: 'teal', user: { id: 9, firstName: 'Neki', lastName: 'Treći' } }],
    cardDetail: {
        visible: false,
        cardId: undefined
    }
};

const board = (state = initialState, action = {}) => {
    switch (action.type) {
    case `${FETCH_ACTIVE_BOARD}_PENDING`:
        return {
            ...state, fetching: true, fetched: false
        };
    case `${FETCH_ACTIVE_BOARD}_FULFILLED`:
        return {
            ...state, fetching: false, fetched: true, ...action.payload.data
        };
    case `${FETCH_ACTIVE_BOARD}_REJECTED`:
        return {
            ...state, fetching: false, fetched: false, error: action.payload.error
        };
    case TOGGLE_LABEL_TEXT:
        return {
            ...state, labelTextVisible: !state.labelTextVisible
        };
    case OPEN_CARD_DETAIL:
        return {
            ...state, cardDetail: { visible: !state.cardDetail.visible, cardId: action.payload }
        };
    case CLOSE_CARD_DETAIL:
        return {
            ...state, cardDetail: initialState.cardDetail
        };
    default:
        return state;
    }
};

export const fetchActiveBoard = () => (dispatch) => (dispatch({
    type: FETCH_ACTIVE_BOARD,
    payload: request.get('/board/active')
}));

export const toggleLabelText = () => (dispatch) => (dispatch({
    type: TOGGLE_LABEL_TEXT,
}));

export const openCardDetail = (cardId) => (dispatch) => (dispatch({
    type: OPEN_CARD_DETAIL,
    payload: cardId
}));

export const closeCardDetail = (cardId) => (dispatch) => (dispatch({
    type: OPEN_CARD_DETAIL,
}));


export default board;
