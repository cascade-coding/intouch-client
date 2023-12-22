import { useToast } from "@/components/ui/use-toast";
import { api } from "@/http";
import { LoginFormSchema } from "@/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

type FormType = UseFormReturn<
  {
    email: string;
    password: string;
  },
  any,
  undefined
>;

type onSubmitType = (data: z.infer<typeof LoginFormSchema>) => void;

function useLogin(): { form: FormType; onSubmit: onSubmitType } {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginFormSchema>) {
    try {
      const res = await api.post("/jwt/create/", data);

      const { access, refresh } = res.data as {
        access: string;
        refresh: string;
      };

      localStorage.setItem("access", access);

      localStorage.setItem("refresh", refresh);

      form.reset();

      navigate("/");
    } catch (error) {
      let {
        response: { status, data },
      } = error as {
        response: {
          status: number;
          data: {
            email: string[];
            password: string[];
            non_field_errors: string[];
            detail: string;
          };
        };
      };

      if (status === 401) {
        data?.detail &&
          toast({
            variant: "destructive",
            description: data.detail,
          });
      }

      if (status === 400) {
        data?.non_field_errors &&
          toast({
            variant: "destructive",
            description: data.non_field_errors[0],
          });

        data?.email &&
          form.setError("email", {
            type: "custom",
            message: data.email[0],
          });

        data?.password &&
          form.setError("password", {
            type: "custom",
            message: data.password[0],
          });
      }

      if (status === 500) {
        toast({
          variant: "destructive",
          description: "Something went wrong!",
        });
      }
    }
  }

  return { form, onSubmit };
}

export default useLogin;
