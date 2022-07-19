import * as Redux from 'redux';
import { AdminRegFormData, LoginFormDataType, UserDataType } from '@/types/AuthDataType';
import { ClubAdminLogin, ClubAdminRegistration } from '@/services/clubAdminService';
import * as actionTypes from './actionTypes';
import { updateAlertMsg, updateIsLoading } from './msgAction';
import { clearLocalStorage, saveAccessToken } from '@/utils/locaStorageActions';

type Dispatch = Redux.Dispatch<any>;

export const adminRegistration = (payload: AdminRegFormData, toast: any, router: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        ClubAdminRegistration(payload)
            .then(async (result) => {
                const { data } = result;

                dispatch(saveAdminData(data.data.user));

                updateAlertMsg(toast, {
                    type: 'success',
                    message: 'Congratulations, Account successfully created'
                });

                saveAccessToken(data.data.auth_token);

                dispatch(updateIsLoading(false));

                router.push('/admin/subscription');
            })

            .catch((err) => {
                updateAlertMsg(toast, { type: 'error', message: err.response.data.message });

                dispatch(updateIsLoading(false));
            });
    };
};

export const adminLogin = (payload: LoginFormDataType, toast: any, router: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        ClubAdminLogin(payload)
            .then(async (result) => {
                const { data } = result;

                dispatch(saveAdminData(data.data.user));

                updateAlertMsg(toast, {
                    type: 'success',
                    message: 'Congratulations, Login Successful'
                });

                saveAccessToken(data.data.auth_token);

                dispatch(updateIsLoading(false));

                router.push('/dashboard/club-management');
            })

            .catch((err) => {
                updateAlertMsg(toast, { type: 'error', message: err?.response?.data?.message });

                dispatch(updateIsLoading(false));
            });
    };
};

export const logout = () => {
    clearLocalStorage();

    window.location.href = process.env.NEXT_PUBLIC_APP_BASE_URL + 'login';
};

const saveAdminData = (data: UserDataType) => {
    return {
        type: actionTypes.SAVE_USER_DETAILS,

        payload: data
    };
};

export const updateImageFile = (data: any) => {
    return {
        type: actionTypes.UPDATE_FILE,

        payload: data
    };
};
export const updateFileName = (data: string) => {
    return {
        type: actionTypes.UPDATE_FILE_NAME,

        payload: data
    };
};
