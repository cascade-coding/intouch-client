import { UserType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type stateType = {
  user: UserType | null;
};

const initialState: stateType = {
  user: null,
};

export const userProfileInfoSlice = createSlice({
  name: "profileInfo",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    decreaseTotalPosts: (state) => {
      if (state.user?.profile.total_posts) {
        state.user.profile.total_posts = state.user.profile.total_posts - 1;
      }
    },
  },
});

export const { setUserProfile, decreaseTotalPosts } =
  userProfileInfoSlice.actions;

export default userProfileInfoSlice.reducer;
