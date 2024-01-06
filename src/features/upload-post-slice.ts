import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type stateType = {
  text: string;
  chosenImages: string[];
  cropImage: string | null;
};

const initialState: stateType = {
  text: "",
  chosenImages: [],
  cropImage: null,
};

export const uploadPostSlice = createSlice({
  name: "uploadPost",
  initialState,
  reducers: {
    setChosenImages: (state, action: PayloadAction<string>) => {
      state.chosenImages = [action.payload, ...state.chosenImages];
    },

    removeImage: (state, action: PayloadAction<number>) => {
      const images = state.chosenImages;
      if (images[action.payload] === state.cropImage) {
        state.cropImage = null;
      }
      const newImages = [
        ...images.slice(0, action.payload),
        ...images.slice(action.payload + 1),
      ];
      state.chosenImages = newImages;
    },

    setCropImage: (state, action: PayloadAction<number>) => {
      const images = state.chosenImages;
      state.cropImage = images[action.payload];
    },

    updateCroppedImage: (state, action: PayloadAction<string>) => {
      const images = state.chosenImages;
      const current = images.indexOf(state.cropImage as string);
      images[current] = action.payload;
      state.chosenImages = images;
      state.cropImage = action.payload;
    },

    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const {
  setChosenImages,
  removeImage,
  setCropImage,
  updateCroppedImage,
  setText,
} = uploadPostSlice.actions;

export default uploadPostSlice.reducer;
