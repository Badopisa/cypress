import HttpService from '@/services/httpService';

export const UploadImage = (payload: any) => {
    const http = new HttpService();

    const url = 'users/upload-image';

    return http.postFile(payload, url, false);
};
