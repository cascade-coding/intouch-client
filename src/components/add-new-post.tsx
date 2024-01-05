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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setText } from "@/features/upload-post-slice";
import { privateApi } from "@/http";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { setNewPost } from "@/features/post-slice";

const AddNewPost = () => {
  const { toast } = useToast();

  const dispatch = useDispatch();
  const { text, chosenImages } = useSelector(
    (state: RootState) => state.uploadPost
  );

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleUploadPost = async () => {
    if (!text.trim() && chosenImages.length <= 0) return;

    try {
      setLoading(true);
      const formData = new FormData();

      const getImageBlob = async (imageString: string): Promise<Blob> => {
        const imageObject = new Image();
        imageObject.src = imageString;

        return await fetch(imageObject.src).then((response) => response.blob());
      };

      await Promise.all(
        chosenImages.map(async (imageString, index) => {
          const blob = await getImageBlob(imageString);
          formData.append(`images`, blob, `image${index}_filename.png`);
        })
      );

      formData.append("text", text);

      dispatch(setText(""));

      const { data } = await privateApi.post("/add_new_post/", formData);

      setOpen(false);

      toast({
        title: "Post uploaded",
        description: "Your new post is out now",
      });

      dispatch(setNewPost(data));
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <Textarea
            placeholder="any thought..."
            className="hide-scrollbar"
            value={text}
            onChange={(e) => dispatch(setText(e.target.value))}
          />
          <PostImagePicker />
        </div>

        <DialogFooter className="mt-6">
          <Button
            type="submit"
            onClick={handleUploadPost}
            disabled={!text.trim() && chosenImages.length <= 0 ? true : false}
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewPost;
