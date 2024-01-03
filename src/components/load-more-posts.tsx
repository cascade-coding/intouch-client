import { useEffect, useState } from "react";
import LoadingAnimation from "./loading-animation";
import { useInView } from "react-intersection-observer";
import { privateApi } from "@/http";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { setPostsOnScroll } from "@/features/post-slice";

const LoadMorePosts = () => {
  const [ref, inView] = useInView();
  const [postsEnded, setPostsEnded] = useState(false);
  const { posts } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (inView && posts.next !== null) {
      (async () => {
        try {
          const { data } = await privateApi.get(`${posts.next}`);

          if (data.next === null) setPostsEnded(true);

          dispatch(setPostsOnScroll(data));
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [inView]);

  return (
    <div ref={ref}>
      {posts.next && <LoadingAnimation />}

      {postsEnded && (
        <p className="text-center text-muted-foreground py-4">
          Reload for new posts
        </p>
      )}
    </div>
  );
};

export default LoadMorePosts;
