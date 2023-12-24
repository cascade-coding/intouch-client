import React from "react";

const Avatar = ({
  profile_photo,
  username,
  sm = false,
}: {
  profile_photo: string;
  username: string;
  sm?: boolean;
}) => {
  return (
    <>
      {profile_photo ? (
        <img
          src={`https://res.cloudinary.com/dsmyfgxd1/${profile_photo}`}
          alt="profile"
          width={28}
          height={28}
          className={`rounded-full ${
            sm ? "w-5 h-5" : "w-8 h-8"
          } object-cover ring-2 ring-primary`}
        />
      ) : (
        <div
          className={`bg-secondary text-secondary-foreground ${
            sm ? "w-5 h-5" : "w-8 h-8"
          } rounded-full text-sm flex items-center justify-center focus:outline-none cursor-pointer uppercase ring-2 ring-primary`}
        >
          {username.slice(0, 1)}
        </div>
      )}
    </>
  );
};

export default Avatar;
