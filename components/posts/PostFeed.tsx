import usePosts from "@/hooks/usePosts";
import React from "react";
import PostItem from "./PostItem";

interface IPostFeed {
  userId?: string;
}

const PostFeed: React.FC<IPostFeed> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);
  return (
    <>
      {posts.map((post: Record<string, any>) => {
        return <PostItem userId={userId} key={post.id} data={post} />;
      })}
    </>
  );
};

export default PostFeed;
