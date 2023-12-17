import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AuthNavbar from "@/components/auth/auth-navbar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useSendActivationEmail from "@/hooks/useSendActivationEmail";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

const ReSendActivationEmail = () => {
  const navigate = useNavigate();
  const { form, onSubmit } = useSendActivationEmail();
  return (
    <>
      <AuthNavbar />
      <main className="flex flex-col items-center min-h-screen mt-8 container px-4 sm:px-8">
        <Card className="w-full sm:w-[350px]">
          <CardHeader>
            <CardTitle>Send Activation Email</CardTitle>
            <CardDescription>Request for new activation link.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                autoComplete="off"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => navigate("/auth")}
                  >
                    Back to Account
                  </Button>

                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting ? true : false}
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Sending
                      </>
                    ) : (
                      <>Send</>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default ReSendActivationEmail;
