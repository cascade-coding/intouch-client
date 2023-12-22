import { useState } from "react";

import { EyeClosedIcon, EyeOpenIcon, ReloadIcon } from "@radix-ui/react-icons";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import useLogin from "@/hooks/useLogin";

const LoginForm = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const { form, onSubmit } = useLogin();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
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
        <Button
          type="submit"
          disabled={form.formState.isSubmitting ? true : false}
        >
          {form.formState.isSubmitting ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <>Login</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
