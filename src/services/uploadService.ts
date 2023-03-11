import HttpService from '@/services/httpService';

export const UploadImage = (payload: any) => {
    const http = new HttpService();

    const url = 'users/upload-image';

    return http.postFile(payload, url, false);
};

export const UploadVideo = (payload: any) => {
    const http = new HttpService();

    const url = 'users/upload-video';

    return http.postFile(payload, url, true);
};

export const UploadLink = (payload: any) => {
    const http = new HttpService();

    const url = 'kafka/upload-link';

    return http.postData(payload, url, true);
};
