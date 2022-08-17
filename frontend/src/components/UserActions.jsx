import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getSignedUser } from "../features/Users/UserSlice";
import { useDispatch, useSelector } from "react-redux";
function UserActions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getSignedUser());
  }, [dispatch]);

  return (
    <div className="flex flex-row space-y-3 justify-center mt-3">
      {/* wrapper */}
      <div className="">
        <div className="flex  space-x-4 mt-3 md: flex-col justify-center items-center">
          <img
            src={
              user && user.profilePhoto
                ? user.profilePhoto
                : "https://cdn.pixabay.com/photo/2019/12/11/17/11/john-lennon-4688793_1280.png"
            }
            alt="logo"
            className="h-20 w-20 rounded "
          />

          <h1 className=" mt-2 text-xl">{user && user.name}</h1>
          {/* <button
            onClick={() => navigate("/settings")}
            className=" border-gray-800 text-md border-1 bg-gray-400 p-3 rounded hover:bg-white text-black cursor-pointer md:hidden"
          >
            Change Password
          </button> */}
        </div>
        <div className="mt-3">
          <ul className="flex flex-row space-x-3 ml-6 text-xl md:text-sm">
            <li>0 posts</li>
            <li>{user && user.followers && user.followers.length} followers</li>
            <li>
              {user && user.followings && user.followings.length} Following
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserActions;
