export const getUserInfo = () => {
    let webStorage = localStorage;
    if ('token' in sessionStorage) webStorage = sessionStorage;
    return {token: webStorage.getItem('token')};
};

export const clearUserInfo = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
};

export const setUserInfo = (token, isSessionStorage = false) => {
    clearUserInfo();
    const webStorage = isSessionStorage ? sessionStorage : localStorage;
    webStorage.setItem('token', token);
};

export const isLoggedIn = () => ('token' in localStorage || 'token' in sessionStorage);
