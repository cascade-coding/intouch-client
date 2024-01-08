import { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import numeral from "numeral";
import { Button } from "../ui/button";
import { FollowProfilesType, SuggestionType } from "@/types";
import useHandleFollowProfile from "@/hooks/use-handle-follow-profile";
import Avatar from "../shared/avatar";

type SuggestionCardType = {
  suggestion: SuggestionType;
  setSuggestions: (value: SetStateAction<FollowProfilesType>) => void;
  loading: boolean;
};

const SuggestionCard = ({ suggestion, setSuggestions }: SuggestionCardType) => {
  const { handleFollowing } = useHandleFollowProfile();
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[500px] mx-auto">
      <div className="bg-gray-50 dark:bg-zinc-900 rounded mt-4">
        <div
          key={suggestion.id}
          className="flex items-center gap-4 p-3 transition-all border-b border-muted last:border-none"
        >
          <Avatar
            profile_photo={suggestion.profile_photo}
            username={suggestion.user.username}
          />

          <div className="flex items-center flex-1 justify-between">
            <div>
              <h4
                className="cursor-pointer hover:text-muted-foreground"
                onClick={() =>
                  navigate(`/users/profile/${suggestion.user.username}`)
                }
              >
                {suggestion.user.username}
              </h4>
              <h6 className="text-xs mt-1">
                <span className="text-muted-foreground">followers</span>{" "}
                {numeral(suggestion.total_followers).format("0a")}
              </h6>
            </div>

            {suggestion.is_following && (
              <Button
                onClick={() =>
                  handleFollowing("unfollow", suggestion, setSuggestions)
                }
                className="h-6 px-2 text-xs"
              >
                Unfollow
              </Button>
            )}

            {!suggestion.is_following && (
              <Button
                onClick={() =>
                  handleFollowing("follow", suggestion, setSuggestions)
                }
                className="h-6 px-2 text-xs"
              >
                Follow
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;
