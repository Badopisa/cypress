import * as types from '@/store/actions/actionTypes';
import { UserDataType } from '@/types/AuthDataType';

const initialState = {
    user: null,
    file: null,
    fileName: null,
    forgotPasswordEmail: null,
    oldPassword: null,
    clubDetails: null
};

type IAction = {
    type: string;
    payload?: UserDataType;
};

export const authReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case types.SAVE_USER_DETAILS:
            return {
                ...state,
                user: action.payload
            };
        case types.OLD_PASSWORD:
            return {
                ...state,
                oldPassword: action.payload
            };
        case types.FORGOT_PASSWORD_EMAIL:
            return {
                ...state,
                forgotPasswordEmail: action.payload
            };
        case types.UPDATE_FILE:
            return {
                ...state,
                file: action.payload
            };
        case types.UPDATE_FILE_NAME:
            return {
                ...state,
                fileName: action.payload
            };
        case types.CLUB_DETAILS:
            return {
                ...state,
                clubDetails: action.payload
            };
        default:
            return state;
    }
};
