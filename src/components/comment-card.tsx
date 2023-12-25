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
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { Button } from "./ui/button";

const CommentCard = ({
  comment,
  avatarSm = false,
  showReplyBtn = false,
}: {
  comment: CommentType;
  avatarSm?: boolean;
  showReplyBtn?: boolean;
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);

  return (
    <div className="mt-6">
      <div className="flex gap-x-4">
        <Avatar
          profile_photo={comment.profile.profile_photo}
          username={comment.profile.user.username}
          sm={avatarSm}
        />
        <div className="-mt-1 w-2/3">
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
              <button
                className="cursor-pointer"
                onClick={() => setShowReplyInput(!showReplyInput)}
              >
                <MdOutlineQuickreply />
              </button>
            )}
          </div>
          {showReplyBtn && showReplyInput && (
            <div className="mt-3 w-full block">
              <Textarea placeholder="it's cool" />
              <Button size="sm" className="mt-2" variant="outline">
                Add
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
