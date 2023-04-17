import React from "react";
import CommentItem from "./CommentItem";

interface ICommentFeed {
  comments?: Record<string, any>;
}
const CommentFeed: React.FC<ICommentFeed> = ({ comments = [] }) => {
  return (
    <>
      {comments.map((comment: any) => {
        return <CommentItem key={comment.id} data={comment} />;
      })}
    </>
  );
};

export default CommentFeed;
