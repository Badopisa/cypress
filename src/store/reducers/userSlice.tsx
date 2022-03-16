import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UserType = {
  name: string | null,
  email: string | null
}

const initialState: UserType = {
  name: null,
  email: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserDetails: (state, action: PayloadAction<UserType>) => {
      state.name = action.payload.name
    }
  },
})

export const { saveUserDetails} = userSlice.actions

export default userSlice.reducer