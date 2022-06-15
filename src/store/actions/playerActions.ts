import {updateAlertMsg, updateIsLoading} from "@/store/actions/msgAction";
import {AddPlayersToTeam} from "@/services/teamManagementService";
import {PlayerFormType} from "@/types/PlayerDataType";
import * as Redux from "redux";
import {CreatePlayer} from "@/services/playerManagementService";
import * as actionTypes from "@/store/actions/actionTypes";
import {getTeamDetails} from "@/store/actions/teamActions";

type Dispatch = Redux.Dispatch<any>;

export const createAndAddPlayerToTeam = (payload: PlayerFormType, teamId: string, toast: any, onClose: any, setSeleced: any,) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true))

        CreatePlayer(payload)
            .then((result) => {
                const {data} = result
                console.log('result', data)
                const addPlayerToClubPayload = {
                    players: [{
                        player_id: data?.data?.id,
                        team_id: teamId
                    }]
                }

                dispatch(saveNewPlayerData(data?.data))

                updateAlertMsg(toast, {type: "success", message: "Congratulations, Player successfully created"})

                console.log('addPlayerToClubPayload', addPlayerToClubPayload)
                AddPlayersToTeam(addPlayerToClubPayload).then(newResult => {
                    dispatch(addPlayerToTeam(newResult?.data))
                    updateAlertMsg(toast, {
                        type: "success",
                        message: "Congratulations, Player successfully added to team"
                    })
                    console.log('newResult', newResult)
                    dispatch(getTeamDetails(newResult?.data?.data[0]?.team_id, toast))
                    onClose(false)
                    setSeleced(true)
                    dispatch(updateIsLoading(false))
                }).catch(err => {
                    console.log('add player to team error', err)
                    handleError(err, toast, dispatch);
                })
            })
            .catch((err) => {
                handleError(err, toast, dispatch);
            });

    };
}

// export const getAllPlayers = (teams: any) => {
//     // let players: any = []
//     // for (const team of teams) {
//     //     console.log('started')
//     //     players = [...players, ...team.players]
//     //     console.log('players', players)
//     // }
//     // for (let i = 0; i < teams.length; i++) {
//     //     console.log('started')
//     //     players = [...players, ...teams[i].players]
//     //     console.log('players', players)
//     // }
//     const players = teams.map((team: any) => {
//         team.players
//     })
//     console.log('teams', teams)
//     console.log('players', players)
//     return {
//         type: actionTypes.GET_ALL_PLAYERS,
//         payload: players
//     }
// }

export const checkSelectedPlayer = (playerId: any) => {
    return {
        type: actionTypes.CHECK_SELECTED_PLAYER,
        payload: playerId
    }
}


const handleError = (err: any, toast: any, dispatch: Dispatch) => {
    updateAlertMsg(toast, {type: "error", message: err?.response?.data?.message})
    dispatch(updateIsLoading(false))
}

function saveNewPlayerData(data: any): any {
    return {
        type: actionTypes.SAVE_NEW_PLAYER,
        payload: data
    }
}

function addPlayerToTeam(data: any): any {
    return {
        type: actionTypes.ADD_PLAYER_TO_TEAM,
        payload: data
    }
}
