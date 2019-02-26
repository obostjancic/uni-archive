import {
    FETCH_INSTITUTIONS, FETCH_PERSONAL_INFO, FETCH_PREVIOUS_JOBS, UPDATE_EDUCATION,
    UPDATE_PERSONAL_INFO
} from '../actions/profileActions';

const initialState = {
    profileInfo: {
        id: null,
        firstName: '',
        lastName: '',
        gender: 'Male',
        description: '',
        birthday: new Date(),
        telephone: '',
        placeOfBirth: '',
        education: {
            title: '',
            institution: {
                name: '',
                place: ''
            }
        }
    },
    institutionOptions: [],
    previousJobs: [],
    fetching: false,
    fetched: false,
    error: null
};

export default(state = initialState, action) => {
    switch (action.type) {
    case FETCH_PERSONAL_INFO + '_PENDING':
        return {
            ...state, fetching: true, fetched: false
        };
    case FETCH_PERSONAL_INFO + '_FULFILLED':
        return {
            ...state, fetching: false, fetched: true, profileInfo: action.payload.data
        };
    case FETCH_PERSONAL_INFO + '_REJECTED':
        return {
            ...state, fetching: false, fetched: false, error: action.payload.error
        };
    case FETCH_INSTITUTIONS + '_PENDING':
        return {
            ...state, fetching: true, fetched: false
        };
    case FETCH_INSTITUTIONS + '_FULFILLED':
        return {
            ...state, fetching: false, fetched: true, institutionOptions: action.payload.data
        };
    case FETCH_INSTITUTIONS + '_REJECTED':
        return {
            ...state, fetching: false, fetched: false, error: action.payload.error
        };
    case FETCH_PREVIOUS_JOBS + '_PENDING':
        return {
            ...state, fetching: true, fetched: false
        };
    case FETCH_PREVIOUS_JOBS + '_FULFILLED':
        return {
            ...state, fetching: false, fetched: true, previousJobs: action.payload.data
        };
    case FETCH_PREVIOUS_JOBS + '_REJECTED':
        return {
            ...state, fetching: false, fetched: false, error: action.payload.error
        };
    case UPDATE_PERSONAL_INFO + '_PENDING':
        return {
            ...state, fetching: true, fetched: false
        };
    case UPDATE_PERSONAL_INFO + '_FULFILLED':
        return {
            ...state, fetching: false, fetched: true, profileInfo: action.payload.data
        };
    case UPDATE_PERSONAL_INFO + '_REJECTED':
        return {
            ...state, fetching: false, fetched: false, error: action.payload.error
        };
    case UPDATE_EDUCATION + '_PENDING':
        return {
            ...state, fetching: true, fetched: false
        };
        case UPDATE_EDUCATION + '_FULFILLED':
        return {
            ...state, fetching: false, fetched: true, profileInfo: { ...state.profileInfo, education: action.payload.data }
        };
    case UPDATE_EDUCATION + '_REJECTED':
        return {
            ...state, fetching: false, fetched: false, error: action.payload.error
        };
    default:
        return state;
    }
};
