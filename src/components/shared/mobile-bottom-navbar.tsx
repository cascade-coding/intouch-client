import { Link } from "react-router-dom";
import { HomeIcon } from "@radix-ui/react-icons";
import AvatarDropDown from "./avatar-dropdown";
import Discover from "../discover/discover";

const MobileBottomNavbar = () => {
  return (
    <nav className="block md:hidden bg-background">
      <div className="w-full h-16 flex items-center fixed bottom-0 left-0 border-secondary border-t bg-background">
        <ul className="w-full flex items-center justify-around gap-6">
          <li>
            <Link to="/">
              <HomeIcon className="w-6 h-6 hover:text-primary transition-all" />
            </Link>
          </li>
          <li>
            <Discover />
          </li>

          <li>
            <AvatarDropDown />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MobileBottomNavbar;
