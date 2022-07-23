import HttpService from '@/services/httpService';
import { AdminRegFormData } from '@/types/AuthDataType';

export const ClubAdminRegistration = (payload: AdminRegFormData) => {
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
