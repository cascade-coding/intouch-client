import { CommentType, PostType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type PostsDataType = {
  results: PostType[];
  next: boolean | null;
  previous: boolean | null;
};

type CommentsDataType = {
  results: CommentType[];
  next: boolean | null;
  previous: boolean | null;
};

export interface PostsState {
  posts: PostsDataType;
  dialogPostId: string;
  dialogComments: CommentsDataType;
}

const initialState: PostsState = {
  posts: {
    results: [],
    next: null,
    previous: null,
  },
  dialogPostId: "",
  dialogComments: {
    results: [],
    next: null,
    previous: null,
  },
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostsDataType>) => {
      state.posts = action.payload;
    },

    setPostsOnScroll: (state, action: PayloadAction<PostsDataType>) => {
      const { next, previous, results } = action.payload;

      state.posts.next = next;
      state.posts.previous = previous;
      state.posts.results = [...state.posts.results, ...results];
    },

    setPostLikeInfo: (state, action: PayloadAction<string>) => {
      const post = state.posts.results.find(
        (item) => item.id === action.payload
      );
      if (post) {
        post.user_liked = !post.user_liked;

        post.like_counts = post.user_liked
          ? post.like_counts + 1
          : post.like_counts - 1;
      }
    },

    setDialogPostId: (state, action: PayloadAction<string>) => {
      state.dialogPostId = action.payload;
    },

    setComments: (state, action: PayloadAction<CommentsDataType>) => {
      state.dialogComments = action.payload;
    },

    setCommentsOnScroll: (state, action: PayloadAction<CommentsDataType>) => {
      const { next, previous, results } = action.payload;

      state.dialogComments.next = next;
      state.dialogComments.previous = previous;
      state.dialogComments.results = [
        ...state.dialogComments.results,
        ...results,
      ];
    },

    increaseReplyCounts: (state, action: PayloadAction<string>) => {
      const comments = state.dialogComments.results;
      const comment = comments.find((item) => item.id === action.payload);

      comment?.reply_counts && comment.reply_counts++;
    },
  },
});

export const {
  setPosts,
  setPostsOnScroll,
  setPostLikeInfo,
  setDialogPostId,
  setComments,
  setCommentsOnScroll,
  increaseReplyCounts,
} = postsSlice.actions;

export default postsSlice.reducer;
