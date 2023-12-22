import { privateApi } from "@/http";
import { SuggestionType } from "@/types";
import { SetStateAction, useEffect, useRef, useState } from "react";

export default function useGetTopSuggestions(): {
  topSuggestions: SuggestionType[];
  loading: boolean;
  setTopSuggestions: (value: SetStateAction<SuggestionType[]>) => void;
} {
  const [topSuggestions, setTopSuggestions] = useState<SuggestionType[]>([]);
  const ran = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ran.current === false) {
      (async () => {
        try {
          const { data } = await privateApi.get("/suggestions?top=true/");
          const { suggestions } = data as { suggestions: SuggestionType[] };
          setTopSuggestions(suggestions);
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

  return { topSuggestions, setTopSuggestions, loading };
}
