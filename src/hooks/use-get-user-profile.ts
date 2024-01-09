import { RootState } from "@/app/store";
import { IMAGE_BASE } from "@/config";
import { setUserProfile } from "@/features/user-profile-info-slice";
import { privateApi } from "@/http";
import { UserType } from "@/types";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function useGetUserProfile() {
  const ran = useRef(false);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { user: userProfile } = useSelector(
    (state: RootState) => state.profileInfo
  );

  const { username } = useParams();

  useEffect(() => {
    if (ran.current === false) {
      getProfile();

      return () => {
        ran.current = true;
      };
    }

    if (userProfile) {
      getProfile();
    }
  }, [username]);

  const getProfile = async () => {
    try {
      const res = await privateApi.get(`/profile/${username}/`);
      const { data } = res as {
        data: UserType;
      };
      if (data.profile.profile_photo) {
        data.profile.profile_photo = `${IMAGE_BASE}${data.profile.profile_photo}`;
      }
      dispatch(setUserProfile(data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, user: userProfile };
}
