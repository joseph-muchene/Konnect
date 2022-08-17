import React from "react";
import Svg from "../svg.png";
function Comment({ comment }) {
  return (
    <div className=" p-2">
      <img src={Svg} alt="post pic" className="h-8" srcset="" />
      <p className="text-xl text-green-800">{comment.name}</p>
      <p>{comment.text}</p>
    </div>
  );
}

export default Comment;
