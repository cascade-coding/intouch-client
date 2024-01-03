import {
  MdOutlineThumbUp,
  MdThumbUp,
  MdOutlineModeComment,
} from "react-icons/md";
import { Button } from "@/components/ui/button";
import numeral from "numeral";
import useTogglePostLike from "@/hooks/use-toggle-post-like";
import DialogPostContent from "./dialog-post-content";
import { useDispatch, useSelector } from "react-redux";
import { setPostLikeInfo } from "@/features/post-slice";
import { RootState } from "@/app/store";
import useGetPostComments from "@/hooks/use-get-post-comments";
import CommentCard from "./comment-card";
import React from "react";
import LoadMoreComments from "./load-more-comments";
import Reply from "./reply";
import CommentInput from "./comment-input";

const DialogPostCard = () => {
  const dispatch = useDispatch();
  const {
    posts: { results: posts },
    dialogPostId,
    dialogComments,
  } = useSelector((state: RootState) => state.posts);

  const post = posts.find((item) => item.id === dialogPostId);

  useGetPostComments();

  const { togglePostLike } = useTogglePostLike();

  if (!post) return null;

  return (
    <div className="bg-background rounded-sm p-4 shadow-md mt-6 first:mt-0">
      <DialogPostContent post={post} />
      <div className="mt-4 flex gap-4 justify-between">
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2 flex-1"
          onClick={() => {
            dispatch(setPostLikeInfo(post.id));
            togglePostLike(post.id);
          }}
        >
          {post.user_liked ? <MdThumbUp /> : <MdOutlineThumbUp />}
          {numeral(post.like_counts).format("0a")}
        </Button>
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2  flex-1"
        >
          <MdOutlineModeComment /> Comment
        </Button>
      </div>
      <section className="p-2 overflow-y-auto max-h-[500px] mt-6 hide-scrollbar">
        <CommentInput />

        {dialogComments.results.map((comment) => (
          <React.Fragment key={comment.id}>
            <CommentCard comment={comment} showReplyBtn />
            {comment.reply_counts !== undefined && comment.reply_counts > 0 && (
              <Reply comment={comment} />
            )}
          </React.Fragment>
        ))}

        <LoadMoreComments />
      </section>
    </div>
  );
};

export default DialogPostCard;
