import {retrieveAccessToken} from "@/utils/locaStorageActions";
import {verifyToken} from "@/utils/verifyToken";
import axios from "axios";

class HttpService {

    token: string | null | undefined

    baseUrl: string | undefined

    constructor() {

        this.token = retrieveAccessToken();

        this.baseUrl = process.env.NEXT_PUBLIC_API_URL;

    }

    postData = async (payload: any, url: string, secure: boolean) => {
        let AuthStr = '';

        if (secure) {

            verifyToken(this.token);

        }

        if (typeof this.token === "string") {
            AuthStr = 'Bearer '.concat(this.token);
        }

        return axios.post(this.baseUrl + url, payload, {headers: {Authorization: AuthStr}})

    };

    getData = async (url: string, secure: boolean) => {
        let AuthStr = ''

        if (secure) {

            verifyToken(this.token);

        }

        if (typeof this.token === "string") {
            AuthStr = 'Bearer '.concat(this.token);
        }

        return axios.get(this.baseUrl + url, {headers: {Authorization: AuthStr}})

    };


    putData = async (formData: any, url: string, secure: boolean) => {
        let AuthStr = '';

        if (secure) {

            verifyToken(this.token);

        }

        if (typeof this.token === "string") {
            AuthStr = 'Bearer '.concat(this.token);
        }

        return axios.put(this.baseUrl + url, formData, {headers: {Authorization: AuthStr}})

    };

    deleteData = async (url: string, secure: boolean) => {
        let AuthStr = '';

        if (secure) {

            verifyToken(this.token);

        }

        if (typeof this.token === "string") {
            AuthStr = 'Bearer '.concat(this.token);
        }

        return axios.delete(this.baseUrl + url, {headers: {Authorization: AuthStr}})

    };

}

export default HttpService;
