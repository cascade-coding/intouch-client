import { useToast } from "@/components/ui/use-toast";
import { api } from "@/http";
import { SignUpFormSchema } from "@/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";

type FormType = UseFormReturn<
  {
    email: string;
    username: string;
    password: string;
    re_password: string;
  },
  any,
  undefined
>;

type onSubmitType = (data: z.infer<typeof SignUpFormSchema>) => void;

function useSignUp(): { form: FormType; onSubmit: onSubmitType } {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      re_password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof SignUpFormSchema>) {
    try {
      await api.post("/users/", data);

      form.reset();

      toast({
        title: "You are now registered.",
        description: "Please Check your email for account activation link.",
      });
    } catch (error) {
      let {
        response: { status, data },
      } = error as {
        response: {
          status: number;
          data: {
            email: string[];
            username: string[];
            password: string[];
            re_password: string[];
            non_field_errors: string[];
          };
        };
      };

      if (status === 400) {
        data?.non_field_errors &&
          toast({
            variant: "destructive",
            description: data?.non_field_errors[0],
          });

        data?.username &&
          form.setError("username", {
            type: "custom",
            message: data?.username[0],
          });

        data?.email &&
          form.setError("email", {
            type: "custom",
            message: data?.email[0],
          });

        data?.password &&
          form.setError("password", {
            type: "custom",
            message: data.password[0],
          });

        data?.re_password &&
          form.setError("re_password", {
            type: "custom",
            message: data?.re_password[0],
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

export default useSignUp;
