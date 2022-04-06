import { FetchTeamDetails } from '@/services/teamManagementService';
import { TeamDataType } from '@/types/TeamDataType';
import * as Redux from 'redux';
import * as actionTypes from "./actionTypes"
import { updateAlertMsg, updateIsLoading } from './msgAction';


type Dispatch = Redux.Dispatch<any>;

export const fetchTeams = () => {

    return async (dispatch:Dispatch) => {

      dispatch(updateIsLoading(true))

      const result = FetchTeamDetails()

        //.then(async (result) => {

            const {data} = result

            dispatch(saveTeamData(data))

            dispatch(updateIsLoading(false))
          
        // })
        
        // .catch((err) => {

        //     updateAlertMsg(toast, {type: "error", message: err.response.data.message})

        //     dispatch(updateIsLoading(false))

        // });

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
