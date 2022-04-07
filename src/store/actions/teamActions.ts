import { CreateTeam, FetchTeamDetails } from '@/services/teamManagementService';
import { TeamDataType, TeamFormType } from '@/types/TeamDataType';
import * as Redux from 'redux';
import * as actionTypes from "./actionTypes"
import { updateAlertMsg, updateIsLoading } from './msgAction';


type Dispatch = Redux.Dispatch<any>;

export const fetchTeams = (clubId: string) => {

    return async (dispatch:Dispatch) => {

      dispatch(updateIsLoading(true))

      FetchTeamDetails(clubId)

        .then(async (result) => {

            const {data} = result

            dispatch(saveTeamData(data.data))

            dispatch(updateIsLoading(false))
          
        })
        
        .catch((err) => {

            dispatch(updateIsLoading(false))

        });

    };

}

export const createTeam = (payload:TeamFormType, toast: any, router: any) => {

    return async (dispatch:Dispatch) => {

        dispatch(updateIsLoading(true))
  
        CreateTeam(payload)
  
          .then( (result) => {
  
              const {data} = result
  
              dispatch(saveNewTeamData(data.data))
  
              updateAlertMsg(toast, {type: "success", message:"Congratulations, Team successfully created"})
    
              dispatch(updateIsLoading(false))
  
              router.push('/dashboard/club-management/add-team')
            
          })
          
          .catch((err) => {
  
              updateAlertMsg(toast, {type: "error", message: err.response.data.message})
  
              dispatch(updateIsLoading(false))
  
          });
  
      };
}

export const filterTeam = (text: string) => {

    return async (dispatch:Dispatch) => {

        dispatch(updateIsLoading(true))

        dispatch(filterTeamData(text))

        dispatch(updateIsLoading(false))
          
    };

}

const saveTeamData = (data: TeamDataType[]|null) => {

    return {
  
        type: actionTypes.SAVE_TEAM_DETAILS,
   
        payload: data
   
    }
}

const filterTeamData = (data: string) => {

    return {
  
        type: actionTypes.FILTER_TEAM_DETAILS,
   
        payload: data
   
    }

}

const saveNewTeamData = (data: TeamDataType) => {

    return {
  
        type: actionTypes.SAVE_NEW_TEAM,
   
        payload: data
   
    }
}
