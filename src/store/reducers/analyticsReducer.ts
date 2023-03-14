import * as types from '@/store/actions/actionTypes';

const initialState = {
    allVideoAnalytics: [],
    videoAnalyticsDetails: [],
    analyticsId: '',
    uploadUrl: '',
    uploadProgress: 0,
    teamLogos: []
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
        case types.SAVE_VIDEO_ANALYTICS_DETAILS:
            return {
                ...state,
                videoAnalyticsDetails: action.payload
            };
        case types.SAVE_ANALYTICS_ID:
            return {
                ...state,
                analyticsId: action.payload
            };
        case types.SAVE_UPLOAD_URL:
            return {
                ...state,
                uploadUrl: action.payload
            };
        case types.SAVE_TEAM_LOGOS:
            return {
                ...state,
                teamLogos: action.payload
            };
        case types.SAVE_UPLOAD_PROGRESS:
            return {
                ...state,
                uploadProgress: action.payload
            };
        default:
            return state;
    }
};
