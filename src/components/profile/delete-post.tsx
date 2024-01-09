import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import DeleteMenu from "./delete-menu";
import { useDispatch } from "react-redux";
import { deletePost } from "@/features/post-slice";
import { privateApi } from "@/http";
import { decreaseTotalPosts } from "@/features/user-profile-info-slice";

const DeletePost = ({ postId }: { postId: string }) => {
  const dispatch = useDispatch();

  const handlePostDelete = async () => {
    dispatch(deletePost(postId));
    dispatch(decreaseTotalPosts());
    try {
      await privateApi.post(`/delete_profile_posts/`, { postId });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <DeleteMenu />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Your post will be deleted permanently and cannot be recovered.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground"
              onClick={handlePostDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeletePost;
