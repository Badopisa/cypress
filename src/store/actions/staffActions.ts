import {updateAlertMsg, updateIsLoading} from "@/store/actions/msgAction";
import * as Redux from "redux";
import * as actionTypes from "@/store/actions/actionTypes";
import {fetchTeams, getTeamDetails} from "@/store/actions/teamActions";
import {StaffFormType} from "@/types/StaffDataType";
import {CreateStaff, GetStaffForAClub, UpdateStaff} from "@/services/staffManagementService";
import {AddStaffToTeam, RemovePlayerFromTeam, RemoveStaffFromTeam} from "@/services/teamManagementService";
import {PlayerFormType} from "@/types/PlayerDataType";
import {UpdatePlayer} from "@/services/playerManagementService";
import {saveNewPlayerData} from "@/store/actions/playerActions";

type Dispatch = Redux.Dispatch<any>;

export const createAndAddStaffToTeam = (payload: StaffFormType, teamId: string, club_id: string, toast: any, onClose: any, setSeleced: any, useCurrentTeamID: boolean) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true))

        CreateStaff(payload)
            .then((result) => {
                const {data} = result
                console.log('result', data)
                const addStaffToTeamData = {
                    staff: [{
                        staff_id: data?.data?.id,
                        team_id: teamId,
                        role: data?.data?.role
                    }]
                }
                console.log('createStaffToTeamdata', addStaffToTeamData)

                dispatch(saveNewStaffData(data?.data))
                dispatch(getAllStaffs(club_id))

                updateAlertMsg(toast, {type: "success", message: "Congratulations, Staff successfully created"})

                console.log('addStaffToClubPayload',  addStaffToTeamData)
                AddStaffToTeam( addStaffToTeamData).then(newResult => {
                    dispatch(addStaffToTeam(newResult?.data))
                    updateAlertMsg(toast, {
                        type: "success",
                        message: "Congratulations, Staff successfully added to team"
                    })
                    console.log('newResult', newResult)
                    dispatch(getTeamDetails(newResult?.data?.data[0]?.team_id, toast))
                    dispatch(fetchTeams(data?.data?.club_id));
                    onClose(false)
                    setSeleced(true)
                    dispatch(updateIsLoading(false))
                }).catch(err => {
                    console.log('add staff to team error', err)
                    onClose(useCurrentTeamID)
                    setSeleced(!useCurrentTeamID)
                    handleError(err, toast, dispatch);
                })
            })
            .catch((err) => {
                handleError(err, toast, dispatch);
            });

    };
}

export const checkSelectedStaff = (id: string, role: string, teamId: string) => {
    const staff = {id, role, teamId}
    return {
        type: actionTypes.CHECK_SELECTED_STAFF,
        payload: staff
    }
}

export const addSelectedStaffsToTeam = (payload: any[], team_id: string, club_id: string, toast: any, onClose: any, setSeleced: any,) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true))
        const addStaffToTeamData = {
            staff: payload.map(staff => {
                return {
                    staff_id: staff.id,
                    team_id,
                    role: staff.role
                }
            })
        }

        console.log('addStaffToClubPayload', addStaffToTeamData)
        AddStaffToTeam(addStaffToTeamData).then(newResult => {
            dispatch(addStaffToTeam(newResult?.data))
            updateAlertMsg(toast, {
                type: "success",
                message: "Congratulations, Staff successfully added to team"
            })
            console.log('newResult', newResult)
            dispatch(getTeamDetails(newResult?.data?.data[0]?.team_id, toast))
            dispatch(fetchTeams(club_id));
            onClose(false)
            setSeleced(true)
            dispatch(updateIsLoading(false))
        }).catch(err => {
            console.log('add staff to team error', err)
            handleError(err, toast, dispatch);
        })
    }
}

export const updateStaff = (payload: StaffFormType, team_id: string, club_id: string, toast: any, onClose: any, setSeleced: any,) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true))
        UpdateStaff(payload).then((result) => {
            const {data} = result
            console.log('update staff result', data)
            dispatch(saveNewStaffData(data?.data))
            updateAlertMsg(toast, {type: "success", message: "Congratulations, Staff successfully updated"})
            //insert correct club id path here
            dispatch(getAllStaffs(club_id))
            dispatch(getTeamDetails(team_id, toast))
            dispatch(fetchTeams(club_id));
            dispatch(updateIsLoading(false))
            onClose(false)
            setSeleced(true)

        }).catch((err) => {
            dispatch(updateIsLoading(false))
            handleError(err, toast, dispatch);
        })
    }
}

export const getAllStaffs = (clubId: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateIsLoading(true))
        GetStaffForAClub(clubId).then(result => {
            console.log('all staffs', result)
            dispatch(saveAllStaffs(result?.data))
            dispatch(updateIsLoading(false))
        }).catch(err => {
            console.log('get all staffs error', err)
        })
    }
}

export const removeStaffFromTeam = (staff_id: string, role: string, team_id: string, club_id: any, toast: any, onClose: any) => {
    return async (dispatch: Dispatch) => {
        const removeStaffFromClubPayload = {
            staff: [{
                staff_id,
                team_id,
                role
            }]
        }
        RemoveStaffFromTeam(removeStaffFromClubPayload).then(newResult => {
            dispatch(addStaffToTeam(newResult?.data))
            updateAlertMsg(toast, {
                type: "success",
                message: "Staff successfully removed from team"
            })
            console.log('newResult', newResult)
            dispatch(getTeamDetails(team_id, toast))
            dispatch(fetchTeams(club_id));
            onClose(false)
            // setSeleced(true)
            dispatch(updateIsLoading(false))
        }).catch(err => {
            console.log('remove staff from team error', err)
            handleError(err, toast, dispatch);
        })
    }
}

const handleError = (err: any, toast: any, dispatch: Dispatch) => {
    updateAlertMsg(toast, {type: "error", message: 'Not added to a team'})
    dispatch(updateIsLoading(false))
}

export function saveNewStaffData(data: any): any {
    return {
        type: actionTypes.SAVE_NEW_STAFF,
        payload: data
    }
}

function saveAllStaffs(data: any): any {
    return {
        type: actionTypes.GET_ALL_STAFFS,
        payload: data
    }
}

function addStaffToTeam(data: any): any {
    return {
        type: actionTypes.ADD_STAFF_TO_TEAM,
        payload: data
    }
}
