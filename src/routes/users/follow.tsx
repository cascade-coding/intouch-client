import MobileBottomNavbar from "@/components/mobile-bottom-navbar";
import TopHeader from "@/components/top-header";
import useGetFollowProfiles from "@/hooks/useGetFollowProfiles";
import SuggestionCard from "@/components/suggestion-card";
import LoadMoreSuggestions from "@/components/load-more-suggestions";

const Follow = () => {
  const { suggestions, setSuggestions, loading } = useGetFollowProfiles();

  return (
    <div>
      <TopHeader />
      <main className="mt-28">
        <div className="mx-auto px-4 sm:px-8 w-full max-w-5xl min-h-screen">
          {suggestions.results.map((suggestion) => (
            <SuggestionCard
              suggestion={suggestion}
              key={suggestion.id}
              setSuggestions={setSuggestions}
              loading={loading}
            />
          ))}

          <LoadMoreSuggestions
            setSuggestions={setSuggestions}
            next={suggestions.next}
          />
        </div>
      </main>
      <MobileBottomNavbar />
    </div>
  );
};

export default Follow;
