import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/auth?tab=login");
    } catch (error) {
      console.log(error);
    }
  };

  return { handleLogout };
}

export default useLogout;
