import { useDispatch } from "react-redux";

import {
  setCommentDislikeInfo,
  setCommentLikeInfo,
  setReplyDislikeInfo,
  setReplyLikeInfo,
} from "@/features/postsSlice";

import { privateApi } from "@/http";

const useToggleCommentLikeDislike = ({
  showReplyBtn,
  comment_id,
  replyTo,
}: {
  showReplyBtn: boolean;
  comment_id: string;
  replyTo: string;
}) => {
  const dispatch = useDispatch();

  const toggleLike = async () => {
    if (showReplyBtn) {
      try {
        await privateApi.post("/toggle_comment_like/", {
          id: comment_id,
        });
        dispatch(setCommentLikeInfo(comment_id));
      } catch (error) {
        console.log(error);
      }
    }

    if (!showReplyBtn) {
      try {
        await privateApi.post("/toggle_reply_like/", {
          id: comment_id,
        });
        dispatch(setReplyLikeInfo({ replyId: comment_id, replyTo }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const toggleDisLike = async () => {
    if (showReplyBtn) {
      try {
        await privateApi.post("/toggle_comment_dislike/", {
          id: comment_id,
        });
        dispatch(setCommentDislikeInfo(comment_id));
      } catch (error) {
        console.log(error);
      }
    }

    if (!showReplyBtn) {
      try {
        await privateApi.post("/toggle_reply_dislike/", {
          id: comment_id,
        });
        dispatch(setReplyDislikeInfo({ replyId: comment_id, replyTo }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    toggleLike,
    toggleDisLike,
  };
};

export default useToggleCommentLikeDislike;
