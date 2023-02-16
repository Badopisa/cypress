/* eslint-disable prettier/prettier */
import * as Redux from 'redux';
import {
    ForgotPasswordFormDataType,
    LoginFormDataType,
    ProfileFormDataType,
    RegisterAdminFormDataType,
    RegisterCoachFormDataType,
    SetNewPasswordFormDataType,
    UserDataType,
    VerifyEmailTokenFormDataType,
    VerifyTokenFormDataType
} from '@/types/AuthDataType';
import {
    AdminRegistration,
    ChangePassword,
    ClubAdminLogin,
    ForgotPassword,
    UpdateProfile,
    VerifyEmail,
    VerifyEmailToken,
    VerifyToken,
    ClubDetails,
} from '@/services/clubAdminService';
import * as actionTypes from './actionTypes';
import { updateAlertMsg, updateIsLoading } from './msgAction';
import { clearLocalStorage, saveAccessToken, storeAdminData } from '@/utils/locaStorageActions';
import { UploadImage } from '@/services/uploadService';
import Swal from 'sweetalert2';

type Dispatch = Redux.Dispatch<any>;

export const adminRegistration = (
    payload: RegisterAdminFormDataType,
    profilePicture: File,
    toast: any,
    router: any
) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        const formData = new FormData();
        formData.append('photo', profilePicture);
        UploadImage(formData)
            .then(async (result) => {
                payload.photo = result.data.data.uploadUrl;
                console.log('new payload', payload);
                AdminRegistration(payload)
                    .then(async (result) => {
                        const { data } = result;
                        console.log('admin token is', data.data);
                        window.localStorage.setItem('user', JSON.stringify(data.data.user));
                        dispatch(saveAdminData(data.data.user));
                        storeAdminData(data.data.user);

                        updateAlertMsg(toast, {
                            type: 'success',
                            message: 'Congratulations, Account successfully created'
                        });
                        Swal.fire({
                            title: 'Account created!',
                            text: 'Choose to proceed to dashboard or to select a subscription plan',
                            icon: 'success',
                            backdrop: false,
                            showDenyButton: true,
                            confirmButtonColor: '#645EFD',
                            denyButtonColor: '#131313',
                            confirmButtonText: 'Dashboard',
                            denyButtonText: 'Subscription'
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                router.push('/dashboard');
                            } else if (result.isDenied) {
                                router.push('/admin/subscription');
                            }
                        });

                        saveAccessToken(data.data.auth_token);

                        dispatch(updateIsLoading(false));
                    })

                    .catch((err) => {
                        updateAlertMsg(toast, {
                            type: 'error',
                            message: err.response.data.message
                        });

                        dispatch(updateIsLoading(false));
                    });
            })

            .catch((err) => {
                console.log('Upload error', err);
                updateAlertMsg(toast, { type: 'error', message: err.response.data.message });

                dispatch(updateIsLoading(false));
            });
    };
};

export const adminRegistrationNoPhoto = (
    payload: RegisterAdminFormDataType,
    toast: any,
    router: any
) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        AdminRegistration(payload)
            .then(async (result) => {
                const { data } = result;
                console.log('admin token is', data.data);
                window.localStorage.setItem('user', JSON.stringify(data.data.user));
                dispatch(saveAdminData(data.data.user));
                storeAdminData(data.data.user);

                updateAlertMsg(toast, {
                    type: 'success',
                    message: 'Congratulations, Account successfully created'
                });
                Swal.fire({
                    title: 'Account created!',
                    text: 'Choose to proceed to dashboard or to select a subscription plan',
                    icon: 'success',
                    backdrop: false,
                    showDenyButton: true,
                    confirmButtonColor: '#645EFD',
                    denyButtonColor: '#131313',
                    confirmButtonText: 'Dashboard',
                    denyButtonText: 'Subscription'
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        router.push('/dashboard');
                    } else if (result.isDenied) {
                        router.push('/admin/subscription');
                    }
                });

                saveAccessToken(data.data.auth_token);

                dispatch(updateIsLoading(false));
            })

            .catch((err) => {
                updateAlertMsg(toast, {
                    type: 'error',
                    message: err.response.data.message
                });

                dispatch(updateIsLoading(false));
            });
    };
};

export const coachRegistration = (payload: RegisterCoachFormDataType, toast: any, router: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        AdminRegistration(payload)
            .then(async (result) => {
                const { data } = result;
                console.log('token is', data.data);
                window.localStorage.setItem('user', JSON.stringify(data.data.user));
                dispatch(saveAdminData(data.data.user));
                storeAdminData(data.data.user);

                updateAlertMsg(toast, {
                    type: 'success',
                    message: 'Account created successfully!'
                });
                saveAccessToken(data.data.auth_token);

                dispatch(updateIsLoading(false));

                router.push('/coachAndPlayer/setNewPassword');
            })

            .catch((err) => {
                updateAlertMsg(toast, { type: 'error', message: err?.response?.data?.message });

                dispatch(updateIsLoading(false));
            });
    };
};

