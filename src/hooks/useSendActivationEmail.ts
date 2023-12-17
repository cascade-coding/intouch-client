import { useToast } from "@/components/ui/use-toast";
import { api } from "@/http";
import { ActivationFormSchema } from "@/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";

type FormType = UseFormReturn<
  {
    email: string;
  },
  any,
  undefined
>;

type onSubmitType = (data: z.infer<typeof ActivationFormSchema>) => void;

function useSendActivationEmail(): { form: FormType; onSubmit: onSubmitType } {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ActivationFormSchema>>({
    resolver: zodResolver(ActivationFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof ActivationFormSchema>) {
    try {
      await api.post("/users/resend_activation/", data);

      form.reset();

      toast({
        title: "Email has been sent.",
        description: "Please Check your email for activation instructions.",
      });
    } catch (error) {
      let {
        response: { status, data },
      } = error as {
        response: {
          status: number;
          data: {
            email: string[];
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

        data?.email &&
          form.setError("email", {
            type: "custom",
            message: data?.email[0],
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

export default useSendActivationEmail;
