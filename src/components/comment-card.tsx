import { MdOutlineThumbUp, MdOutlineThumbDown } from "react-icons/md";

import { CommentType } from "@/types";

import Avatar from "./avatar";
import HumanizeTime from "./humanize-time";

const CommentCard = ({
  comment,
  avatarSm = false,
}: {
  comment: CommentType;
  avatarSm?: boolean;
}) => {
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
