import * as types from '@/store/actions/actionTypes'
import { TeamDataType } from '@/types/TeamDataType'

type TeamReducerData = {
    teams: TeamDataType[] | [],
    filteredData: TeamDataType[] | []
}
const initialState: TeamReducerData  = {
  teams: [],
  filteredData: []
}

type IAction =  {
  type: string;
  payload?: TeamDataType[]|null|string;
}

export const teamReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case types.SAVE_TEAM_DETAILS:
      return {
        ...state,
        teams: action.payload,
        filteredData: action.payload
    }
    case types.FILTER_TEAM_DETAILS:
        if(!action.payload) {
            return {
                ...state,
                filteredData: state.teams
            }
        }
        
        const filteredData = state.teams.filter(team => {
            if( typeof(action.payload) ==='string' && (team.name.toLowerCase().includes(action.payload.toLowerCase()))){
                return team
            }
        })

        return {
            ...state,
            filteredData
        }
    default: return state
  }
}