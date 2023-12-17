import { privateApi } from "@/http";
import { UserType } from "@/types";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useEffect, useRef, useState } from "react";

export default function useGetTokenUser() {
  const [user, setUser] = useState<UserType>();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current === false) {
      (async () => {
        try {
          const { data } = await privateApi.get("/users/me/");
          setUser(data);
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
