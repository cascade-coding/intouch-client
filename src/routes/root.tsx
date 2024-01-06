import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import TopHeader from "@/components/top-header";
import MobileBottomNavbar from "@/components/mobile-bottom-navbar";
import useGetProfile from "@/hooks/use-get-profile";

const Root = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const mounted = useRef(false);

  useGetProfile();

  useEffect(() => {
    if (mounted.current === false) {
      const token = localStorage.getItem("refresh");
      if (!token) {
        navigate("/auth?tab=login");
      }

      setLoading(false);
    }

    return () => {
      mounted.current = true;
    };
  }, []);

  if (loading) return null;

  return (
    <>
      <TopHeader />
      <Outlet />
      <MobileBottomNavbar />
    </>
  );
};

export default Root;
