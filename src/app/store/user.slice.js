import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null
  },
  reducers: {
    setCurrentUser: (state, action) => {
        state.currentUser = action.payload
    }
  }
})

export const selectUser = (state) => {
  return state.user?.currentUser
}

export const { setCurrentUser } = userSlice.actions
export default userSlice.reducer