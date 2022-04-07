import HttpService from '@/services/httpService'
import { TeamFormType } from '@/types/TeamDataType';

export const FetchTeamDetails = (clubId: string) => {
  
  const http = new HttpService();

  const url = `teams?club_id=${clubId}`;

  return http.getData(url, true)
  
}

export const CreateTeam = (payload: TeamFormType) => {
  
  const http = new HttpService();

  const url = `teams`;

  return http.postData(payload, url, true)
  
}