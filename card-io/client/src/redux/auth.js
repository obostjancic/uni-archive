import request from './../common/request';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

const initialState = {
    isLoggedIn: localStorage.getItem('token') || sessionStorage.getItem('token'),
    firstName: '',
    token: null,
    fetching: false,
    fetched: false
};

const auth = (state = initialState, action = {}) => {
    switch (action.type) {
    case `${LOGIN}_PENDING`:
        return {
            ...state, fetching: true, fetched: false
        };
    case `${LOGIN}_FULFILLED`:
        localStorage.setItem('token', action.payload.data.token);
        sessionStorage.setItem('token', action.payload.data.token);
        return {
            ...state, fetching: false, fetched: true, isLoggedIn: true, ...action.payload.data
        };
    case `${LOGIN}_REJECTED`:
        return {
            ...state, fetching: false, fetched: false, error: action.payload.error
        };
    case LOGOUT:
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        return {
            ...state, fetching: false, fetched: true, isLoggedIn: false
        };
    case `${REGISTER}_PENDING`:
        return {
            ...state, fetching: true, fetched: false
        };
    case `${REGISTER}_FULFILLED`:
        return {
            ...state, fetching: false, fetched: true
        };
    case `${REGISTER}_REJECTED`:
        return {
            ...state, fetching: false, fetched: false, error: action.payload.error
        };
    default:
        return state;
    }
};

export const login = (userData) => (dispatch) => (dispatch({
    type: LOGIN,
    payload: request.post('/login', userData)
}));

export const logout = () => (dispatch) => (dispatch({
    type: LOGOUT,
}));

export const register = (userData) => (dispatch) => (dispatch({
    type: REGISTER,
    payload: request.post('/register', userData)
}));

export default auth;
