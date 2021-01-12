import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  },
  reducers: {
    loggin: (state, action )=> {
          state.user = action.payload
    },
    logout: state => {
      state.user = null;
    }
  },
});


export const { loggin, logout } = userSlice.actions;

export const selectUser = state => state.user.user;


export const handleSignout = () => dispatch => {
      localStorage.clear().then(() => {
          dispatch(logout());
      });
}
export default userSlice.reducer;
