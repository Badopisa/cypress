/* eslint-disable prettier/prettier */
import HttpService from '@/services/httpService';
import { AdminRegFormData } from '@/types/AuthDataType';

export const AdminRegistration = (payload: AdminRegFormData) => {
    const http = new HttpService();

    const url = 'users/signup';

    return http.postData(payload, url, false);
};

export const ClubAdminLogin = (payload: any) => {
    const http = new HttpService();

    const url = 'users/login';

    return http.postData(payload, url, false);
};
export const UpdateProfile = (payload: any) => {
    const http = new HttpService();

    const url = `users/${payload.id}`;

    return http.putData(payload, url, true);
};

export const ForgotPassword = (payload: any) => {
    const http = new HttpService();

    const url = `users/password-reset-request`;

    return http.postData(payload, url, false);
};

export const EmailVerification = (payload: any) => {
    const http = new HttpService();

    const url = `users/email-verification`;

    return http.postData(payload, url, false);
};

export const VerifyToken = (payload: any) => {
    const http = new HttpService();

    const url = `users/verify-token`;

    return http.postData(payload, url, false);
};

export const ChangePassword = (payload: any, userId: string) => {
    const http = new HttpService();

    const url = `users/change-password/${userId}`;

    return http.postData(payload, url, false);
};

export const VerifyEmail = (payload: any) => {
    const http = new HttpService();

    const url = `users/send-otp`;

    return http.postData(payload, url, false);
};

export const EmailExist = (payload: any) => {
    const http = new HttpService();

    const url = `users/email-exist`;

    return http.postData(payload, url, false);
};

export const VerifyEmailToken = (payload: any) => {
    const http = new HttpService();

    const url = `users/verify-send/otp`;

    return http.postData(payload, url, false);
};

export const ClubDetails = (club_id: any) => {
    const http = new HttpService();

    const url = `clubs/${club_id}`;

    return http.getData(url, true);
}
