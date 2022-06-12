import HttpService from '@/services/httpService'
import {PlayerFormType} from "@/types/PlayerDataType";

export const CreatePlayer = (payload: PlayerFormType) => {

    const http = new HttpService();

    const url = `players`;

    return http.postData(payload, url, true)

}

export const GetPlayersByAttribute = () => {

    const http = new HttpService();

    const url = `players`;

    return http.getData(url, true)

}

export const FetchPlayerDetails = (id: string) => {

    const http = new HttpService();

    const url = `players/${id}`;

    return http.getData(url, true)

}

export const UpdatePlayer = (payload: PlayerFormType) => {

    const http = new HttpService();

    const url = `players/${payload.id}`;

    return http.putData(payload, url, true)

}
