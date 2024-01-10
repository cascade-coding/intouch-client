import React from "react";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { privateApi } from "@/http";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  return (
    <main className="mt-28">
      <div className="mx-auto px-4 sm:px-8 w-full max-w-5xl min-h-screen">
        <div>
          <h2 className="text-xl font-medium">Delete Account</h2>

          <DeleteAccount />
        </div>
      </div>
    </main>
  );
};

export default Settings;

function DeleteAccount() {
  const [password, setPassword] = React.useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      await privateApi.post("/delete_account/", { password });
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/auth", { replace: true });
    } catch (error) {
      const { response } = error as { response: { status: number } };
      if (response.status === 400) {
        toast({
          title: "Invalid password.",
        });
      } else {
        toast({
          title: "Something went wrong.",
        });
      }
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"} className="mt-4">
            Delete My Account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Your account will be deleted permanently, and cannot be recovered.
            </AlertDialogDescription>
            <Input
              placeholder="Enter your account password *********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={password.trim() === "" ? true : false}
              className="bg-destructive text-destructive-foreground"
              onClick={handleDeleteAccount}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
