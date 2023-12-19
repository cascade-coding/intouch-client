"use client";
import useGetHomePosts from "@/hooks/useGetHomePosts";
import PostCard from "./post-card";
import PostDialog from "./post-dialog";
import { useState } from "react";
import { PostType } from "@/types";

const Posts = () => {
  const { posts } = useGetHomePosts();
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState<PostType | null>(null);
  return (
    <div className="pt-2 pb-10">
      <PostDialog open={open} setOpen={setOpen} post={post}/>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} setPostDialog={setOpen} 
        setPost={setPost}/>
      ))}
    </div>
  );
};

export default Posts;
