import {updateAlertMsg, updateIsLoading} from "@/store/actions/msgAction";
import {AddPlayersToTeam} from "@/services/teamManagementService";
import {PlayerFormType, PlayerToTeamType} from "@/types/PlayerDataType";
import * as Redux from "redux";
import {CreatePlayer} from "@/services/playerManagementService";
import * as actionTypes from "@/store/actions/actionTypes";
import {fetchTeams, getTeamDetails} from "@/store/actions/teamActions";

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
                    dispatch(fetchTeams(data?.data?.club_id));
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

export const checkSelectedPlayer = (playerId: any) => {
    return {
        type: actionTypes.CHECK_SELECTED_PLAYER,
        payload: playerId
    }
}

export const addSelectedPlayersToTeam = (payload: string[], team_id: string, toast: any, onClose: any, setSeleced: any,) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true))
        const addPlayerToClubPayload = {
            players: payload.map(player => {
                return {
                    player_id: player,
                    team_id: team_id
                }
            })
        }

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
