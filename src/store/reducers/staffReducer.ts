import * as types from '@/store/actions/actionTypes'
import {StaffReducerData} from "@/store/reducers/reducerTypes";

const initialState: StaffReducerData = {
    newStaff: null,
    addedStaffsToTeamInfo: [],
    selectedStaffs: [],
    allStaffs: [],
}

type IAction = {
    type: string;
    payload?: any;
}

export const staffReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case types.GET_ALL_STAFFS:
            return {
                ...state,
                allStaffs: action.payload
            }
        case types.SAVE_NEW_STAFF:
            return {
                ...state,
                newStaff: action.payload
            }
        case types.ADD_STAFF_TO_TEAM:
            return {
                ...state,
                addedStaffsToTeamInfo: action.payload
            }
        case types.CHECK_SELECTED_STAFF:
            if (state.selectedStaffs.some((contStaff: any) => contStaff['id'] === action.payload.id)) {
                return {
                    ...state,
                    selectedStaffs: state.selectedStaffs.filter((staff: any) => staff.id !== action.payload.id)
                }
            } else {
                return {
                    ...state,
                    selectedStaffs: [...state.selectedStaffs, action.payload]
                }
            }
        default:
            return state
    }
}
