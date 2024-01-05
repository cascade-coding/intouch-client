import { CommentType, PostType, ReplyCommentType } from "@/types";
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

type RepliesDataType = {
  replyTo: string;
  results: ReplyCommentType[];
  next: boolean | null;
  previous: boolean | null;
};

export interface PostsState {
  posts: PostsDataType;
  dialogPostId: string;
  dialogComments: CommentsDataType;
  commentReplies: RepliesDataType[];
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
  commentReplies: [],
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

    setNewPost: (state, action: PayloadAction<PostType>) => {
      state.posts.results = [action.payload, ...state.posts.results];
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

    addNewComment: (state, action: PayloadAction<CommentType>) => {
      state.dialogComments.results = [
        action.payload,
        ...state.dialogComments.results,
      ];
    },

    setCommentLikeInfo: (state, action: PayloadAction<string>) => {
      const comment = state.dialogComments.results.find(
        (item) => item.id === action.payload
      );
      if (comment) {
        comment.user_liked = !comment.user_liked;

        if (comment.user_disliked) comment.user_disliked = false;

        comment.like_counts = comment.user_liked
          ? comment.like_counts + 1
          : comment.like_counts - 1;
      }
    },

    setCommentDislikeInfo: (state, action: PayloadAction<string>) => {
      const comment = state.dialogComments.results.find(
        (item) => item.id === action.payload
      );
      if (comment) {
        comment.user_disliked = !comment.user_disliked;

        if (comment.user_liked) comment.user_liked = false;

        comment.like_counts = comment.user_liked
          ? comment.like_counts + 1
          : comment.like_counts - 1;
      }
    },

    setCommentReplies: (state, action: PayloadAction<RepliesDataType>) => {
      state.commentReplies = [...state.commentReplies, action.payload];
    },

    loadMoreCommentReplies: (state, action: PayloadAction<RepliesDataType>) => {
      const { replyTo, next, previous, results } = action.payload;

      const current = state.commentReplies.find(
        (item) => item.replyTo === replyTo
      );

      if (current) {
        Object.assign(current, { next, previous, replyTo });
        current.results.push(...results);
      }
    },

    emptyCommentReplies: (state, action: PayloadAction<[]>) => {
      state.commentReplies = action.payload;
    },

    addNewReply: (state, action: PayloadAction<ReplyCommentType>) => {
      const current = state.commentReplies.find(
        (item) => item.replyTo === action.payload.comment
      );

      if (current) {
        current.results.unshift(action.payload);
      }
    },

    increaseReplyCounts: (state, action: PayloadAction<string>) => {
      const comments = state.dialogComments.results;
      const comment = comments.find((item) => item.id === action.payload);
      if (comment && comment.reply_counts !== undefined) {
        comment.reply_counts++;
      }
    },

    setReplyLikeInfo: (
      state,
      action: PayloadAction<{ replyTo: string; replyId: string }>
    ) => {
      const replyToComment = state.commentReplies.find(
        (item) => item.replyTo === action.payload.replyTo
      );

      if (replyToComment) {
        const current = replyToComment.results.find(
          (item) => item.id === action.payload.replyId
        );

        if (!current) return;

        current.user_liked = !current.user_liked;

        if (current.user_disliked) current.user_disliked = false;

        current.like_counts = current.user_liked
          ? current.like_counts + 1
          : current.like_counts - 1;
      }
    },

    setReplyDislikeInfo: (
      state,
      action: PayloadAction<{ replyTo: string; replyId: string }>
    ) => {
      const replyToComment = state.commentReplies.find(
        (item) => item.replyTo === action.payload.replyTo
      );

      if (replyToComment) {
        const current = replyToComment.results.find(
          (item) => item.id === action.payload.replyId
        );

        if (!current) return;

        current.user_disliked = !current.user_disliked;

        if (current.user_liked) current.user_liked = false;

        current.like_counts = current.user_liked
          ? current.like_counts + 1
          : current.like_counts - 1;
      }
    },
  },
});

export const {
  setPosts,
  setPostsOnScroll,
  setNewPost,
  setPostLikeInfo,
  setDialogPostId,
  setComments,
  setCommentsOnScroll,
  addNewComment,
  setCommentLikeInfo,
  setCommentDislikeInfo,
  setCommentReplies,
  loadMoreCommentReplies,
  emptyCommentReplies,
  addNewReply,
  increaseReplyCounts,
  setReplyLikeInfo,
  setReplyDislikeInfo,
} = postsSlice.actions;

export default postsSlice.reducer;
