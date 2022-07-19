import { logout } from '@/store/actions/authActions';
import jwt_decode from 'jwt-decode';
import { TOKEN_TIME } from './constants';

export const verifyToken = (token: string | null | undefined) => {
    try {
        let expirationTime = 0;

        if (token != null) {
            const { exp, iat }: { exp: number; iat: number } = jwt_decode(token);
            const issuedTime = iat * 1000 - 60000;
            const tokenTime = Number(localStorage.getItem(TOKEN_TIME));
            const differenceInTime = issuedTime - tokenTime;
            expirationTime = exp * 1000 - 60000 - differenceInTime;
        }

        if (Date.now() >= expirationTime) {
            logout();
        }
    } catch (error) {
        logout();
    }
};
