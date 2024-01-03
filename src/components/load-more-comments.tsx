import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useInView } from "react-intersection-observer";

import { RootState } from "@/app/store";

import LoadingAnimation from "./loading-animation";

import { privateApi } from "@/http";

import { setCommentsOnScroll } from "@/features/post-slice";

const LoadMoreComments = () => {
  const [ref, inView] = useInView();
  const [recordsEnded, setRecordsEnded] = useState(false);
  const { dialogComments: comment, dialogPostId: id } = useSelector(
    (state: RootState) => state.posts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (inView && comment.next !== null) {
      (async () => {
        try {
          const { data } = await privateApi.post(`${comment.next}`, { id });

          if (data.next === null) setRecordsEnded(true);

          dispatch(setCommentsOnScroll(data));
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [inView]);

  return (
    <div ref={ref}>
      {comment.next && <LoadingAnimation />}

      {recordsEnded && (
        <p className="text-center text-muted-foreground py-4">
          end of comments
        </p>
      )}
    </div>
  );
};

export default LoadMoreComments;
