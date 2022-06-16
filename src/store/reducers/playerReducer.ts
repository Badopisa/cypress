import * as types from '@/store/actions/actionTypes'
import {PlayerReducerData} from "@/store/reducers/reducerTypes";

const initialState: PlayerReducerData = {
    newPlayer: null,
    addedPlayerToTeamInfo: [],
    selectedPlayers: [],
    allPlayers: [],
}

type IAction = {
    type: string;
    payload?: any;
}

export const playerReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case types.GET_ALL_PLAYERS:
            return {
                ...state,
                allPlayers: action.payload
            }
        case types.SAVE_NEW_PLAYER:
            return {
                ...state,
                newPlayer: action.payload
            }
        case types.ADD_PLAYER_TO_TEAM:
            return {
                ...state,
                addedPlayerToTeamInfo: action.payload
            }
        case types.CHECK_SELECTED_PLAYER:
            if (state.selectedPlayers.includes(action.payload)) {
                return {
                    ...state,
                    selectedPlayers: state.selectedPlayers.filter((player: any) => player !== action.payload)
                }
            } else {
                return {
                    ...state,
                    selectedPlayers: [...state.selectedPlayers, action.payload]
                }
            }
        default:
            return state
    }
}
