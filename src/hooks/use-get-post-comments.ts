import { RootState } from "@/app/store";
import { setComments } from "@/features/postsSlice";
import { privateApi } from "@/http";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetPostComments = () => {
  const { dialogPostId: id } = useSelector((state: RootState) => state.posts);

  const ran = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setComments({ results: [], next: null, previous: null }));
    if (ran.current === false) {
      (async () => {
        try {
          const { data } = await privateApi.post("/get_post_comments/", { id });
          dispatch(setComments(data));
        } catch (error) {
          console.log(error);
        }
      })();

      return () => {
        ran.current = true;
      };
    }
  }, []);
};

export default useGetPostComments;
