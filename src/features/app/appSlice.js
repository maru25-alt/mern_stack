import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading: true,
    locale: "en",
    messageView: false
  },
  reducers: {
    setLoading: (state, action )=> {
        console.log(action.payload)
        state.loading = action.payload
    },
    setLocale: (state, action) => {
        state.locale = action.payload.locale
    },
    setMessageView: (state, action) => {
       state.messageView = action.payload
    }
  },
});


export const { setLoading, setLocale, setMessageView } = appSlice.actions;

export const selectLoading = state => state.app.loading;
export const selectLocale = state => state.app.locale;
export const selectMessageView = state => state.app.messageView;

export default appSlice.reducer;
