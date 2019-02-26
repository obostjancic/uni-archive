import { combineReducers } from 'redux';
import auth from './auth';
import navbar from './navbar';
import board from './board';
import cards from './cards';
import lists from './lists';

const rootReducer = combineReducers({
    auth, navbar, board, lists, cards
});

export default rootReducer;
