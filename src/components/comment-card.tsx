import { CommentType } from "@/types";
import Avatar from "./avatar";
import {
  MdOutlineThumbUp,
  MdOutlineThumbDown,
} from "react-icons/md";

const CommentCard = ({ comment }: { comment: CommentType }) => {
  return (
    <div className="mt-6">
      <div className="flex gap-x-4">
        <Avatar
          profile_photo={comment.profile.profile_photo}
          username={comment.profile.user.username}
        />
        <div className="-mt-1">
          <span className="font-medium">{comment.profile.user.username}</span>

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
