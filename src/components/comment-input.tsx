import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { addNewReply, increaseReplyCounts } from "@/features/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { privateApi } from "@/http";
import { RootState } from "@/app/store";

const CommentInput = () => {
  const { dialogPostId: post_id } = useSelector(
    (state: RootState) => state.posts
  );

  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleAddComment = async () => {
    if (text.trim() === "") return;
    try {
      const { data } = await privateApi.post("/add_post_comment/", {
        post_id,
        text,
      });

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
          className="rounded-none border-transparent border-b-border  focus:border-b-neutral-50 focus:!ring-0 hide-scrollbar"
        />
        <Button
          size="sm"
          className="mt-2"
          variant="outline"
          onClick={handleAddComment}
        >
          Comment
        </Button>
      </div>
    </>
  );
};

export default CommentInput;
