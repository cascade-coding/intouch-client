import {
  MdOutlineThumbUp,
  MdOutlineThumbDown,
  MdOutlineQuickreply,
} from "react-icons/md";

import { CommentType } from "@/types";

import Avatar from "./avatar";
import HumanizeTime from "./humanize-time";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import useIsMobile from "@/hooks/use-ismobile";

const CommentCard = ({
  comment,
  avatarSm = false,
  showReplyBtn = false,
}: {
  comment: CommentType;
  avatarSm?: boolean;
  showReplyBtn?: boolean;
}) => {
  const { isMobile } = useIsMobile();
  return (
    <div className="mt-6">
      <div className="flex gap-x-4">
        <Avatar
          profile_photo={comment.profile.profile_photo}
          username={comment.profile.user.username}
          sm={avatarSm}
        />
        <div className="-mt-1">
          <p className="font-medium">
            {comment.profile.user.username}

            <HumanizeTime time={comment.created_at} />
          </p>

          <p className="text-sm mt-2">{comment.text}</p>

          <div className="flex gap-x-4 mt-2">
            <button className="cursor-pointer">
              <MdOutlineThumbUp />
            </button>
            <button className="cursor-pointer">
              <MdOutlineThumbDown />
            </button>

            {showReplyBtn && (
              <Popover modal>
                <PopoverTrigger asChild>
                  <button className="cursor-pointer">
                    <MdOutlineQuickreply />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  side={isMobile ? "bottom" : "right"}
                  sideOffset={10}
                  className="border-none"
                >
                  <Input placeholder="it's cool" />
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
