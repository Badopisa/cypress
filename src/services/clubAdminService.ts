import HttpService from '@/services/httpService'
import { AdminRegFormData, LoginFormDataType } from '@/types/AuthDataType';

const data = {
  data: {
    data: {
      user: {
        email: "Johnson@email.com",
        id: "2",
        role: "coach",
        phone_verified: 1,
        first_name: "Tolani",
        is_active: 1,
        last_name: "Johnson",
        clubs: [{
          id: "23233",
          name: "Folake J",
          slug: "23948484",
          owner_id: "2",
          logo: null,
          location: null
        }]
      },
      auth_token: "hhdhduenwhsjs-jsjsjunhdd"
    }
  }
}

export const ClubAdminRegistration = (payload:AdminRegFormData) => {
  
  const http = new HttpService();

  const url = "users/signup";

  return data

  //return http.postData(payload, url, false)
  
}

export const ClubAdminLogin = (payload: LoginFormDataType) => {

  const http = new HttpService();

  const url = "users/login";

  return data

  //return http.postData(payload, url, false)

}