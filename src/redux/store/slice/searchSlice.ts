import { createSlice } from "@reduxjs/toolkit";

export type TSearchState = {
  search: string;
  tags: string;
  currentPage?: string
};

const initialState: TSearchState = {
  search: "",
  tags: "",
  currentPage: "1"
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchPosts: (state, action) => {
      state.search = action.payload.search;
      state.tags = action.payload.tags;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    }
  },
});

export const { setSearchPosts, setCurrentPage } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
