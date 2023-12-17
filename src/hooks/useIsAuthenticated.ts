import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function useIsAuthenticated() {
  const router = useRouter();
  const ran = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (ran.current === false) {
      try {
        const access = localStorage.getItem("access");
        const refresh = localStorage.getItem("refresh");

        if (!access && !refresh) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          router.replace("/users/auth");
        }
      } catch (error) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        router.replace("/users/auth");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }

      return () => {
        ran.current = true;
      };
    }
  }, []);

  return { isLoading };
}
