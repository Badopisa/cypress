import HttpService from '@/services/httpService';
import { StaffFormType } from '@/types/StaffDataType';

export const CreateStaff = (payload: StaffFormType) => {
    const http = new HttpService();

    const url = `staffs`;

    return http.postData(payload, url, true);
};

export const GetStaffForAClub = (id: string) => {
    const http = new HttpService();

    const url = `staffs?club_id=${id}`;

    return http.getData(url, true);
};

export const GetStaffDetails = (id: string) => {
    const http = new HttpService();

    const url = `staffs/${id}`;

    return http.getData(url, true);
};

export const UpdateStaff = (payload: StaffFormType) => {
    const http = new HttpService();

    const url = `users/${payload.id}`;

    return http.putData(payload, url, true);
};
