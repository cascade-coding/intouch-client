import { useState } from "react";

import numeral from "numeral";

import {
  MdOutlineThumbUp,
  MdOutlineThumbDown,
  MdOutlineQuickreply,
  MdThumbUp,
  MdThumbDown,
} from "react-icons/md";


import { CommentType } from "@/types";

import Avatar from "../shared/avatar";

import HumanizeTime from "../shared/humanize-time";

import ReplyInput from "./reply-input";

import useToggleCommentLikeDislike from "@/hooks/use-toggle-comment-like-dislike";

const CommentCard = ({
  comment,
  avatarSm = false,
  showReplyBtn = false,
  replyTo = "",
}: {
  comment: CommentType;
  avatarSm?: boolean;
  showReplyBtn?: boolean;
  replyTo?: string;
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);

  const { toggleLike, toggleDisLike } = useToggleCommentLikeDislike({
    comment_id: comment.id,
    replyTo,
    showReplyBtn,
  });

  return (
    <div className="mt-6">
      <div className="flex gap-x-4">
        <Avatar
          profile_photo={comment.profile.profile_photo}
          username={comment.profile.user.username}
          sm={avatarSm}
        />
        <div className="-mt-1 w-2/3">
          <p className="font-medium">
            {comment.profile.user.username}

            <HumanizeTime time={comment.created_at} />
          </p>

          <p className="text-sm mt-2">{comment.text}</p>

          <div className="flex gap-x-4 mt-2">
            <button
              className="cursor-pointer flex items-center justify-center gap-2"
              onClick={toggleLike}
            >
              {comment.user_liked ? <MdThumbUp /> : <MdOutlineThumbUp />}
              {comment.like_counts > 0 && (
                <span className="text-muted-foreground text-xs">
                  {numeral(comment.like_counts).format("0a")}
                </span>
              )}
            </button>
            <button className="cursor-pointer" onClick={toggleDisLike}>
              {comment.user_disliked ? <MdThumbDown /> : <MdOutlineThumbDown />}
            </button>

            {showReplyBtn && (
              <button
                className="cursor-pointer"
                onClick={() => setShowReplyInput(!showReplyInput)}
              >
                <MdOutlineQuickreply />
              </button>
            )}
          </div>
          {showReplyBtn && showReplyInput && (
            <ReplyInput commentId={comment.id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
