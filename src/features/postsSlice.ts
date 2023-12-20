import { PostType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PostsState {
  values: PostType[];
}

const initialState: PostsState = {
  values: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostType[]>) => {
      state.values = action.payload;
    },

    setPostLikeInfo: (state, action: PayloadAction<string>) => {
      const post = state.values.find((item) => item.id === action.payload);
      if (post) {
        post.user_liked = !post.user_liked;
        
        post.like_counts = post.user_liked
          ? post.like_counts + 1
          : post.like_counts - 1;
      }
    },
  },
});

export const { setPosts, setPostLikeInfo } = postsSlice.actions;

export default postsSlice.reducer;
