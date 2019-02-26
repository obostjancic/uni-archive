import moment from 'moment';
import checklist from './checklist';
import randomId from './../../common/random';
import {
    CHANGE_TEXT,
    CHANGE_DATE,
    REMOVE_DATE,
    TOGGLE_COMPLETED,
    ADD_DESCRIPTION,
    CHANGE_DESCRIPTION,
    REMOVE_DESCRIPTION,
    ADD_DATE,
    CHANGE_LABEL,
    REMOVE_LABEL,
    ADD_LABEL, ADD_MEMBER, REMOVE_MEMBER
} from './actions-types';

const initialState = {

    pos: 999,
    activity: [],
    fetching: false,
    fetched: false
};

const cardCompleted = (state = false, action = {}) => {
    switch (action.type) {
    case TOGGLE_COMPLETED:
        return !state;
    default:
        return state;
    }
};

const cardDate = (state = null, action = {}) => {
    switch (action.type) {
    case ADD_DATE:
        return moment().add(1, 'days');
    case CHANGE_DATE:
        return action.payload.date;
    case REMOVE_DATE:
        return null;
    default:
        return state;
    }
};

const description = (state = undefined, action = {}) => {
    switch (action.type) {
    case ADD_DESCRIPTION:
        return '';
    case CHANGE_DESCRIPTION:
        return action.payload.description;
    case REMOVE_DESCRIPTION:
        return undefined;
    default:
        return state;
    }
};

const labels = (state = [], action = {}) => {
    switch (action.type) {
    case ADD_LABEL:
        return [...state, { id: randomId(), color: action.payload.color, text: action.payload.text }];
    case REMOVE_LABEL:
        return state.filter(e => e.color !== action.payload.color);
    case CHANGE_LABEL:
        return state.map(e => e.color !== action.payload.color ? e : { color: e.color, text: action.payload.text });
    default:
        return state;
    }
};

const members = (state = [], action = {}) => {
    switch (action.type) {
    case ADD_MEMBER:
        return [...state, { ...action.payload.member }];
    case REMOVE_MEMBER:
        return state.filter(member => member.user.id !== action.payload.member.user.id);
    default:
        return state;
    }
};

const text = (state = '', action = {}) => {
    switch (action.type) {
    case CHANGE_TEXT:
        return action.payload.text;
    default:
        return state;
    }
};

const card = (state = initialState, action = {}) => ({
    ...state,
    text: text(state.text, action),
    description: description(state.description, action),
    date: cardDate(state.date, action),
    completed: cardCompleted(state.completed, action),
    checklist: checklist(state.checklist, action),
    labels: labels(state.labels, action),
    members: members(state.members, action)
});

export const changeText = (cardId, newText) => (dispatch) => (dispatch({
    type: CHANGE_TEXT,
    payload: { cardId, text: newText }
}));

export const toggleCompleted = (cardId) => (dispatch) => (dispatch({
    type: TOGGLE_COMPLETED,
    payload: { cardId }
}));

export const addDate = (cardId, newDate) => (dispatch) => (dispatch({
    type: ADD_DATE,
    payload: { cardId }
}));

export const changeDate = (cardId, newDate) => (dispatch) => (dispatch({
    type: CHANGE_DATE,
    payload: { cardId, date: newDate }
}));

export const removeDate = (cardId) => (dispatch) => (dispatch({
    type: REMOVE_DATE,
    payload: { cardId }
}));

export const addDescription = (cardId) => (dispatch) => (dispatch({
    type: ADD_DESCRIPTION,
    payload: { cardId }
}));

export const changeDescription = (cardId, newDescription) => (dispatch) => (dispatch({
    type: CHANGE_DESCRIPTION,
    payload: { cardId, description: newDescription }
}));

export const removeDescription = (cardId) => (dispatch) => (dispatch({
    type: REMOVE_DESCRIPTION,
    payload: { cardId }
}));

export const addLabel = (cardId, color, labelText = color.charAt(0).toUpperCase() + color.slice(1)) => (dispatch) => (dispatch({
    type: ADD_LABEL,
    payload: { cardId, color, text: labelText }
}));


export const removeLabel = (cardId, color) => (dispatch) => {
    dispatch({
        type: REMOVE_LABEL,
        payload: { cardId, color }
    });
};

export const changeLabel = (cardId, color, labelText) => (dispatch) => {
    dispatch({
        type: CHANGE_LABEL,
        payload: { cardId, color, text: labelText }
    });
};

export const addMember = (cardId, member) => (dispatch) => (dispatch({
    type: ADD_MEMBER,
    payload: { cardId, member }
}));


export const removeMember = (cardId, member) => (dispatch) => (dispatch({
    type: REMOVE_MEMBER,
    payload: { cardId, member }
}));

export default card;
