import { PostType } from "@/types";
import { RefObject, useRef, useState } from "react";
import Avatar from "./avatar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const DialogPostContent = ({ post }: { post: PostType }) => {
  const textEl: RefObject<HTMLSpanElement> = useRef(null);
  const [readMore, setReadMore] = useState(false);

  const handleReadMore = () => {
    if (textEl.current) {
      textEl.current.innerText = !readMore
        ? (post.text as string)
        : (`${post.text?.slice(0, 270)}...` as string);
      setReadMore(!readMore);
    }
  };
  return (
    <>
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

      {post.post_images.length > 0 && (
        <Carousel infiniteLoop showThumbs={false} swipeable showArrows>
          {post.post_images.map((item) => (
            <div key={item.id} className="">
              <img
                src={`https://res.cloudinary.com/dsmyfgxd1/${item.image}`}
                alt="Post img"
                className="w-full max-w-full h-auto"
              />
            </div>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default DialogPostContent;
