import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PostType } from "@/types";
import PostCard from "./post-card";
import DialogPostCard from "./dialog-post-card";

const PostDialog = ({
  open,
  setOpen,
  post,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: PostType | null;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-4xl overflow-auto h-screen pt-16 mt-4"
        id="post-dialog"
      >
        {post && <DialogPostCard post={post} />}
        post now
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;
