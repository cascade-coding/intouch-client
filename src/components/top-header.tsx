import HeaderLogo from "./header-logo";
import { Link } from "react-router-dom";
import { HomeIcon } from "@radix-ui/react-icons";
import AvatarDropDown from "./avatar-dropdown";
import Discover from "./discover";
import { UserPlus } from "lucide-react";
import AddNewPost from "./add-new-post";

const TopHeader = () => {
  return (
    <>
      <header className="w-full h-16 flex items-center fixed top-0 left-0 z-10 border-secondary border-b dark:shadow dark:shadow-blue-900 bg-background">
        <div className="mx-auto px-4 sm:px-8 w-full max-w-5xl flex h-full items-center justify-between">
          <HeaderLogo />

          <ul className="flex items-center gap-6">
            <li className="hidden md:block">
              <Link to="/">
                <HomeIcon className="w-6 h-6 hover:text-primary transition-all" />
              </Link>
            </li>
            <li className="hidden md:block">
              <Discover />
            </li>
            <li className="">
              <AddNewPost />
            </li>

            <li className="">
              <Link to="/users/follow/">
                <UserPlus />
              </Link>
            </li>

            <li className="hidden md:block">
              <AvatarDropDown />
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default TopHeader;
