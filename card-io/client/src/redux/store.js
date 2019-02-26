import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './rootReducer';


const enhancers = [];
const middleware = [promise(), thunk, logger];
enhancers.push(applyMiddleware(...middleware));

export default createStore(reducer, composeWithDevTools(...enhancers));
