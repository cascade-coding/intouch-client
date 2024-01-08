import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { addNewReply, increaseReplyCounts } from "@/features/post-slice";
import { useDispatch } from "react-redux";
import { privateApi } from "@/http";

const ReplyInput = ({ commentId }: { commentId: string }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleAddReply = async () => {
    if (text.trim() === "") return;
    try {
      dispatch(increaseReplyCounts(commentId));
      const { data } = await privateApi.post("/add_post_comment_reply/", {
        comment_id: commentId,
        text,
      });

      dispatch(addNewReply(data));

      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-3 w-full block">
        <Textarea
          placeholder="Add a reply..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="hide-scrollbar"
        />
        <Button
          size="sm"
          className="mt-2"
          variant="outline"
          onClick={handleAddReply}
        >
          Reply
        </Button>
      </div>
    </>
  );
};

export default ReplyInput;
