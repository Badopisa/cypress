import HttpService from '@/services/httpService';
import { AdminRegFormData, LoginFormDataType } from '@/types/AuthDataType';

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
