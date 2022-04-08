import HttpService from '@/services/httpService'

export const FetchCategories = () => {
  
  const http = new HttpService();

  const url = `categories`;

  return http.getData(url, false)
  
}