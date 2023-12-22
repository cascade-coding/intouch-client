import { privateApi } from "@/http";

function useTogglePostLike() {
  const togglePostLike = async (id: string) => {
    try {
      await privateApi.post("/toggle_post_like/", { id });
    } catch (error) {
      console.log(error);
    }
  };

  return { togglePostLike };
}

export default useTogglePostLike;
