import { RootState } from "@/app/store";
import { setProfile } from "@/features/profile-slice";
import { privateApi } from "@/http";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useGetProfile() {
  const ran = useRef(false);
  const dispatch = useDispatch();
  const { profile } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (ran.current === false) {
      (async () => {
        try {
          const { data } = await privateApi.get("/edit_profile/");
          dispatch(setProfile(data));
        } catch (error) {
          console.log(error);
        }
      })();

      return () => {
        ran.current = true;
      };
    }
  }, []);

  return { profile };
}
