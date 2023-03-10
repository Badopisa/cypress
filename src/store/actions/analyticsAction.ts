import { updateAlertMsg, updateIsLoading } from '@/store/actions/msgAction';
import * as Redux from 'redux';
import { AnalyticsDataType } from '@/types/analyticsDataType';
import { AllUserAnalytics } from '@/services/analyticsService';
import * as actionTypes from '@/store/actions/actionTypes';

type Dispatch = Redux.Dispatch<any>;

export const getAnalytics = (payload: AnalyticsDataType, toast: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        AllUserAnalytics(payload)
            .then(async (result) => {
                const { data } = result;
                console.log('result', data);
                // updateAlertMsg(toast, { type: 'success', message: 'Success' });
                dispatch(updateIsLoading(false));
                dispatch(saveAnalytics(data.data));
            })
            .catch((err) => {
                console.log('Upload error', err);
                updateAlertMsg(toast, {
                    type: 'error',
                    message: err?.message || 'Something went wrong, try again'
                });

                dispatch(updateIsLoading(false));
            });
    };
};

function saveAnalytics(data: any): any {
    return {
        type: actionTypes.SAVE_VIDEO_ANALYTICS,
        payload: data
    };
}
