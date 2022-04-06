import HttpService from '@/services/httpService'
import { TeamDataType } from '@/types/TeamDataType';

const data: TeamDataType[] =  [
    {
        "id": "309b5335-4a86-485f-a096-c8fc5ddbb51f",
        "name": "Under 23 Team",
        "category_id": "6ce44aff-d86f-4f78-b073-dedb0ffa7e2a",
        "location": null,
        "country": null,
        "club_id": "fed4759f-9c01-4a53-8ffb-d8af182d8aca",
    },
    {
        "id": "8ee54aab-58fd-488f-a190-b9b6e09986bc",
        "name": "Under 23 Team",
        "category_id": "6ce44aff-d86f-4f78-b073-dedb0ffa7e2a",
        "location": null,
        "country": null,
        "club_id": "fed4759f-9c01-4a53-8ffb-d8af182d8aca",
        
    },
    {
        "id": "eea7a067-fe94-40be-bd14-1008e5140320",
        "name": "Under 23 Team",
        "category_id": "6ce44aff-d86f-4f78-b073-dedb0ffa7e2a",
        "location": null,
        "country": null,
        "club_id": "fed4759f-9c01-4a53-8ffb-d8af182d8aca",
       
    },
    {
        "id": "bbf4b4f5-0729-48e3-a12f-761b3f72a67c",
        "name": "Under 23 Team",
        "category_id": "6ce44aff-d86f-4f78-b073-dedb0ffa7e2a",
        "location": null,
        "country": null,
        "club_id": "fed4759f-9c01-4a53-8ffb-d8af182d8aca",
       
    },
    {
        "id": "0cba5ba4-9f92-4dee-a1da-e785bee126d5",
        "name": "Under 16 Team",
        "category_id": "6ce44aff-d86f-4f78-b073-dedb0ffa7e2a",
        "location": null,
        "country": null,
        "club_id": "fed4759f-9c01-4a53-8ffb-d8af182d8aca",
       
    },
    {
        "id": "dff90459-bf17-4d09-9b79-a006e80f4a8c",
        "name": "Under 13 Team",
        "category_id": "6ce44aff-d86f-4f78-b073-dedb0ffa7e2a",
        "location": null,
        "country": null,
        "club_id": "fed4759f-9c01-4a53-8ffb-d8af182d8aca",
    },
    {
        "id": "d8280f82-da43-4be4-a40e-0dff68ed5616",
        "name": "Medical 13 Team",
        "category_id": "6ce44aff-d86f-4f78-b073-dedb0ffa7e2a",
        "location": null,
        "country": null,
        "club_id": "fed4759f-9c01-4a53-8ffb-d8af182d8aca",
    }
]

export const FetchTeamDetails = () => {
  
  const http = new HttpService();

  const url = "teams?club_id=";

  //return http.getData(url, true)

  return {data};
  
}