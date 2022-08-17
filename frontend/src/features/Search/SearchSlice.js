import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    showSearch: (state, action) => {
      state.isOpen = true;
    },
    hideSearch: (state, action) => {
      state.isOpen = false;
    },
  },
});

export const { hideSearch, showSearch } = searchSlice.actions;
export default searchSlice.reducer;
