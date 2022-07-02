import * as types from '@/store/actions/actionTypes';
import { MsgDataType } from '@/types/MsgDataType';

const initialState = {
    msg: null,
    isLoading: false
};

type IAction = {
    type: string;
    payload?: MsgDataType | null | boolean;
};

export const msgReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case types.SAVE_USER_DETAILS:
            return {
                ...state,
                user: action.payload
            };
        case types.UPDATE_LOADING_STATE:
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
};
