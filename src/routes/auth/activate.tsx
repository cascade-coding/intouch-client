import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useActivateAccount from "@/hooks/use-activate-ccount";

const Activate = () => {
  const { isLoading, handleActivate } = useActivateAccount();
  return (
    <main className="flex flex-col items-center justify-center min-h-screen container text-center">
      <img
        src="/icons/mail.svg"
        alt="mail photo"
        width={180}
        height={180}
        className="w-[180px] h-[180px]"
      />
      <h1 className="text-2xl font-medium mt-4">Activate Your account</h1>
      <p className="text-sm mt-4 text-center w-[95%]">
        Thanks for signing up with intouch. <br /> click the button below to
        activate your account.
      </p>
      <Button
        className="mt-4"
        onClick={handleActivate}
        disabled={isLoading ? true : false}
      >
        Proceed Activation
      </Button>
      <Link
        to="/users/resend_activation_email"
        className="mt-4 w-[95%] text-primary underline-offset-4 hover:underline"
      >
        Re-Send a new activation link, if something went wrong.
      </Link>
    </main>
  );
};

export default Activate;
