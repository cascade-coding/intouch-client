import { RootState } from "@/app/store";
import { setPosts } from "@/features/post-slice";
import { privateApi } from "@/http";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useGetHomePosts() {
  const { posts } = useSelector((state: RootState) => state.posts);

  const ran = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ran.current === false) {
      (async () => {
        try {
          const { data } = await privateApi.get("/home/posts/");
          dispatch(setPosts(data));
        } catch (error) {
          console.log(error);
        }
      })();

      return () => {
        ran.current = true;
      };
    }
  }, []);

  return { posts };
}
