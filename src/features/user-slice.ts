import { UserType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type stateType = {
  user: UserType;
};

const initialState: stateType = {
  user: {
    id: "",
    username: "",
    email: "",
    profile: {
      id: "",
      profile_photo: "",
    },
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    updateProfilePhoto: (state, action: PayloadAction<string>) => {
      state.user.profile.profile_photo = action.payload;
    },
  },
});

export const { setUser, updateProfilePhoto } = userSlice.actions;

export default userSlice.reducer;
