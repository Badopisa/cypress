import { updateAlertMsg, updateIsLoading, updateMessage } from '@/store/actions/msgAction';
import { AddPlayersToTeam, RemovePlayerFromTeam } from '@/services/teamManagementService';
import { PlayerFormType } from '@/types/PlayerDataType';
import * as Redux from 'redux';
import {
    CreateMultiplePlayers,
    CreatePlayer,
    FetchPlayerDetails,
    UpdatePlayer
} from '@/services/playerManagementService';
import * as actionTypes from '@/store/actions/actionTypes';
import { createTeam, fetchTeams, getAllPlayers, getTeamDetails } from '@/store/actions/teamActions';
import { TeamFormType } from '@/types/TeamDataType';
import { UploadImage } from '@/services/uploadService';

type Dispatch = Redux.Dispatch<any>;

export const uploadPictureAndCreateAndAddPlayerToTeam = (
    payload: PlayerFormType,
    profilePicture: any,
    teamId: string,
    toast: any,
    onClose: any,
    setSelected: any
) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        if (!profilePicture)
            return dispatch(createAndAddPlayerToTeam(payload, teamId, toast, onClose, setSelected));

        const formData = new FormData();
        formData.append('photo', profilePicture);
        UploadImage(formData)
            .then(async (result) => {
                payload.photo = result.data.data.uploadUrl;
                console.log('new payload', payload);
                dispatch(createAndAddPlayerToTeam(payload, teamId, toast, onClose, setSelected));
            })
            .catch((err) => {
                console.log('Upload error', err);
                updateAlertMsg(toast, { type: 'error', message: 'Upload error' });

                dispatch(updateIsLoading(false));
            });
    };
};
export const createAndAddPlayerToTeam = (
    payload: PlayerFormType,
    teamId: string,
    toast: any,
    onClose: any,
    setSelected: any
) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        CreatePlayer(payload)
            .then((result) => {
                const { data } = result;
                console.log('result', data);
                const addPlayerToClubPayload = {
                    players: [
                        {
                            player_id: data?.data?.id,
                            team_id: teamId
                        }
                    ]
                };

                dispatch(saveNewPlayerData(data?.data));

                updateAlertMsg(toast, {
                    type: 'success',
                    message: 'Congratulations, Player successfully created'
                });

                console.log('addPlayerToClubPayload', addPlayerToClubPayload);
                AddPlayersToTeam(addPlayerToClubPayload)
                    .then((newResult) => {
                        dispatch(addPlayerToTeam(newResult?.data));
                        updateAlertMsg(toast, {
                            type: 'success',
                            message: 'Congratulations, Player successfully added to team'
                        });
                        console.log('newResult', newResult);
                        dispatch(getTeamDetails(newResult?.data?.data[0]?.team_id, toast));
                        dispatch(fetchTeams(data?.data?.club_id));
                        onClose(false);
                        setSelected(true);
                        dispatch(updateIsLoading(false));
                    })
                    .catch((err) => {
                        console.log('add player to team error', err);
                        handleError(err, toast, dispatch);
                    });
            })
            .catch((err) => {
                handleError(err, toast, dispatch);
            });
    };
};

export const getPlayerDetails = (player_id: string, router: any, toast: any) => {
    return async (dispatch: Dispatch) => {
        FetchPlayerDetails(player_id)
            .then((result) => {
                const { data } = result;
                console.log('gotten player', data);
                dispatch(saveNewPlayerData(data?.data.player));
                dispatch(updateIsLoading(false));
                router.push('/dashboard/club-management/PlayerDetails');
            })
            .catch((err) => {
                handleError(err, toast, dispatch);
                dispatch(updateIsLoading(false));
            });
    };
};

export const uploadPictureAndUpdatePlayer = (
    payload: PlayerFormType,
    profilePicture: null | string | File,
    team_id: string,
    toast: any,
    onClose: any,
    setSelected: any
) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        if (!profilePicture)
            return dispatch(updatePlayer(payload, team_id, toast, onClose, setSelected));

        if (typeof profilePicture === 'string')
            return dispatch(updatePlayer(payload, team_id, toast, onClose, setSelected));

        const formData = new FormData();
        formData.append('photo', profilePicture);
        UploadImage(formData)
            .then(async (result) => {
                payload.photo = result.data.data.uploadUrl;
                console.log('new payload', payload);
                dispatch(updatePlayer(payload, team_id, toast, onClose, setSelected));
            })
            .catch((err) => {
                console.log('Upload error', err);
                updateAlertMsg(toast, { type: 'error', message: 'Upload error' });

                dispatch(updateIsLoading(false));
            });
    };
};
export const updatePlayer = (
    payload: PlayerFormType,
    team_id: string,
    toast: any,
    onClose: any,
    setSeleced: any
) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));
        UpdatePlayer(payload)
            .then((result) => {
                const { data } = result;
                console.log('result', data);
                dispatch(saveNewPlayerData(data?.data));
                updateAlertMsg(toast, {
                    type: 'success',
                    message: 'Congratulations, Player successfully updated'
                });
                dispatch(updateIsLoading(false));
                dispatch(getTeamDetails(team_id, toast));
                dispatch(fetchTeams(data?.data?.club_id));
                onClose(false);
                setSeleced(true);
            })
            .catch((err) => {
                handleError(err, toast, dispatch);
                dispatch(updateIsLoading(false));
            });
    };
};

