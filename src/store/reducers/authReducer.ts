import * as types from '@/store/actions/actionTypes'
import { UserDataType } from '@/types/AuthDataType'

const initialState = {
  user: null,
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
    default: return state
  }
}