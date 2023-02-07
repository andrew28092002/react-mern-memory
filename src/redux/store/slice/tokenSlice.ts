import { createSlice } from "@reduxjs/toolkit";
import { IUserFromDb, IUserFromGoogle } from "../../../types/user";

type TInitialState = {
  user: IUserFromDb | IUserFromGoogle | null;
  token: string;
  isSignUp: boolean;
  countPages: number;
};

const tokenSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: "", isSignUp: false, countPages: 1 } as TInitialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = "";
    },
    switchMode: (state, action) => {
      state.isSignUp = !state.isSignUp;
    },
    setCountPages: (state, action) => {
      state.countPages = action.payload
    }
  },
});

export const { setCredentials, logout, switchMode, setCountPages } = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;
