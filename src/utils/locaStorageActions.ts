import { ACCESS_TOKEN, TOKEN_TIME } from './constants';

export const saveAccessToken = (token: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(ACCESS_TOKEN, token);

        localStorage.setItem(TOKEN_TIME, Date.now().toString());
    }
};

export const retrieveAccessToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(ACCESS_TOKEN) || '';
    }
};

export const clearLocalStorage = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(TOKEN_TIME);
    }
};
export const getUserRole = () => {
    let role = '';
    if (typeof window !== 'undefined') {
        const user = JSON.parse(window.localStorage?.getItem('user') || '');
        role = user.role;
    }
    return role;
};
