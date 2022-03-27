import HttpService from '@/services/httpService'
import { AdminRegFormData } from '@/types/AuthDataType';

export const clubAdminRegistration = (payload:AdminRegFormData) => {
  
  const http = new HttpService();

  const url = "users/signup";

  return http.postData(payload, url, false)
  
}

export const login = () => {

  const http = new HttpService();

  const url = "/users/login";

  return http.postData({}, url, false)

}