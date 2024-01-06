import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import useGetTokenUser from "@/hooks/use-get-token-user";
import { TbLogout } from "react-icons/tb";
import useLogout from "@/hooks/use-logout";

const AvatarDropDown = () => {
  const { user } = useGetTokenUser();
  const { handleLogout } = useLogout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user?.profile.profile_photo ? (
          <img
            src={`${user.profile.profile_photo}`}
            alt="profile"
            width={28}
            height={28}
            className="rounded-full w-8 h-8 object-cover ring-2 ring-primary"
          />
        ) : (
          <div className="bg-secondary text-secondary-foreground w-8 h-8 rounded-full text-sm flex items-center justify-center focus:outline-none cursor-pointer uppercase ring-2 ring-primary">
            {user?.username.slice(0, 1)}
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link to={`/users/profile/${user?.username}`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/users/edit_profile/">Edit Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/users/settings/">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button onClick={handleLogout} className="flex gap-2 items-center">
            <span>Logout</span> <TbLogout />
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropDown;
