import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    msg: null,
    type: null,
  },
  reducers: {
    setAlert: (state, action) => {
      state.msg = action.payload.msg;
      state.type = action.payload.type;
    },
    removeAlert: (state) => {
      state.msg = null;
      state.type = null;
    },
  },
});

export const selectAlertMsg = (state) => state.alert.msg;
export const selectAlertType = (state) => state.alert.type;

export const { setAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
