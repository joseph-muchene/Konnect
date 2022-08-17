import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById } from "../features/Users/UserSlice";
import Image from "./user.png";
function UserProfileComponent() {
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserById(id));
  }, [id, dispatch]);

  return (
    <div className="flex justify-center flex-col items-center space-y-4">
      <img
        src={user && user.profilePhoto ? user.profilePhoto : Image}
        alt=""
        srcset=""
        className=" h-16 w-16 rounded-full"
      />
      <div className=" ">
        <div className="mt-2">
          <p>{user && user.name}</p>
        </div>
      </div>

      {/* <button className="mt-2 text-lg bg-blue-500 text-white px-4 rounded border">
        follow
      </button> */}

      <div className="mt-3">
        <ul className="flex flex-row space-x-3 ml-6 text-xl md:text-sm">
          <li>0 posts</li>
          <li>{user && user.followers && user.followers.length} followers</li>
          <li>{user && user.followings && user.followings.length} Following</li>
        </ul>
        <div className="mt-2 flex flex-col space-y-4">
          <p>
            Email: <span className="text-gray-700">{user && user.email}</span>
          </p>
          <p>
            Website:{" "}
            <span className="text-gray-700">
              {user && user.website ? user.website : "undefined"}
            </span>
          </p>
          <p>
            About:{" "}
            <span className="text-gray-700">
              {user && user.about ? user.about : "undefined"}
            </span>
          </p>
          <p>
            Bio:{" "}
            <span className="text-gray-700">
              {user && user.bio ? user.bio : "undefined"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfileComponent;
