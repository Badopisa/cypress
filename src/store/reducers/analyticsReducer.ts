import * as types from '@/store/actions/actionTypes';

const initialState = {
    allVideoAnalytics: []
};

type IAction = {
    type: string;
    payload?: any;
};

export const analyticsReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case types.SAVE_VIDEO_ANALYTICS:
            return {
                ...state,
                allVideoAnalytics: action.payload
            };
        default:
            return state;
    }
};
