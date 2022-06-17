import * as types from '@/store/actions/actionTypes'
import {TeamDataType} from '@/types/TeamDataType'

type TeamReducerData = {
    allPlayers: any,
    allStaffs: any,
    filteredPlayers: any,
    filteredStaffs: any,
    currentTeam: any,
    teams: TeamDataType[] | [],
    filteredData: TeamDataType[] | []
}
const initialState: TeamReducerData = {
    allPlayers: [],
    allStaffs: [],
    filteredStaffs: [],
    filteredPlayers: [],
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
        case types.GET_ALL_PLAYERS:
            return {
                ...state,
                allPlayers: action.payload.data,
                filteredPlayers: action.payload.data
            }
        case types.FILTER_PLAYERS:
            if (!action.payload) {
                return {
                    ...state,
                    filteredPlayers: state.allPlayers
                }
            }

            const filteredPlayers = state.allPlayers.filter((player: any) => {
                const fullPlayerName = `${player.first_name} ${player.last_name}`
                if (typeof (action.payload) === 'string' && (fullPlayerName.toLowerCase().includes(action.payload.toLowerCase()))) {
                    return player
                }
            })

            return {
                ...state,
                filteredPlayers
            }
        case types.GET_ALL_STAFFS:
            return {
                ...state,
                allStaffs: action.payload,
                filteredStaffs: action.payload.data
            }
        case types.FILTER_STAFFS:
            if (!action.payload) {
                return {
                    ...state,
                    filteredStaffs: state.allStaffs.data
                }
            }

            const filteredStaffs = state.allStaffs.data.filter((staff: any) => {
                const fullStaffName = `${staff.user.first_name} ${staff.user.last_name}`
                if (typeof (action.payload) === 'string' && (fullStaffName.toLowerCase().includes(action.payload.toLowerCase()))) {
                    return staff
                }
            })

            return {
                ...state,
                filteredStaffs
            }
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
