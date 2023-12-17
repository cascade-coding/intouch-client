import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateAccountForm from "@/components/auth/create-account-form";
import LoginForm from "@/components/auth/login-form";
import { Link } from "react-router-dom";
import AuthNavbar from "@/components/auth/auth-navbar";
import { useSearchParams } from "react-router-dom";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <>
      <title>Intouch</title>
      <AuthNavbar />
      <main className="flex flex-col items-center min-h-screen mt-8 container px-4 sm:px-8">
        <Tabs
          defaultValue={`${tab === "login" ? "login" : "signup"}`}
          className="w-full sm:w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create a new Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <CreateAccountForm />
              </CardContent>
              <CardFooter>
                <Link
                  to="/auth/resend_activation_email"
                  className="text-sm text-right w-full block text-indigo-600 font-medium"
                >
                  Re-send activation email
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <LoginForm />
              </CardContent>
              <CardFooter>
                <Link
                  to="/auth/password_resets/"
                  className="text-sm text-right w-full block text-indigo-600 font-medium"
                >
                  Forgot your password?
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default Auth;
