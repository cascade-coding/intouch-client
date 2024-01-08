import useGetTopSuggestions from "@/hooks/use-get-top-suggestions";
import AvatarSkeleton from "../shared/avatar-skeleton";
import SuggestionCardPrimary from "./suggestion-card-primary";

const TopSuggestions = () => {
  const { topSuggestions, setTopSuggestions, loading } = useGetTopSuggestions();

  return (
    <div className="hidden md:block !relative flex-shrink-0 w-[250px] lg:w-[300px]">
      <div className="sticky top-[115px] max-h">
        {loading ? (
          <>
            <div className="capitalize text-lg font-medium">
              Top Suggestions
            </div>

            <div className="bg-gray-50 dark:bg-zinc-950 rounded mt-2">
              <AvatarSkeleton />
              <AvatarSkeleton />
              <AvatarSkeleton />
            </div>
          </>
        ) : (
          <>
            <div className="capitalize text-lg font-medium">
              Top Suggestions
            </div>

            <div className="bg-gray-50 dark:bg-zinc-900 rounded mt-2">
              {topSuggestions.map((profile) => (
                <SuggestionCardPrimary
                  suggestion={profile}
                  key={profile.id}
                  setSuggestions={setTopSuggestions}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TopSuggestions;
