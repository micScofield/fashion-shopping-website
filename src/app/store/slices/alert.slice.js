import { createSlice } from '@reduxjs/toolkit';

/*
To see supported types, check this file - 'common/constants';
*/

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

// use hand written thunk like below for automatically removing alerts after some time
/*
export const alert =
  ({ msg, type }) =>
  async (dispatch, getState) => {
    dispatch(setAlert({ msg, type }));
    setTimeout(() => {
      dispatch(removeAlert());
    }, 3000);
  };
*/

export const selectAlertMsg = (state) => state.alert.msg;
export const selectAlertType = (state) => state.alert.type;

export const { setAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
