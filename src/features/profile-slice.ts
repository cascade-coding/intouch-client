import { ProfileType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type stateType = {
  profile: ProfileType;
  croppedImage: string;
};

const initialState: stateType = {
  profile: {
    id: "",
    name: "",
    profile_photo: "",
    bio: "",
    gender: "",
    date_of_birth: null,
  },
  croppedImage: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileType>) => {
      state.profile = action.payload;
    },

    updateValues: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      const { name, value } = action.payload;
      state.profile = { ...state.profile, [name]: value };
    },
    setCoppedImage: (state, action: PayloadAction<string>) => {
      state.croppedImage = action.payload;
    },
  },
});

export const { setProfile, updateValues, setCoppedImage } =
  profileSlice.actions;

export default profileSlice.reducer;
