import {ACCESS_TOKEN, ADMIN_DATA, TOKEN_TIME} from './constants';

export const saveAccessToken = (token: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(ACCESS_TOKEN, token);

        localStorage.setItem(TOKEN_TIME, Date.now().toString());
    }
};

export const storeAdminData = (token: any) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(ADMIN_DATA, JSON.stringify(token));

        localStorage.setItem(TOKEN_TIME, Date.now().toString());
    }
};

export const retrieveAdminData = () => {
    if (typeof window !== 'undefined') {
        const data: any = localStorage.getItem(ADMIN_DATA);
        return JSON.parse(data) || '';
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
