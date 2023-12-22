import { privateApi } from "@/http";
import { FollowProfilesType } from "@/types";
import { SetStateAction, useEffect, useRef, useState } from "react";

export default function useGetFollowProfiles(): {
  suggestions: FollowProfilesType;
  loading: boolean;
  setSuggestions: (value: SetStateAction<FollowProfilesType>) => void;
} {
  const [suggestions, setSuggestions] = useState<FollowProfilesType>({
    next: null,
    previous: null,
    results: [],
  });

  const ran = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ran.current === false) {
      (async () => {
        try {
          const res = await privateApi.get("/suggestions/");
          const { data } = res as {
            data: FollowProfilesType;
          };
          setSuggestions(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      })();

      return () => {
        ran.current = true;
      };
    }
  }, []);

  return { suggestions, setSuggestions, loading };
}
