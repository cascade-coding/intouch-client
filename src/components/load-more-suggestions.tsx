import React, { SetStateAction, useEffect, useState } from "react";
import LoadingAnimation from "./loading-animation";
import { useInView } from "react-intersection-observer";
import { FollowProfilesType } from "@/types";
import { privateApi } from "@/http";

type PropType = {
  next: string | null;
  setSuggestions: (value: SetStateAction<FollowProfilesType>) => void;
};

const LoadMoreSuggestions = ({ next, setSuggestions }: PropType) => {
  const [ref, inView] = useInView();
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    if (inView && next !== null) {
      (async () => {
        try {
          const res = await privateApi.get(`${next}`);
          const { data } = res as {
            data: FollowProfilesType;
          };

          if (data.next === null) setAllLoaded(true);

          setSuggestions((prev) => {
            return {
              next: data.next,
              previous: data.previous,
              results: [...prev.results, ...data.results],
            };
          });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [inView]);

  return (
    <div ref={ref}>
      {!allLoaded && <LoadingAnimation />}

      {allLoaded && (
        <p className="text-center text-muted-foreground py-4">end of records</p>
      )}
    </div>
  );
};

export default LoadMoreSuggestions;
