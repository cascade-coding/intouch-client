import { useState } from "react";

import { EyeClosedIcon, EyeOpenIcon, ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
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

import usePasswordResetConfirm from "@/hooks/use-password-reset-confirm";

import AuthNavbar from "./components/auth-navbar";

const PasswordResetConfirm = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { form, onSubmit } = usePasswordResetConfirm();
  return (
    <>
      <AuthNavbar />
      <main className="flex flex-col items-center min-h-screen mt-8 container px-4 sm:px-8">
        <Card className="w-full sm:w-[350px]">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Enter new passwords for confirmation
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
                  name="new_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="*********"
                            {...field}
                            type={showPassword1 ? "text" : "password"}
                          />
                          {showPassword1 ? (
                            <EyeOpenIcon
                              className="absolute right-3 top-1/2 -translate-y-2/4 dark:text-cyan-500 w-5 h-5"
                              onClick={() => setShowPassword1(false)}
                            />
                          ) : (
                            <EyeClosedIcon
                              className="absolute right-3 top-1/2 -translate-y-2/4 dark:text-cyan-500 w-5 h-5"
                              onClick={() => setShowPassword1(true)}
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="new_confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="*********"
                            {...field}
                            type={showPassword2 ? "text" : "password"}
                          />
                          {showPassword2 ? (
                            <EyeOpenIcon
                              className="absolute right-3 top-1/2 -translate-y-2/4 dark:text-cyan-500 w-5 h-5"
                              onClick={() => setShowPassword2(false)}
                            />
                          ) : (
                            <EyeClosedIcon
                              className="absolute right-3 top-1/2 -translate-y-2/4 dark:text-cyan-500 w-5 h-5"
                              onClick={() => setShowPassword2(true)}
                            />
                          )}
                        </div>
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
                        Submitting
                      </>
                    ) : (
                      <>Submit</>
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

export default PasswordResetConfirm;
