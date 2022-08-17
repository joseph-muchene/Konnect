import React from "react";
import Post from "./Post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../features/Post/PostSlice";
const Posts = () => {
  const dispatch = useDispatch();
  const { isError, isSuccess, message, posts, isLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isSuccess) {
      return;
    }
    dispatch(getAllPosts());
  }, [dispatch, isError, isSuccess, message]);

  return (
    <div className="grid grid-row-2 gap-2 ml-4 md:flex justify-center flex-col items-center ">
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default Posts;
