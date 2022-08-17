import React from "react";
import {
  followUser,
  getAllUsers,
  getSignedUser,
  unfollowUser,
} from "../features/Users/UserSlice";
import { ToastContainer } from "react-toastify";
import Svg from "./user.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function UserItem(prop) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getSignedUser());
  }, [dispatch]);

  const followUserFunc = () => {
    dispatch(followUser(prop.user._id));
  };

  const unFollowUserFunc = () => {
    dispatch(unfollowUser(prop.user._id));
  };

  return (
    <div className="flex flex-row space-x-16 mb-2 relative md:space-x-8  ">
      <ToastContainer />
      <img
        src={
          prop && prop.user && prop.user.profilePhoto
            ? prop.user.profilePhoto
            : Svg
        }
        alt=""
        srcset=""
        className="h-10 w-10  rounded-full"
      />
      <div className="h-4 w-10 ">
        <div className="mt-2">
          <Link to={`/user/${prop && prop.user && prop.user._id}`}>
            <p>{prop && prop.user && prop.user.name}</p>
          </Link>
        </div>
      </div>

      {prop && prop.user && prop.user.followers.includes(user._id) ? (
        <button
          onClick={unFollowUserFunc}
          className="mt-2 text-lg bg-blue-500 text-white px-4 rounded border"
        >
          unfollow
        </button>
      ) : (
        <button
          onClick={followUserFunc}
          className="mt-2 text-lg bg-blue-500 text-white px-4 rounded border"
        >
          follow
        </button>
      )}
    </div>
  );
}

export default UserItem;
