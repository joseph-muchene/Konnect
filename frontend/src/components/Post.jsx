import React, { useState } from "react";
import Svg from "../svg.png";
import { FaHeart, FaComment } from "react-icons/fa";
import Comments from "./Comments";
import { useDispatch } from "react-redux";
import { AddComment, LikePost } from "../features/Post/PostSlice";
import { toast, ToastContainer } from "react-toastify";
function Post({ post }) {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      postId: post._id,
      commentData: {
        name: JSON.parse(localStorage.getItem("user")).user.payload.name,
        userId: JSON.parse(localStorage.getItem("user")).user.payload.userId,
        text,
      },
    };
    dispatch(AddComment(postData));
    toast.success("commented");
    setToggle(toggle ? null : !toggle);
  };
  const handleLike = () => {
    dispatch(LikePost(post._id));
  };

  return (
    <div>
      <ToastContainer />
      <div className=" p-3 mt-4 shadow-md ml-7  rounded-md mb-3 md: mx-4">
        <div className="flex flex-col ">
          <div>
            <img src={Svg} alt="post pic" className="h-8" srcset="" />
          </div>
          <p className="text-lg p-4">{post.description}</p>
        </div>
        <hr />

        <div>
          <img src={post.photo} className="w-80 " alt="post pic" />
        </div>

        <div className="flex flex-row space-x-10 text-green-400 text-lg p-3 cursor-pinter">
          <div className="relative">
            <p className="">{post && post.likes.length}</p>
            <FaHeart onClick={handleLike} />
          </div>

          <div className="relative">
            <p className="">{post && post.comments.length}</p>
            <FaComment className="cursor-pointer" />
          </div>
        </div>
        <button
          onClick={() => setToggle(!toggle)}
          className="cursor-pointer p-2"
        >
          {!toggle ? "Show comments" : "hide comments"}
        </button>
        <Comments comments={post.comments} toggle={toggle} />
        <div className="w-100">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="bg-gray-300 p-1.5 rounded w-full"
              placeholder="comment"
              id="name"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Post;
