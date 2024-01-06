import { UserType } from "@/types";
import { RootState } from "@/app/store";
import { setUser } from "@/features/user-slice";
import { privateApi } from "@/http";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_BASE } from "@/config";

export default function useGetTokenUser() {
  const ran = useRef(false);

  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (ran.current === false) {
      (async () => {
        try {
          const { data } = await privateApi.get("/users/me/");

          if ((data as UserType).profile.profile_photo) {
            data.profile.profile_photo = `${IMAGE_BASE}${data.profile.profile_photo}`;
          }

          dispatch(setUser(data));
        } catch (error) {
          console.log(error);
        }
      })();

      return () => {
        ran.current = true;
      };
    }
  }, []);

  return { user };
}
