import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash } from "lucide-react";

const DeleteMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreVertical size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left">
        <DropdownMenuItem>
          <Trash size={20} className="pr-2 text-red-500" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeleteMenu;
