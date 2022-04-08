import * as types from '@/store/actions/actionTypes'
import { CategoryDataType } from '@/types/CategoryDataType'

const initialState = {
  category: [],
}

type IAction =  {
  type: string;
  payload?: CategoryDataType[] | [];
}

export const categoryReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case types.SAVE_CATEGORY_DETAILS:
        return {
            ...state,
            category: action.payload
        }
    default: return state
  }
}