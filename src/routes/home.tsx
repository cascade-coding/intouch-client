import MobileBottomNavbar from "@/components/mobile-bottom-navbar";
import Posts from "@/components/posts";
import TopSuggestions from "@/components/top-suggestions";
import TopHeader from "@/components/top-header";

const Home = () => {
  return (
    <>
      <TopHeader />
      <main className="mt-28">
        <div className="mx-auto px-4 sm:px-8 w-full max-w-5xl min-h-screen flex gap-4">
          <div className="flex flex-col w-full md:max-w-2xl">
            <Posts />
          </div>

          <TopSuggestions />
        </div>
      </main>
      <MobileBottomNavbar />
    </>
  );
};

export default Home;
