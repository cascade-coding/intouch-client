import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DialogPostCard from "./dialog-post-card";

const PostDialog = ({
  open,
  setOpen,
  dialogPostId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogPostId: string;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-2xl overflow-auto h-screen"
        id="post-dialog"
      >
        <DialogPostCard dialogPostId={dialogPostId} />
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;
