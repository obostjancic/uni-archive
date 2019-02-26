import moment from 'moment';
import card from './card/card';
import randomId from '../common/random';

export const ADD_CARD = 'ADD_CARD';
export const ADD_EMPTY_CARD = 'ADD_EMPTY_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';

const initialState = {
    30: {
        id: 30,
        pos: 2,
        listId: 40,
        text: 'card 30, pos 2 ',
        description: 'card 30 description',
        labels: [{ id: 5, color: 'teal', text: 'Labela 1' }],
        members: [{ color: 'orange', user: { id: 7, firstName: 'Muhamed', lastName: 'Ahmatović' } }],
        activity: [{
            user: { firstName: 'Muhamed', lastName: 'Ahmatović' }, type: 'add', value: 'checklist', target: 'this card', time: moment(new Date())
        }],
        date: moment(),
        checklist: {
            70: {
                id: 70, pos: 1, text: 'Purchase a light bulb', completed: true
            },
            20: {
                id: 20, pos: 2, text: 'Bring it home', completed: true
            },
            50: {
                id: 50, pos: 3, text: 'Shut down power in the house', completed: true
            },
        },
        fetching: false,
        fetched: false
    },
    20: {
        id: 20,
        pos: 1,
        listId: 15,
        text: 'card 20, pos 1 ',
        labels: [{ id: 4, color: 'teal', text: 'Labela 1' }, { id: 2, color: 'purple', text: 'Labela 2' }],
        members: [{ color: 'green', user: { id: 5, firstName: 'Ognjen', lastName: 'Bostjančić' } }, { color: 'orange', user: { id: 7, firstName: 'Muhamed', lastName: 'Ahmatović' } }],
        activity: [{
            user: { firstName: 'Ognjen', lastName: 'Bostjančić' }, type: 'change', value: 'description', target: 'this card', time: moment(new Date())
        }, {
            user: { firstName: 'Muhamed', lastName: 'Ahmatović' }, type: 'add', value: 'checklist', target: 'this card', time: moment(new Date())
        }],
        checklist: {
            40: {
                id: 40, pos: 1, text: 'Take out the old light bulb', completed: false
            },
            30: {
                id: 30, pos: 2, text: 'Set the new one', completed: false
            },
            60: {
                id: 60, pos: 3, text: 'Bring the power back on', completed: false
            },
            10: {
                id: 10, pos: 4, text: 'Check if everything works', completed: false
            },
        },
        fetching: false,
        fetched: false
    },
};

const cards = (state = initialState, action = {}) => {
    if (action.payload && action.payload.listId) {
        const cardId = randomId();
        switch (action.type) {
        case ADD_EMPTY_CARD:
            return {
                ...state,
                [cardId]: { ...card(state[cardId], action), id: cardId, listId: action.payload.listId }
            };
        default:
            return state;
        }
    } else if (action.payload && action.payload.cardId) {
        switch (action.type) {
        case REMOVE_CARD:
            const { [`${action.payload.cardId}`]: omit, ...rest } = state;
            console.log(omit);
            console.log(rest);
            return {
                ...rest
            };
        default:
            return {
                ...state,
                [action.payload.cardId]: card(state[action.payload.cardId], action)
            };
        }
    }
    return state;
};

export const addEmptyCard = (listId) => (dispatch) => (dispatch({
    type: ADD_EMPTY_CARD,
    payload: { listId }
}));

export const removeCard = (cardId) => (dispatch) => (dispatch({
    type: REMOVE_CARD,
    payload: { cardId }
}));

export default cards;
