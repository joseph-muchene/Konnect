import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import UserItem from "../components/UserItem";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../features/Users/UserSlice";
function Users() {
  const { users, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const newUsers = users.filter((x) => x._id !== user._id);
  return (
    <div>
      <Navbar />
      <div className="shadow mx-20 bg-white mt-4 p-2 md:mx-0">
        <h1 className="text-xl text-center pb-3">Suggested</h1>
        <hr />
        <div className="flex-col flex justify-center  items-center mt-4">
          {newUsers.map((user) => (
            <UserItem key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Users;
