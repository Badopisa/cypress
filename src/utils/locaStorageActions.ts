import { ACCESS_TOKEN, TOKEN_TIME } from "./constants";

export const saveAccessToken = (token: string) => {

    localStorage.setItem(ACCESS_TOKEN, token)
 
    localStorage.setItem(TOKEN_TIME, Date.now().toString());
 
 }
 
 export const retrieveAccessToken= ( ) => {
 
    return localStorage.getItem(ACCESS_TOKEN) || ''
 
}

export const clearLocalStorage = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(TOKEN_TIME)
}

 