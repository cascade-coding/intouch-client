import numeral from "numeral";

import { Link } from "react-router-dom";

import { Pencil } from "lucide-react";

import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const ProfileInfo = () => {
  const { user: currentUser } = useSelector((state: RootState) => state.user);

  const { user } = useSelector((state: RootState) => state.profileInfo);

  if (!user) return null;

  return (
    <div className="flex gap-x-4 sm:gap-x-6 items-center justify-center sm:justify-start">
      <div>
        {user.profile.profile_photo ? (
          <img
            src={user.profile.profile_photo}
            alt="profile_pic"
            className="w-16 h-16 md:w-36 md:h-36 rounded-full ring-4 ring-blue-700"
          />
        ) : (
          <div className="w-16 h-16 md:w-36 md:h-36 rounded-full bg-blue-950 ring-4 ring-blue-700 relative">
            <Link to="/users/edit_profile/" className="absolute top-8 right-5">
              {currentUser.username === user.username && (
                <Pencil className="text-blue-300 cursor-pointer hover:text-blue-500 transition" />
              )}
            </Link>
          </div>
        )}
        <h4 className="text-xl capitalize mt-1 pl-2">{user.username}</h4>
      </div>

      <div className="flex gap-x-6 -mt-4 justify-center flex-wrap">
        <div className="flex flex-col items-center">
          <span className="text-lg font-medium">
            {numeral(user.profile.total_posts).format("0a")}
          </span>
          <span>Posts</span>
        </div>

        <Link to="/users/followers" className="flex flex-col items-center">
          <span className="text-lg font-medium">
            {numeral(user.profile.total_followers).format("0a")}
          </span>
          <span>Followers</span>
        </Link>

        <Link to="/users/following" className="flex flex-col items-center">
          <span className="text-lg font-medium">
            {numeral(user.profile.total_following).format("0a")}
          </span>
          <span>Following</span>
        </Link>
      </div>
    </div>
  );
};

export default ProfileInfo;
