import * as Redux from 'redux';
import {
    AdminRegFormData,
    ForgotPasswordFormDataType,
    LoginFormDataType,
    SetNewPasswordFormDataType,
    UserDataType,
    VerifyTokenFormDataType
} from '@/types/AuthDataType';
import {
    ChangePassword,
    ClubAdminLogin,
    ClubAdminRegistration,
    ForgotPassword,
    VerifyToken
} from '@/services/clubAdminService';
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
                console.log('admin token is', data.data);
                // window.localStorage.setItem('user', JSON.stringify(data.data.user));
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
                console.log('token is', data.data);
                window.localStorage.setItem('user', JSON.stringify(data.data.user));
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

export const forgotPassword = (payload: ForgotPasswordFormDataType, toast: any, router: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));
        dispatch(forgotPasswordEmail(payload?.email));

        ForgotPassword(payload)
            .then(async (result) => {
                const { data } = result;
                console.log('token is', data);
                updateAlertMsg(toast, {
                    type: 'success',
                    message: data?.message
                });
                dispatch(updateIsLoading(false));

                router.push('/verify-code');
            })

            .catch((err) => {
                updateAlertMsg(toast, { type: 'error', message: err?.response?.data?.message });

                dispatch(updateIsLoading(false));
            });
    };
};

export const verifyToken = (
    payload: VerifyTokenFormDataType,
    toast: any,
    router: any,
    setPinPassed: any,
    setError: any,
    setLoading: any
) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        VerifyToken(payload)
            .then(async (result) => {
                const { data } = result;
                console.log('token is', data);
                dispatch(saveAdminData(data.data.user));
                updateAlertMsg(toast, {
                    type: 'success',
                    message: data?.message
                });
                setError('');
                setPinPassed(true);
                dispatch(updateIsLoading(false));
                setLoading(false);

                router.push('/reset-password');
            })

            .catch((err) => {
                updateAlertMsg(toast, { type: 'error', message: err?.response?.data?.message });
                setPinPassed(true);
                setError(err?.response?.data?.message);
                setLoading(false);

                dispatch(updateIsLoading(false));
            });
    };
};

export const setNewPassword = (
    payload: SetNewPasswordFormDataType,
    userId: any,
    toast: any,
    router: any,
    Swal: any
) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        ChangePassword(payload, userId)
            .then(async (result) => {
                const { data } = result;
                dispatch(saveAdminData(data.data.user));

                // updateAlertMsg(toast, {
                //     type: 'success',
                //     message: 'Congratulations, Login Successful'
                // });

                dispatch(updateIsLoading(false));

                Swal.fire({
                    title: 'Success!',
                    text: 'Password changed successfully!',
                    icon: 'success',
                    backdrop: false,
                    confirmButtonColor: '#645EFD',
                    confirmButtonText: 'Proceed to Login',
                    willClose: () => router.push('/login')
                });
            })

            .catch((err) => {
                updateAlertMsg(toast, { type: 'error', message: err?.response?.data?.message });
                // Swal.fire(err?.response?.data?.message, 'There was a problem!', 'error');

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

const forgotPasswordEmail = (data: string) => {
    return {
        type: actionTypes.FORGOT_PASSWORD_EMAIL,

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
