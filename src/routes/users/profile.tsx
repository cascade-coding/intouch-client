import { useSelector } from "react-redux";

import { RootState } from "@/app/store";

import ProfileInfo from "@/components/profile/profile-info";

const Profile = () => {
  const {} = useSelector((state: RootState) => state.user);
  return (
    <>
      <main className="mt-28">
        <div className="mx-auto px-4 sm:px-8 w-full max-w-5xl min-h-screen">
          <ProfileInfo />
          <div className="h-[1px] bg-border my-6" />
        </div>
      </main>
    </>
  );
};

export default Profile;
