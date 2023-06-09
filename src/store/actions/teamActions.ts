import { CreateTeam, FetchTeamDetails, GetTeamDetails } from '@/services/teamManagementService';
import { TeamDataType, TeamFormType } from '@/types/TeamDataType';
import * as Redux from 'redux';
import * as actionTypes from './actionTypes';
import {updateAlertMsg, updateIsLoading, updateMessage} from './msgAction';
import { GetPlayersForClub } from '@/services/playerManagementService';
import { UploadImage } from '@/services/uploadService';
import { createMultiplePlayers } from '@/store/actions/playerActions';

type Dispatch = Redux.Dispatch<any>;

export const fetchTeams = (clubId: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));
        console.log('idddd', clubId);

        FetchTeamDetails(clubId)
            .then(async (result) => {
                const { data } = result;
                console.log('fetchTeams', result);
                console.log('Dapr ran too');

                dispatch(saveTeamData(data.data));
                dispatch(filterTeam(''));

                dispatch(updateIsLoading(false));
            })

            .catch((err) => {
                console.log('fetch teams error', err);
                dispatch(updateIsLoading(false));
            });
    };
};
export const uploadFileAndCreateMultiplePlayers = (
    profilePicture: File,
    toast: any,
    clubId: any,
    setExisting: any
) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));
        dispatch(updateMessage('Uploading CSV...'));

        const formData = new FormData();
        formData.append('photo', profilePicture);
        UploadImage(formData)
            .then(async (result) => {
                console.log('result', result.data.data.uploadUrl);
                console.log('new payload', result);
                // updateAlertMsg(toast, { type: 'success', message: result.data.data.uploadUrl });
                // dispatch(createTeam(payload, toast, router));
                dispatch(updateMessage('Creating players...'));
                dispatch(
                    createMultiplePlayers(
                        'https://sonalysis-asset.s3.amazonaws.com/players-sol (1).csv',
                        // result.data.data.uploadUrl,
                        'PLAYER',
                        clubId,
                        toast,
                        setExisting
                    )
                );
            })
            .catch((err) => {
                console.log('Upload error', err);
                updateAlertMsg(toast, { type: 'error', message: err.response.data.message });

                dispatch(updateIsLoading(false));
            });
    };
};

export const uploadPictureAndCreateTeam = (
    payload: TeamFormType,
    profilePicture: File | null,
    toast: any,
    router: any
) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        if (!profilePicture) return dispatch(createTeam(payload, toast, router));

        const formData = new FormData();
        formData.append('photo', profilePicture);
        UploadImage(formData)
            .then(async (result) => {
                payload.photo = result.data.data.uploadUrl;
                console.log('new payload', payload);
                dispatch(createTeam(payload, toast, router));
            })
            .catch((err) => {
                console.log('Upload error', err);
                updateAlertMsg(toast, { type: 'error', message: err.response.data.message });

                dispatch(updateIsLoading(false));
            });
    };
};

export const createTeam = (payload: TeamFormType, toast: any, router: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        CreateTeam(payload)
            .then((result) => {
                const { data } = result;

                dispatch(saveNewTeamData(data.data));

                dispatch(setCurrentTeam(data.data));

                updateAlertMsg(toast, {
                    type: 'success',
                    message: 'Congratulations, Team successfully created'
                });

                dispatch(updateIsLoading(false));

                router.push('/dashboard/club-management/add-team');
            })

            .catch((err) => {
                updateAlertMsg(toast, { type: 'error', message: err.response.data.message });

                dispatch(updateIsLoading(false));
            });
    };
};

export const filterTeam = (text: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        dispatch(filterTeamData(text));

        dispatch(updateIsLoading(false));
    };
};

export const filterPlayers = (text: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        dispatch(filterPlayersData(text));

        dispatch(updateIsLoading(false));
    };
};

export const filterStaffs = (text: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        dispatch(filterStaffsData(text));

        dispatch(updateIsLoading(false));
    };
};
export const getTeamDetails = (teamID: string, toast: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true));

        GetTeamDetails(teamID)
            .then((result) => {
                const { data } = result;
                dispatch(setCurrentTeam(data.data));
                dispatch(updateIsLoading(false));
            })
            .catch((err) => {
                console.log('get team details error', err);
                updateAlertMsg(toast, { type: 'error', message: err.response.data.message });
                dispatch(updateIsLoading(false));
            });
    };
};

export const getAllPlayers = (clubId: string | undefined) => {
    return async (dispatch: Dispatch) => {
        GetPlayersForClub(clubId)
            .then((result) => {
                console.log('all players', result);
                dispatch(saveAllPlayers(result?.data));
            })
            .catch((err) => {
                console.log('get all players error', err);
            });
    };
};

export const saveAllPlayers = (data: any) => {
    return {
        type: actionTypes.GET_ALL_PLAYERS,
        payload: data
    };
};

const saveTeamData = (data: TeamDataType[] | null) => {
    return {
        type: actionTypes.SAVE_TEAM_DETAILS,

        payload: data
    };
};

const filterTeamData = (data: string) => {
    return {
        type: actionTypes.FILTER_TEAM_DETAILS,
        payload: data
    };
};

const filterPlayersData = (data: string) => {
    return {
        type: actionTypes.FILTER_PLAYERS,
        payload: data
    };
};

const filterStaffsData = (data: string) => {
    return {
        type: actionTypes.FILTER_STAFFS,
        payload: data
    };
};

const saveNewTeamData = (data: TeamDataType) => {
    return {
        type: actionTypes.SAVE_NEW_TEAM,
        payload: data
    };
};

export function setCurrentTeam(data: any): any {
    return {
        type: actionTypes.SET_CURRENT_TEAM,
        payload: data
    };
}
