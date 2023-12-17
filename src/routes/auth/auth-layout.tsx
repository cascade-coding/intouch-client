import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const AuthLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current === false) {
      const token = localStorage.getItem("refresh");
      if (token) navigate("/");

      setLoading(false);
    }

    return () => {
      mounted.current = true;
    };
  }, []);

  return <>{!loading ? <Outlet /> : null}</>;
};

export default AuthLayout;
