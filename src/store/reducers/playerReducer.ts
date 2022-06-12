import * as types from '@/store/actions/actionTypes'
import {PlayerReducerData} from "@/store/reducers/reducerTypes";

const initialState: PlayerReducerData = {
    newPlayer: null,
    addedPlayerToTeamInfo: []
}

type IAction = {
    type: string;
    payload?: any;
}

export const playerReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
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
        default:
            return state
    }
}
