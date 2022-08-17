import React from "react";
import Comment from "./Comment";

function Comments({ comments, toggle }) {
  return (
    <div>
      {toggle && (
        <div className="mx-10 bg-blue-200 rounded mb-3">
          {comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comments;
