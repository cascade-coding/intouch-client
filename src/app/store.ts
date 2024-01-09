import postsSlice from "@/features/post-slice";
import userProfileInfoSlice from "@/features/user-profile-info-slice";
import profileSlice from "@/features/profile-slice";
import uploadPostSlice from "@/features/upload-post-slice";
import userSlice from "@/features/user-slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    uploadPost: uploadPostSlice,
    profile: profileSlice,
    profileInfo: userProfileInfoSlice,
    user: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