export const adminLogin = (
    payload: LoginFormDataType,
    toast: any,
    router: any,
    player: any = false
) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        ClubAdminLogin(payload)
            .then(async (result) => {
                const { data } = result;
                console.log('token is', data.data);
                dispatch(saveAdminData(data.data.user));
                storeAdminData(data.data.user);

                updateAlertMsg(toast, {
                    type: 'success',
                    message: 'Login Successful'
                });


                dispatch(updateIsLoading(false));

                if (player) {
                    router.push('/coachAndPlayer/setNewPassword');
                } else {
                    saveAccessToken(data.data.auth_token);
                    window.localStorage.setItem('user', JSON.stringify(data.data.user));
                    router.push('/dashboard/club-management');
                }
            })

            .catch((err) => {
                updateAlertMsg(toast, { type: 'error', message: err?.response?.data?.message });

                dispatch(updateIsLoading(false));
            });
    };
};

export const updateProfile = (payload: ProfileFormDataType, toast: any, router: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        UpdateProfile(payload)
            .then(async (result) => {
                const { data } = result;
                console.log('token is', data.data);
                window.localStorage.setItem('user', JSON.stringify(data.data.user));
                dispatch(saveAdminData(data.data.user));

                updateAlertMsg(toast, {
                    type: 'success',
                    message: 'Congratulations, Registration Successful'
                });

                saveAccessToken(data.data.auth_token);

                dispatch(updateIsLoading(false));

                Swal.fire({
                    title: 'Successful!',
                    text: 'Proceed to dashboard!',
                    icon: 'success',
                    backdrop: false,
                    confirmButtonColor: '#645EFD',
                    confirmButtonText: 'Continue',
                    willClose: () => router.push('/dashboard')
                });
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
    Swal: any,
    coach = false
) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        ChangePassword(payload, userId)
            .then(async (result) => {
                const { data } = result;
                dispatch(saveAdminData(data.data.user));

                // updateAlertMsg(toast, {
                //     type: 'success',
                //     message: 'Congratulations, Registration Successful'
                // });

                dispatch(updateIsLoading(false));

                if (coach) {
                    Swal.fire({
                        title: 'Password created!',
                        text: 'Proceed to set up your profile!',
                        icon: 'success',
                        backdrop: false,
                        confirmButtonColor: '#645EFD',
                        confirmButtonText: 'Continue',
                        willClose: () => router.push('/coachAndPlayer/profile')
                    });
                } else {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Password changed successfully!',
                        icon: 'success',
                        backdrop: false,
                        confirmButtonColor: '#645EFD',
                        confirmButtonText: 'Proceed to login',
                        willClose: () => router.push('/login')
                    });
                }
            })

            .catch((err) => {
                updateAlertMsg(toast, { type: 'error', message: err?.response?.data?.message });
                // Swal.fire(err?.response?.data?.message, 'There was a problem!', 'error');

                dispatch(updateIsLoading(false));
            });
    };
};

// Admin specific

export const verifyEmail = (payload: ForgotPasswordFormDataType, toast: any, router: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));
        dispatch(forgotPasswordEmail(payload?.email));

        VerifyEmail(payload)
            .then(async (result) => {
                const { data } = result;
                console.log('token is', data);
                updateAlertMsg(toast, {
                    type: 'success',
                    message: data?.message
                });
                dispatch(updateIsLoading(false));

                router.push('/admin/verify-code');
            })

            .catch((err) => {
                updateAlertMsg(toast, { type: 'error', message: err?.response?.data?.message });

                dispatch(updateIsLoading(false));
            });
    };
};

export const verifyEmailToken = (
    payload: VerifyEmailTokenFormDataType,
    toast: any,
    router: any,
    setPinPassed: any,
    setError: any,
    setLoading: any
) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        VerifyEmailToken(payload)
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

                router.push('/admin/registration');
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

export const getClubDetails = (club_id:string, toast: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));
        ClubDetails(club_id)
            .then(async (result) => {
            const { data } = result;
            dispatch(saveClubDetails(data.data));
                updateAlertMsg(toast, {
                    type: 'success',
                    message: data?.message
                });
                dispatch(updateIsLoading(false));
            })
            .catch((err) => {
                updateAlertMsg(toast, { type: 'error', message: err?.response?.data?.message });
                dispatch(updateIsLoading(false));
            });
        }
    }

export const logout = () => {
    clearLocalStorage();

    window.location.href = process.env.NEXT_PUBLIC_APP_BASE_URL + 'login';
};

export const saveAdminData = (data: UserDataType) => {
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
}

export const saveClubDetails = (data: any) => {
    return {
        type: actionTypes.CLUB_DETAILS,

        payload: data
    };
};


