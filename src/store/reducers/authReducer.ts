import * as types from '@/store/actions/actionTypes'
import { UserDataType } from '@/types/AuthDataType'

const initialState = {
  user: null,
  file: null,
  fileName: null
}

type IAction =  {
  type: string;
  payload?: UserDataType;
}

export const authReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case types.SAVE_USER_DETAILS:
      return {
        ...state,
        user: action.payload
      }
    case types.UPDATE_FILE:
      return {
        ...state,
        file: action.payload
      }
    case types.UPDATE_FILE_NAME:
      return {
        ...state,
        fileName: action.payload
      }
    default: return state
  }
}
