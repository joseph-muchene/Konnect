import React, { useEffect } from "react";
import UserItem from "./UserItem";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, getSignedUser } from "../features/Users/UserSlice";
function SideContent() {
  const dispatch = useDispatch();
  const { user, users } = useSelector((state) => state.user);
  let newUsers;
  newUsers = users.filter((x) => x._id !== user._id);

  if (newUsers.length > 4) {
    // chop of
    newUsers = users.filter((x) => x._id !== user._id).splice(0, 5);
  }

  useEffect(() => {
    dispatch(getSignedUser());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="mt-4  mx-4  flex flex-col md:hidden">
      <div className="flex flex-row space-x-2 mb-2">
        <img
          src={
            user && user.profilePhoto
              ? user.profilePhoto
              : "https://cdn.pixabay.com/photo/2019/12/11/17/11/john-lennon-4688793_1280.png"
          }
          alt="logo"
          className="h-20 w-25 rounded "
        />
        <div className="mt-6 ">
          <Link to="/profile">
            <p className="text-green-600">{user && user.name}</p>
          </Link>
        </div>
      </div>
      <hr />
      <div className="mt-3 flex flex-row space-x-3 ">
        <p>Suggestion for you</p>
        <p className="text-blue-400 cursor-pointer">
          <Link to="/users">See all</Link>
        </p>
      </div>
      <div className="mt-4">
        {newUsers.map((user) => (
          <UserItem user={user} />
        ))}

        {newUsers.length < 1 && (
          <h2 className="text-green-500">No suggestions</h2>
        )}
      </div>
    </div>
  );
}

export default SideContent;
