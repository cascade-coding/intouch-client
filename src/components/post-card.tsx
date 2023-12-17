import { PostType } from "@/types";
import { RefObject, useRef, useState } from "react";
import {
  MdOutlineThumbUp,
  MdThumbUp,
  MdOutlineModeComment,
} from "react-icons/md";
import { Button } from "@/components/ui/button";
import numeral from "numeral";
import FsLightbox from "fslightbox-react";
import Avatar from "./avatar";
import useTogglePostLike from "@/hooks/useTogglePostLike";

const PostCard = ({ post }: { post: PostType }) => {
  const textEl: RefObject<HTMLSpanElement> = useRef(null);
  const [readMore, setReadMore] = useState(false);
  const [toggler, setToggler] = useState(false);
  const [{ liked, like_counts }, setPostLikeInfo] = useState({
    liked: post.user_liked,
    like_counts: post.like_counts,
  });
  const { togglePostLike } = useTogglePostLike();

  const handleReadMore = () => {
    if (textEl.current) {
      textEl.current.innerText = !readMore
        ? (post.text as string)
        : (`${post.text?.slice(0, 270)}...` as string);
      setReadMore(!readMore);
    }
  };

  return (
    <div className="bg-background border rounded-sm p-4 shadow-md mt-6 first:mt-0">
      <div className="mb-4">
        <div className="flex items-center gap-4">
          <Avatar
            profile_photo={post.profile.profile_photo}
            username={post.profile.user.username}
          />

          <h5>{post.profile.user.username}</h5>
        </div>
      </div>
      {post.text && (
        <div className="min-h-[70px]">
          {post.text.length > 280 ? (
            <div>
              <p>
                <span ref={textEl}>{post.text.slice(0, 270)}...</span>
                <span
                  className="cursor-pointer text-cyan-400 text-xs"
                  onClick={handleReadMore}
                >
                  {" "}
                  read more
                </span>
              </p>
            </div>
          ) : (
            post.text
          )}
        </div>
      )}

      {post.post_images.length === 1 && (
        <div className="grid grid-cols-1 gap-4">
          <div
            key={post.post_images[0].id}
            className="relative h-0"
            style={{ paddingBottom: "100%" }}
          >
            <img
              src={`https://res.cloudinary.com/dsmyfgxd1/${post.post_images[0].image}`}
              alt="Post img"
              className="absolute h-full w-full inset-0 object-cover text-transparent"
              onClick={() => setToggler(!toggler)}
            />
          </div>

          <FsLightbox
            toggler={toggler}
            sources={post.post_images.map(
              (item) => `https://res.cloudinary.com/dsmyfgxd1/${item.image}`
            )}
          />
        </div>
      )}

      {post.post_images.length > 1 && (
        <div>
          <div className="grid grid-cols-2 gap-4">
            {post.post_images.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="relative h-0"
                style={{ paddingBottom: "100%" }}
              >
                <img
                  src={`https://res.cloudinary.com/dsmyfgxd1/${item.image}`}
                  alt="Post img"
                  className="absolute h-full w-full inset-0 object-cover text-transparent"
                  onClick={() => setToggler(!toggler)}
                />
              </div>
            ))}

            {post.post_images.length > 4 && (
              <div
                className="relative"
                style={{ paddingBottom: "100%" }}
                onClick={() => setToggler(!toggler)}
              >
                <img
                  src={`https://res.cloudinary.com/dsmyfgxd1/${post.post_images[4].image}`}
                  alt={`See more`}
                  className="absolute h-full w-full inset-0 object-cover text-transparent"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <span className="text-white text-xl">See more</span>{" "}
                </div>
              </div>
            )}
          </div>

          <FsLightbox
            toggler={toggler}
            sources={post.post_images.map(
              (item) => `https://res.cloudinary.com/dsmyfgxd1/${item.image}`
            )}
          />
        </div>
      )}
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
        >
          <MdOutlineModeComment /> Comment
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
