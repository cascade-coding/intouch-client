import useGetHomePosts from "@/hooks/use-get-home-posts";
import PostCard from "./post-card";
import PostDialog from "./post-dialog";
import { useState } from "react";
import LoadMorePosts from "./load-more-posts";

const Posts = () => {
  const { posts } = useGetHomePosts();
  const [open, setOpen] = useState(false);
  return (
    <div className="pt-2 pb-20">
      <PostDialog open={open} setOpen={setOpen} />

      {posts.results.map((post) => (
        <PostCard post={post} key={post.id} setPostDialog={setOpen} />
      ))}

      <LoadMorePosts />
    </div>
  );
};

export default Posts;
