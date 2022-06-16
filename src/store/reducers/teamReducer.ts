import * as types from '@/store/actions/actionTypes'
import {TeamDataType} from '@/types/TeamDataType'

type TeamReducerData = {
    allPlayers: any,
    filteredPlayers: any,
    currentTeam: any,
    teams: TeamDataType[] | [],
    filteredData: TeamDataType[] | []
}
const initialState: TeamReducerData = {
    allPlayers: [],
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
            let players: any = []
            for (const team of state.teams) {
                if(team.players) {
                    players = [...players, ...team.players]
                }
            }
            console.log('players team reducer', players)
            return {
                ...state,
                allPlayers: players,
                filteredPlayers: players
            }
        case types.FILTER_PLAYERS:
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
