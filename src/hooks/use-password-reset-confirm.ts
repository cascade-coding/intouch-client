import { useToast } from "@/components/ui/use-toast";
import { api } from "@/http";
import { ResetPasswordFormSchema } from "@/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";

type FormType = UseFormReturn<
  {
    new_password: string;
    new_confirm_password: string;
  },
  any,
  undefined
>;

type onSubmitType = (data: z.infer<typeof ResetPasswordFormSchema>) => void;

function usePasswordResetConfirm(): { form: FormType; onSubmit: onSubmitType } {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      new_password: "",
      new_confirm_password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof ResetPasswordFormSchema>) {
    setIsLoading(true);
    try {
      await api.post("/users/reset_password_confirm/", { uid, token, ...data });

      toast({
        title: "Your password is reset.",
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
            new_password: string[];
          };
        };
      };

      data?.new_password &&
        form.setError("new_password", {
          type: "custom",
          message: data.new_password[0],
        });

      data?.non_field_errors &&
        toast({
          variant: "destructive",
          description: data?.non_field_errors[0],
        });

      if (data.uid || data.token) {
        toast({
          variant: "destructive",
          title: "Invalid or expired link.",
          description: "You should request for a new reset link.",
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

  return { form, onSubmit };
}

export default usePasswordResetConfirm;
