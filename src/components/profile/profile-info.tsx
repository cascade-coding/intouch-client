import numeral from "numeral";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { Pencil } from "lucide-react";

import { RootState } from "@/app/store";

const ProfileInfo = () => {
  const {
    username,
    profile: { profile_photo, total_followers, total_following, total_posts },
  } = useSelector((state: RootState) => state.user.user);
  return (
    <div className="flex gap-x-4 sm:gap-x-6 items-center justify-center">
      <div>
        {profile_photo ? (
          <img
            src={profile_photo}
            alt="profile_pic"
            className="w-16 h-16 md:w-36 md:h-36 rounded-full ring-4 ring-blue-700"
          />
        ) : (
          <div className="w-16 h-16 md:w-36 md:h-36 rounded-full bg-blue-950 ring-4 ring-blue-700 relative">
            <Link to="/users/edit_profile/" className="absolute top-8 right-5">
              <Pencil className="text-blue-300 cursor-pointer hover:text-blue-500 transition" />
            </Link>
          </div>
        )}
        <h4 className="text-xl capitalize mt-1 pl-2">{username}</h4>
      </div>

      <div className="flex gap-x-6 -mt-4 justify-center flex-wrap">
        <div className="flex flex-col items-center">
          <span className="text-lg font-medium">
            {numeral(total_posts).format("0a")}
          </span>
          <span>Posts</span>
        </div>

        <Link to="/users/followers" className="flex flex-col items-center">
          <span className="text-lg font-medium">
            {numeral(total_followers).format("0a")}
          </span>
          <span>Followers</span>
        </Link>

        <Link to="/users/following" className="flex flex-col items-center">
          <span className="text-lg font-medium">
            {numeral(total_following).format("0a")}
          </span>
          <span>Following</span>
        </Link>
      </div>
    </div>
  );
};

export default ProfileInfo;
