import { PostType } from "@/types";
import { useState } from "react";
import {
  MdOutlineThumbUp,
  MdThumbUp,
  MdOutlineModeComment,
} from "react-icons/md";
import { Button } from "@/components/ui/button";
import numeral from "numeral";
import useTogglePostLike from "@/hooks/use-toggle-post-like";
import PostContent from "./post-content";
import { useDispatch } from "react-redux";
import { setDialogPostId, setPostLikeInfo } from "@/features/postsSlice";

const PostCard = ({
  post,
  setPostDialog,
}: {
  post: PostType;
  setPostDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const { togglePostLike } = useTogglePostLike();

  return (
    <div className="bg-background border rounded-sm p-4 shadow-md mt-6 first:mt-0">
      <PostContent post={post} />

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
          onClick={() => {
            setPostDialog(true), dispatch(setDialogPostId(post.id));
          }}
        >
          <MdOutlineModeComment /> Comment
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
