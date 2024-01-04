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

    removeImage: (state, action: PayloadAction<number>) => {
      const images = state.chosenImages;
      const newImages = [
        ...images.slice(0, action.payload),
        ...images.slice(action.payload + 1),
      ];
      state.chosenImages = newImages;
    },
  },
});

export const { setChosenImages, removeImage } = uploadPostSlice.actions;

export default uploadPostSlice.reducer;
