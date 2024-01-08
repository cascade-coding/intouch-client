import { Dialog, DialogContent } from "@/components/ui/dialog";
import DialogPostCard from "./dialog-post-card";

const PostDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-2xl overflow-auto h-[90%] hide-scrollbar"
        id="post-dialog"
      >
        <DialogPostCard />
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;
