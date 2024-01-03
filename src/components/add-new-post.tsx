import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusSquare } from "lucide-react";
import { Textarea } from "./ui/textarea";
import PostImagePicker from "./post-image-picker";

const AddNewPost = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <PlusSquare />
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px] overflow-y-auto hide-scrollbar h-[500px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Upload a new post</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="">
          <Textarea placeholder="any thought..." className="hide-scrollbar" />
          <PostImagePicker />
        </div>

        <DialogFooter className="mt-6">
          <Button type="submit" disabled>
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewPost;
