import axios from 'axios';

const getToken = () => localStorage.getItem('token') || sessionStorage.getItem('token');

const getDefaultOptions = () => {
    const token = getToken();
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    };
};

const client = (token = null) => {
    let defaultOptions = {
        headers: {
            Authorization: token ? `Token ${token}` : '',
        },
    };
    return {
        get: (url, options = {}) => {
            defaultOptions = getDefaultOptions();
            return axios.get(url, {...defaultOptions, ...options});
        },
        post: (url, data, options = {}) => {
            defaultOptions = getDefaultOptions();
            return axios.post(url, data, {...defaultOptions, ...options});
        },
        put: (url, data, options = {}) => {
            defaultOptions = getDefaultOptions();
            return axios.put(url, data, {...defaultOptions, ...options});
        },
        delete: (url, options = {}) => {
            defaultOptions = getDefaultOptions();
            return axios.delete(url, {...defaultOptions, ...options});
        },
    };
};

const request = client(getToken());

export default request;