export const removePlayerFromTeam = (
    player_id: string,
    team_id: string,
    club_id: any,
    toast: any,
    onClose: any
) => {
    return async (dispatch: Dispatch) => {
        const removePlayerFromClubPayload = {
            players: [
                {
                    player_id,
                    team_id
                }
            ]
        };
        RemovePlayerFromTeam(removePlayerFromClubPayload)
            .then((newResult) => {
                dispatch(addPlayerToTeam(newResult?.data));
                updateAlertMsg(toast, {
                    type: 'success',
                    message: 'Player successfully removed from team'
                });
                console.log('newResult', newResult);
                dispatch(getTeamDetails(team_id, toast));
                dispatch(fetchTeams(club_id));
                onClose(false);
                // setSeleced(true)
                dispatch(updateIsLoading(false));
            })
            .catch((err) => {
                console.log('add player to team error', err);
                handleError(err, toast, dispatch);
            });
    };
};
export const createMultiplePlayers = (
    url: string,
    user_type: string,
    club_id: any,
    toast: any,
    setSelected: any
) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));
        const payload = {
            url,
            user_type,
            club_id
        };
        console.log('dispatched csv', payload);

        CreateMultiplePlayers(payload)
            .then((result) => {
                const switchToExistingModal = () => {
                    updateAlertMsg(toast, {
                        type: 'success',
                        message: 'Congratulations, Players successfully created'
                    });
                    dispatch(updateMessage('Fetching players...'));
                    dispatch(getAllPlayers(club_id));
                    setSelected(true);
                    console.log('CSV result', result);
                    dispatch(updateIsLoading(false));
                };
                setTimeout(switchToExistingModal, 3000);
                // setSeleced(true)
            })
            .catch((err) => {
                updateAlertMsg(toast, {
                    type: 'error',
                    message: 'Oops! a problem has occurred'
                });
                handleError(err, toast, dispatch);
                dispatch(updateIsLoading(false));
            });
    };
};

export const checkSelectedPlayer = (playerId: any) => {
    return {
        type: actionTypes.CHECK_SELECTED_PLAYER,
        payload: playerId
    };
};

export const addSelectedPlayersToTeam = (
    payload: string[],
    team_id: string,
    club_id: string,
    toast: any,
    onClose: any,
    setSeleced: any
) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));
        const addPlayerToClubPayload = {
            players: payload.map((player) => {
                return {
                    player_id: player,
                    team_id: team_id
                };
            })
        };

        console.log('addPlayerToClubPayload', addPlayerToClubPayload);
        AddPlayersToTeam(addPlayerToClubPayload)
            .then((newResult) => {
                dispatch(addPlayerToTeam(newResult?.data));
                updateAlertMsg(toast, {
                    type: 'success',
                    message: 'Congratulations, Player successfully added to team'
                });
                console.log('newResult', newResult);
                dispatch(getTeamDetails(newResult?.data?.data[0]?.team_id, toast));
                dispatch(fetchTeams(club_id));
                onClose(false);
                setSeleced(true);
                dispatch(updateIsLoading(false));
            })
            .catch((err) => {
                console.log('add player to team error', err);
                handleError(err, toast, dispatch);
                dispatch(updateIsLoading(false));
            });
    };
};

const handleError = (err: any, toast: any, dispatch: Dispatch) => {
    updateAlertMsg(toast, {
        type: 'error',
        message: err?.response?.data?.message || 'Something went wrong, try again!'
    });
    dispatch(updateIsLoading(false));
};

export function saveNewPlayerData(data: any): any {
    return {
        type: actionTypes.SAVE_NEW_PLAYER,
        payload: data
    };
}

function addPlayerToTeam(data: any): any {
    return {
        type: actionTypes.ADD_PLAYER_TO_TEAM,
        payload: data
    };
}
