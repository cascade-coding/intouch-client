import ProfileInfo from "@/components/profile/profile-info";
import useGetUserProfile from "@/hooks/use-get-user-profile";

const Profile = () => {
  const { user, loading } = useGetUserProfile();

  if (loading) return null;

  if (!user) return <NotFound />;

  return (
    <>
      <main className="mt-28">
        <div className="mx-auto px-4 sm:px-8 w-full max-w-5xl min-h-screen">
          <ProfileInfo user={user} />
          <div className="h-[1px] bg-border my-6" />
        </div>
      </main>
    </>
  );
};

export default Profile;

function NotFound() {
  return <h1 className="mt-28 text-center">No User found</h1>;
}
