import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function useIsAnonymous() {
  const router = useRouter();
  const ran = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (ran.current === false) {
      try {
        const access = localStorage.getItem("access");
        const refresh = localStorage.getItem("refresh");

        if (access && refresh) {
          router.replace("/");
        } else {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
        }
      } catch (error) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
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
