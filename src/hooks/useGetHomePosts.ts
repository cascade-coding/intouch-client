import { privateApi } from "@/http";
import { PostType } from "@/types";
import { useEffect, useRef, useState } from "react";

export default function useGetHomePosts() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current === false) {
      (async () => {
        try {
          const { data } = await privateApi.get("/home/posts/");
          setPosts(data.results);
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
