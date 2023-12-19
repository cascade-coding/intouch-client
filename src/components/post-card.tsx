import { PostType } from "@/types";
import { useState } from "react";
import {
  MdOutlineThumbUp,
  MdThumbUp,
  MdOutlineModeComment,
} from "react-icons/md";
import { Button } from "@/components/ui/button";
import numeral from "numeral";
import useTogglePostLike from "@/hooks/useTogglePostLike";
import PostContent from "./post-content";

const PostCard = ({
  post,
  setPostDialog,
  setPost,
}: {
  post: PostType;
  setPostDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setPost: React.Dispatch<React.SetStateAction<PostType | null>>;
}) => {
  const [{ liked, like_counts }, setPostLikeInfo] = useState({
    liked: post.user_liked,
    like_counts: post.like_counts,
  });
  const { togglePostLike } = useTogglePostLike();

  return (
    <div className="bg-background border rounded-sm p-4 shadow-md mt-6 first:mt-0">
      <PostContent post={post} />

      <div className="mt-4 flex gap-4 justify-between">
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2 flex-1"
          onClick={() => {
            setPostLikeInfo({
              liked: !liked,
              like_counts: liked ? like_counts - 1 : like_counts + 1,
            });
            togglePostLike(post.id);
          }}
        >
          {liked ? (
            <>
              <MdThumbUp />
              {numeral(like_counts).format("0a")}
            </>
          ) : (
            <>
              <MdOutlineThumbUp />
              {numeral(like_counts).format("0a")}
            </>
          )}
        </Button>
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2  flex-1"
          onClick={() => {
            setPostDialog(true), setPost(post);
          }}
        >
          <MdOutlineModeComment /> Comment
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
