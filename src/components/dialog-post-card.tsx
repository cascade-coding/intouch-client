import {
  MdOutlineThumbUp,
  MdThumbUp,
  MdOutlineModeComment,
} from "react-icons/md";
import { Button } from "@/components/ui/button";
import numeral from "numeral";
import useTogglePostLike from "@/hooks/useTogglePostLike";
import DialogPostContent from "./dialog-post-content";
import { useDispatch, useSelector } from "react-redux";
import { setPostLikeInfo } from "@/features/postsSlice";
import { RootState } from "@/app/store";

const DialogPostCard = () => {
  const dispatch = useDispatch();
  const {
    posts: { results: posts },
    dialogPostId,
  } = useSelector((state: RootState) => state.posts);

  const post = posts.find((item) => item.id === dialogPostId);

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
      comments
    </div>
  );
};

export default DialogPostCard;
