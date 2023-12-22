import { ReloadIcon } from "@radix-ui/react-icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import AuthNavbar from "./components/auth-navbar";

import useSendResetPasswordEmail from "@/hooks/useSendResetPasswordEmail";

const PasswordReset = () => {
  const { form, onSubmit } = useSendResetPasswordEmail();
  return (
    <>
      <AuthNavbar />
      <main className="flex flex-col items-center min-h-screen mt-8 container px-4 sm:px-8">
        <Card className="w-full sm:w-[350px]">
          <CardHeader>
            <CardTitle>Forgot Password?</CardTitle>
            <CardDescription>
              Enter the email address you used when you joined and we’ll send
              you instructions to reset your password.
            </CardDescription>
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
                    type="submit"
                    disabled={form.formState.isSubmitting ? true : false}
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Sending
                      </>
                    ) : (
                      <>Send Instructions</>
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

export default PasswordReset;
