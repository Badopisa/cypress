import { updateAlertMsg, updateIsLoading, updateMessage } from '@/store/actions/msgAction';
import * as Redux from 'redux';
import { AnalyticsDataType } from '@/types/analyticsDataType';
import { AllUserAnalytics, VideoAnalyticsDetails } from '@/services/analyticsService';
import * as actionTypes from '@/store/actions/actionTypes';
import { UploadImage, UploadLink, UploadVideo } from '@/services/uploadService';
import { createMultiplePlayers } from '@/store/actions/playerActions';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { retrieveAccessToken } from '@/utils/locaStorageActions';

type Dispatch = Redux.Dispatch<any>;

export const getAnalytics = (payload: string, toast: any) => {
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

export const getVideoAnalytics = (payload: string, toast: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));
        dispatch(saveAnalyticsId(payload));

        VideoAnalyticsDetails(payload)
            .then(async (result) => {
                const { data } = result;
                console.log('analytics details', data);
                // updateAlertMsg(toast, { type: 'success', message: 'Success' });
                dispatch(updateIsLoading(false));
                // dispatch(saveAnalytics(data.data));
                dispatch(saveAnalyticsDetails(data.data));
            })
            .catch((err) => {
                updateAlertMsg(toast, {
                    type: 'error',
                    message: err?.message || 'Something went wrong, try again'
                });

                dispatch(updateIsLoading(false));
            });
    };
};

export const uploadVideo = (
    video: File,
    toast: any
    // clubId: any,
    // setExisting: any
) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));
        dispatch(updateMessage('Uploading CSV...'));
        console.log('started up');
        const url = 'users/upload-video';

        const AuthStr = 'Bearer '.concat(retrieveAccessToken() || '');

        const formData = new FormData();
        formData.append('video', video);
        axios
            .post(process.env.NEXT_PUBLIC_API_URL + url, formData, {
                headers: { 'Authorization': AuthStr, 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent: any) => {
                    console.log('progress event', progressEvent);
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    dispatch(saveUploadProgress(percentCompleted));
                    console.log('percentCompleted', percentCompleted);
                }
            })
            // UploadVideo(formData)
            .then(async (result) => {
                console.log('result', result.data.data.uploadUrl);
                console.log('new payload', result);
                console.log('success');
                dispatch(updateIsLoading(false));
                dispatch(saveUploadUrl(result.data.data.uploadUrl));
                // updateAlertMsg(toast, { type: 'success', message: result.data.data.uploadUrl });
                // dispatch(createTeam(payload, toast, router));
                // dispatch(updateMessage('Creating players...'));
            })
            .catch((err) => {
                console.log('Upload error', err);
                updateAlertMsg(toast, { type: 'error', message: err.response.data.message });

                dispatch(updateIsLoading(false));
            });
    };
};

export const sendToKafka = (payload: any, toast: any, user_id: any, onClose: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));
        console.log('paylod vefore send', payload);

        UploadLink(payload)
            .then(async (result) => {
                const { data } = result;
                console.log('kafka', data);
                updateAlertMsg(toast, { type: 'success', message: 'Success' });
                dispatch(saveUploadUrl(''));
                dispatch(getAnalytics(user_id, toast));
                dispatch(updateIsLoading(false));
                onClose();
                // dispatch(saveAnalytics(data.data));
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

function saveUploadProgress(data: any): any {
    return {
        type: actionTypes.SAVE_UPLOAD_PROGRESS,
        payload: data
    };
}

export function saveUploadUrl(data: any): any {
    return {
        type: actionTypes.SAVE_UPLOAD_URL,
        payload: data
    };
}

function saveAnalyticsDetails(data: any): any {
    return {
        type: actionTypes.SAVE_VIDEO_ANALYTICS_DETAILS,
        payload: data
    };
}

function saveAnalyticsId(data: any): any {
    return {
        type: actionTypes.SAVE_ANALYTICS_ID,
        payload: data
    };
}
