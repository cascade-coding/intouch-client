import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, CornerDownRight } from "lucide-react";
import { CommentType, ReplyCommentType } from "@/types";
import { useState } from "react";
import { privateApi } from "@/http";
import CommentCard from "./comment-card";

type RepliesDataType = {
  results: ReplyCommentType[];
  next: boolean | null;
  previous: boolean | null;
};

const Reply = ({ comment }: { comment: CommentType }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [replies, setReplies] = useState<RepliesDataType>({
    next: null,
    previous: null,
    results: [],
  });

  const handleLoadReplies = async () => {
    setShowReplies(!showReplies);

    if (initialLoaded) return;

    try {
      const { data } = await privateApi.post(`/get_post_comment_replies/`, {
        id: comment.id,
      });
      setReplies(data);
      setInitialLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLoadMoreReplies = async () => {
    if (replies.next === null) return;
    try {
      const { data } = await privateApi.post(`${replies.next}`, {
        id: comment.id,
      });
      setReplies((prev) => {
        return {
          next: data.next,
          previous: data.previous,
          results: [...prev.results, ...data.results],
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="ml-[34px]">
        <Button
          className="mt-1"
          variant="info"
          size="sm"
          onClick={handleLoadReplies}
        >
          {showReplies ? (
            <ChevronUp size={15} className="pt-[2px] mr-2" />
          ) : (
            <ChevronDown size={15} className="pt-[2px] mr-2" />
          )}
          <span>{comment.reply_counts} replies</span>
        </Button>

        <div className={`${showReplies ? "block" : "hidden"}`}>
          {replies.results.map((item) => (
            <CommentCard key={item.id} comment={item} />
          ))}

          {replies.next && (
            <Button
              className="mt-1"
              variant="info"
              size="sm"
              onClick={handleLoadMoreReplies}
            >
              <CornerDownRight size={15} className="pt-[2px] mr-2" />{" "}
              <span>Show more replies</span>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Reply;
