import Posts from "@/components/posts";
import TopSuggestions from "@/components/top-suggestions";

const Home = () => {
  return (
    <>
      <main className="mt-28">
        <div className="mx-auto px-4 sm:px-8 w-full max-w-5xl min-h-screen flex gap-4">
          <div className="flex flex-col w-full md:max-w-2xl">
            <Posts />
          </div>

          <TopSuggestions />
        </div>
      </main>
    </>
  );
};

export default Home;
