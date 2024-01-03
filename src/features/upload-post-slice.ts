import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type stateType = {
  chosenImages: string[];
};

const initialState: stateType = {
  chosenImages: [],
};

export const uploadPostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setChosenImages: (state, action: PayloadAction<string>) => {
      state.chosenImages = [action.payload, ...state.chosenImages];
    },
  },
});

export const { setChosenImages } = uploadPostSlice.actions;

export default uploadPostSlice.reducer;
