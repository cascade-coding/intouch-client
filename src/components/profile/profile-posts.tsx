import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { privateApi } from "@/http";

import PostCard from "../post/post-card";
import PostDialog from "../post/post-dialog";
import LoadMorePosts from "../post/load-more-posts";
import DeletePost from "./delete-post";
import LoadingAnimation from "@/components/shared/loading-animation";

import { RootState } from "@/app/store";

import { setPosts } from "@/features/post-slice";

type PropsType = {
  profileId: string;
};

const ProfilePosts = ({ profileId }: PropsType) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { posts } = useSelector((state: RootState) => state.posts);

  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const { username } = useParams();

  const getPosts = async () => {
    setLoading(true);
    try {
      const { data } = await privateApi.post("/profile_posts/", {
        profileId,
      });
      dispatch(setPosts(data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, [profileId, username]);

  if (loading) return <LoadingAnimation />;

  if (!posts.results.length)
    return <p className="text-center">User has no posts yet.</p>;

  return (
    <div>
      <div className="pt-2 pb-20">
        <PostDialog open={open} setOpen={setOpen} />

        <div className="max-w-2xl mx-auto">
          {posts.results.map((post) => (
            <div className="relative" key={post.id}>
              {post.profile.id === user.profile.id && (
                <div className="absolute top-5 right-5">
                  <DeletePost postId={post.id} />
                </div>
              )}
              <PostCard post={post} setPostDialog={setOpen} />
            </div>
          ))}
        </div>

        <LoadMorePosts />
      </div>
    </div>
  );
};

export default ProfilePosts;
