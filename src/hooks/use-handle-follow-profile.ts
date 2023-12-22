import { privateApi } from "@/http";
import { FollowProfilesType, SuggestionType } from "@/types";
import { SetStateAction } from "react";

function useHandleFollowProfile() {
  const handleFollowing = async (
    action: "follow" | "unfollow",
    profile: SuggestionType,
    setSuggestions: (value: SetStateAction<FollowProfilesType>) => void
  ) => {
    try {
      profile.is_following = action === "follow" ? true : false;
      setSuggestions((prev) => {
        prev.results.map((item) => {
          item.id === profile.id ? { ...profile } : profile;
        });
        return {
          next: prev.next,
          previous: prev.previous,
          results: [...prev.results],
        };
      });

      await privateApi.post("/handle_following/", { id: profile.id });
    } catch (error) {
      console.log(error);
    }
  };

  return { handleFollowing };
}

export default useHandleFollowProfile;
