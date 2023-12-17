import { useToast } from "@/components/ui/use-toast";
import { api } from "@/http";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function useActivateAccount(): {
  isLoading: boolean;
  handleActivate: () => void;
} {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { uid, token } = useParams();
  const navigate = useNavigate();

  async function handleActivate() {
    setIsLoading(true);
    try {
      await api.post("/users/activation/", { uid, token });

      toast({
        title: "Your account is activated.",
        description: "Now you can login in.",
      });

      navigate("/auth?tab=login");
    } catch (error) {
      let {
        response: { status, data },
      } = error as {
        response: {
          status: number;
          data: {
            uid: string[];
            token: string[];
            non_field_errors: string[];
          };
        };
      };

      data?.non_field_errors &&
        toast({
          variant: "destructive",
          description: data?.non_field_errors[0],
        });

      if (data.uid || data.token) {
        toast({
          variant: "destructive",
          title: "Invalid or expired link.",
          description: "You should request for a new activation link.",
        });
      }

      if (status === 500) {
        toast({
          variant: "destructive",
          description: "Something went wrong!",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, handleActivate };
}

export default useActivateAccount;
