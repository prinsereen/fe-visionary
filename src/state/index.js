import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  currentProfile: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setCurrentProfile: (state, action) => {
      state.currentProfile = action.payload.currentProfile;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.profile = null;
    },
  },
});

export const { setLogin, setLogout, setCurrentProfile } = authSlice.actions;
export default authSlice.reducer;
