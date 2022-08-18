import { retrieveAccessToken } from '@/utils/locaStorageActions';
import { verifyToken } from '@/utils/verifyToken';
import axios from 'axios';

class HttpService {
    token: string | null | undefined;
    baseUrl: string | undefined;
    daprHost: string | undefined;
    daprHTTPPort: string | undefined;

    constructor() {
        this.token = retrieveAccessToken();

        this.baseUrl = process.env.NEXT_PUBLIC_API_URL;

        this.daprHost = process.env.NEXT_PUBLIC_DAPR_HOST;

        this.daprHTTPPort = process.env.NEXT_PUBLIC_DAPR_HTTP_PORT;
    }

    postData = async (payload: any, url: string, secure: boolean) => {
        let AuthStr = '';

        if (secure) {
            verifyToken(this.token);
        }

        if (typeof this.token === 'string') {
            AuthStr = 'Bearer '.concat(this.token);
        }
        console.log('dapr port', this.daprHost);
        console.log('url isss', this.daprHost, this.daprHTTPPort, url);

        // return axios.post(`${this.daprHost}:${this.daprHTTPPort}/${url}`, payload, {
        //     headers: { Authorization: AuthStr, 'dapr-app-id': 'sonalysis-service' } // eslint-disable-line
        // });
        return axios.post(this.baseUrl + url, payload, { headers: { Authorization: AuthStr } });
    };

    getData = async (url: string, secure: boolean) => {
        let AuthStr = '';

        if (secure) {
            verifyToken(this.token);
        }

        if (typeof this.token === 'string') {
            AuthStr = 'Bearer '.concat(this.token);
        }

        // return axios.get(`${this.daprHost}:${this.daprHTTPPort}/${url}`, {
        //     headers: { Authorization: AuthStr, 'dapr-app-id': 'sonalysis-service' } // eslint-disable-line
        // });
        return axios.get(this.baseUrl + url, { headers: { Authorization: AuthStr } });
    };

    putData = async (formData: any, url: string, secure: boolean) => {
        let AuthStr = '';

        if (secure) {
            verifyToken(this.token);
        }

        if (typeof this.token === 'string') {
            AuthStr = 'Bearer '.concat(this.token);
        }

        // return axios.put(`${this.daprHost}:${this.daprHTTPPort}/${url}`, formData, {
        //     headers: { Authorization: AuthStr, 'dapr-app-id': 'sonalysis-service' } // eslint-disable-line
        // });
        return axios.put(this.baseUrl + url, formData, { headers: { Authorization: AuthStr } });
    };

    deleteData = async (url: string, secure: boolean, formData: any) => {
        let AuthStr = '';

        if (secure) {
            verifyToken(this.token);
        }

        if (typeof this.token === 'string') {
            AuthStr = 'Bearer '.concat(this.token);
        }

        // return axios.delete(`${this.daprHost}:${this.daprHTTPPort}/${url}`, {
        //     headers: { Authorization: AuthStr, 'dapr-app-id': 'sonalysis-service' }, // eslint-disable-line
        //     data: { source: formData }
        // });
        return axios.delete(this.baseUrl + url, {
            headers: { Authorization: AuthStr },
            data: { source: formData }
        });
    };
}

export default HttpService;
