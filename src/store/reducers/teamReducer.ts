import * as types from '@/store/actions/actionTypes'
import {TeamDataType} from '@/types/TeamDataType'

type TeamReducerData = {
    currentTeam: any,
    teams: TeamDataType[] | [],
    filteredData: TeamDataType[] | []
}
const initialState: TeamReducerData = {
    currentTeam: null,
    teams: [],
    filteredData: []
}

type IAction = {
    type: string;
    payload?: any;
}

export const teamReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case types.SET_CURRENT_TEAM:
            return {
                ...state,
                currentTeam: action.payload
            }
        case types.SAVE_TEAM_DETAILS:
            return {
                ...state,
                teams: action.payload,
                filteredData: action.payload
            }
        case types.SAVE_NEW_TEAM:
            if (action.payload) {
                const updatedTeam = [...state.teams, action.payload]
                return {
                    ...state,
                    teams: updatedTeam,
                    filteredData: updatedTeam
                }
            }
            return state
        case types.FILTER_TEAM_DETAILS:
            if (!action.payload) {
                return {
                    ...state,
                    filteredData: state.teams
                }
            }

            const filteredData = state.teams.filter(team => {
                if (typeof (action.payload) === 'string' && (team.name.toLowerCase().includes(action.payload.toLowerCase()))) {
                    return team
                }
            })

            return {
                ...state,
                filteredData,
            }
        default:
            return state
    }
}
