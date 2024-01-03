import postsSlice from "@/features/post-slice";
import uploadPostSlice from "@/features/upload-post-slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    uploadPost: uploadPostSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
