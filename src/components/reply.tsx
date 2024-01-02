import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { ChevronDown, ChevronUp, CornerDownRight } from "lucide-react";

import { Button } from "./ui/button";

import { CommentType } from "@/types";

import { privateApi } from "@/http";

import { RootState } from "@/app/store";

import {
  loadMoreCommentReplies,
  setCommentReplies,
} from "@/features/postsSlice";

import CommentCard from "./comment-card";

const Reply = ({ comment }: { comment: CommentType }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const dispatch = useDispatch();

  const { commentReplies } = useSelector((state: RootState) => state.posts);

  const replies = commentReplies.find((item) => item.replyTo === comment.id);

  const handleLoadReplies = async () => {
    setShowReplies(!showReplies);

    if (initialLoaded) return;

    try {
      const { data } = await privateApi.post(`/get_post_comment_replies/`, {
        id: comment.id,
      });
      dispatch(setCommentReplies({ ...data, replyTo: comment.id }));
      setInitialLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLoadMoreReplies = async () => {
    if (!replies) return;
    if (replies.next === null) return;
    try {
      const { data } = await privateApi.post(`${replies.next}`, {
        id: comment.id,
      });
      dispatch(loadMoreCommentReplies({ ...data, replyTo: comment.id }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="ml-[34px]">
        <Button
          className="mt-1"
          variant="info"
          size="sm"
          onClick={handleLoadReplies}
        >
          {showReplies ? (
            <ChevronUp size={15} className="pt-[2px] mr-2" />
          ) : (
            <ChevronDown size={15} className="pt-[2px] mr-2" />
          )}
          <span>{comment.reply_counts} replies</span>
        </Button>

        {replies && (
          <div className={`${showReplies ? "block" : "hidden"}`}>
            {replies.results.map((item) => (
              <CommentCard
                key={item.id}
                comment={item}
                avatarSm={true}
                replyTo={comment.id}
              />
            ))}

            {replies.next && (
              <Button
                className="mt-1"
                variant="info"
                size="sm"
                onClick={handleLoadMoreReplies}
              >
                <CornerDownRight size={15} className="pt-[2px] mr-2" />{" "}
                <span>Show more replies</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Reply;
