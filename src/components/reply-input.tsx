import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { increaseReplyCounts } from "@/features/postsSlice";
import { useDispatch } from "react-redux";

const ReplyInput = ({ commentId }: { commentId: string }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleAddReply = async () => {
    if (text.trim() === "") return;
    try {
      dispatch(increaseReplyCounts(commentId));
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-3 w-full block">
        <Textarea
          placeholder="it's cool"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          size="sm"
          className="mt-2"
          variant="outline"
          onClick={handleAddReply}
        >
          Add
        </Button>
      </div>
    </>
  );
};

export default ReplyInput;
