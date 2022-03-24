import jwt_decode from 'jwt-decode';
import { TOKEN_TIME } from './constants';

export const verifyToken = (token:string) => {

    try {
      
      const { exp, iat }: {exp: number, iat: number} = jwt_decode(token);

      const issuedTime = iat * 1000 - 60000;

      const tokenTime = Number(localStorage.getItem(TOKEN_TIME));

      const differenceInTime = issuedTime - tokenTime;

      const expirationTime = exp * 1000 - 60000 - differenceInTime;
  
      if (Date.now() >= expirationTime) {

        window.location.href = process.env.appBaseUrl + '/logout';

      }

    } catch (error) {

      window.location.href = process.env.appBaseUrl + '/logout';

    }

    return;
};