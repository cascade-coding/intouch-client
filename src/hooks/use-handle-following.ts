import { privateApi } from "@/http";
import { SuggestionType } from "@/types";
import { SetStateAction } from "react";

type setTopSuggestionsType = (value: SetStateAction<SuggestionType[]>) => void;

function useHandleFollowing() {
  const handleFollowing = async (
    action: "follow" | "unfollow",
    profile: SuggestionType,
    setTopSuggestions: setTopSuggestionsType
  ) => {
    try {
      profile.is_following = action === "follow" ? true : false;
      setTopSuggestions((prev) => {
        prev.map((item) => {
          item.id === profile.id ? { ...profile } : profile;
        });
        return [...prev];
      });

      await privateApi.post("/handle_following/", { id: profile.id });
    } catch (error) {
      console.log(error);
    }
  };

  return { handleFollowing };
}

export default useHandleFollowing;
