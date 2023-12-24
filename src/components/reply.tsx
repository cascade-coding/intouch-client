import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { CommentType } from "@/types";

const Reply = ({ comment }: { comment: CommentType }) => {
  return (
    <>
      <div className="ml-[34px]">
        <Button className="mt-1" variant="info" size="sm">
          <ChevronDown size={15} className="pt-[2px] mr-2" />{" "}
          <span>{comment.reply_counts} replies</span>
        </Button>
      </div>
    </>
  );
};

export default Reply;
