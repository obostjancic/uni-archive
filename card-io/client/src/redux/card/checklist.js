import {
    ADD_CHECKLIST,
    ADD_CHECKLIST_ITEM,
    REMOVE_CHECKLIST_ITEM,
    CHANGE_CHECKLIST_ITEM,
    REMOVE_CHECKLIST,
} from './actions-types';
import randomId from './../../common/random';

const lastPos = (state) => (Object.keys(state).length + 1);

const checklist = (state = undefined, action = {}) => {
    switch (action.type) {
    case CHANGE_CHECKLIST_ITEM:
        return {
            ...state,
            [action.payload.changedItem.id]: action.payload.changedItem
        };
    case ADD_CHECKLIST_ITEM:
        const itemId = randomId();
        return {
            ...state,
            [itemId]: {
                id: itemId, pos: lastPos(state), text: '', completed: false
            }
        };
    case REMOVE_CHECKLIST_ITEM:
        const { [`${action.payload.itemId}`]: omit, ...rest } = state;
        return {
            ...rest
        };
    case ADD_CHECKLIST:
        return {};
    case REMOVE_CHECKLIST:
        return undefined;
    default:
        return state;
    }
};

export const changeChecklistItem = (cardId, changedItem) => (dispatch) => {
    console.log('action');
    return (dispatch({
        type: CHANGE_CHECKLIST_ITEM,
        payload: { cardId, changedItem }
    }));
};

export const addChecklistItem = (cardId) => (dispatch) => (dispatch({
    type: ADD_CHECKLIST_ITEM,
    payload: { cardId }
}));

export const removeChecklistItem = (cardId, itemId) => (dispatch) => (dispatch({
    type: REMOVE_CHECKLIST_ITEM,
    payload: { cardId, itemId }
}));

export const addChecklist = (cardId) => (dispatch) => {
    dispatch({
        type: ADD_CHECKLIST,
        payload: { cardId }
    });
    dispatch(addChecklistItem(cardId));
};

export const removeChecklist = (cardId) => (dispatch) => (dispatch({
    type: REMOVE_CHECKLIST,
    payload: { cardId }
}));

export default checklist;
