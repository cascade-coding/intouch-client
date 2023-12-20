"use client";
import useGetHomePosts from "@/hooks/useGetHomePosts";
import PostCard from "./post-card";
import PostDialog from "./post-dialog";
import { useState } from "react";

const Posts = () => {
  const { posts } = useGetHomePosts();
  const [open, setOpen] = useState(false);
  const [dialogPostId, setDialogPostId] = useState("");
  return (
    <div className="pt-2 pb-10">
      <PostDialog open={open} setOpen={setOpen} dialogPostId={dialogPostId}/>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} setPostDialog={setOpen} 
        setDialogPostId={setDialogPostId}/>
      ))}
    </div>
  );
};

export default Posts;
