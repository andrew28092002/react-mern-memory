import { createSlice } from "@reduxjs/toolkit";
import { TPostFromDB } from "../../../types/post";

type TState = {
  post: TPostFromDB | null
}

const updatingPostSlice = createSlice({
  name: "updatingPost",
  initialState: {
    post: null
  } as TState ,
  reducers: {
    setUpdatingPost: (state, action) => {
     state.post = action.payload
    },
    clearUpdatingPost: (state, action) => {
      state.post = null
    }
  },
});

export const {setUpdatingPost, clearUpdatingPost} = updatingPostSlice.actions
export const updatingPostReducer = updatingPostSlice.reducer