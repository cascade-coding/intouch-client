import React from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const ReplyInput = ({ commentId }: { commentId: string }) => {
  return (
    <>
      <div className="mt-3 w-full block">
        <Textarea placeholder="it's cool" />
        <Button size="sm" className="mt-2" variant="outline">
          Add
        </Button>
      </div>
    </>
  );
};

export default ReplyInput;
