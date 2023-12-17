"use client";
import useGetHomePosts from "@/hooks/useGetHomePosts";
import PostCard from "./post-card";

const Posts = () => {
  const { posts } = useGetHomePosts();
  return (
    <div className="pt-2 pb-10">
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
