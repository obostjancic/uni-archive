import request from '../request';

export const FETCH_PERSONAL_INFO = 'FETCH_PERSONAL_INFO';
export const FETCH_PREVIOUS_JOBS = 'FETCH_PREVIOUS_JOBS';
export const FETCH_INSTITUTIONS = 'FETCH_INSTITUTIONS';
export const UPDATE_PERSONAL_INFO = 'UPDATE_PERSONAL_INFO';
export const UPDATE_EDUCATION = 'UPDATE_EDUCATION';

export const fetchPersonalInfo = () => (dispatch) => (dispatch({
    type: FETCH_PERSONAL_INFO,
    payload: request.get('/persons/me/')
}));

export const fetchPreviousJobs = () => (dispatch) => (dispatch({
    type: FETCH_PREVIOUS_JOBS,
    payload: request.get('/persons/previous-jobs/')
}));

export const fetchInstitutions = () => (dispatch) => (dispatch({
    type: FETCH_INSTITUTIONS,
    payload: request.get('/institutions/')
}));

export const updatePersonalInfo = (personalInfo) => (dispatch) => (dispatch({
    type: UPDATE_PERSONAL_INFO,
    payload: request.put('/persons/', personalInfo)
}));

export const updateEducation = (education) => (dispatch) => (dispatch({
    type: UPDATE_EDUCATION,
    payload: request.put('/persons/education/', education)
}));

