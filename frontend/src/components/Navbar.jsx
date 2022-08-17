import React, { useState } from "react";
import { FaHome, FaUserCircle, FaUsers, FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import Svg from "../svg.png";
import { hideSearch, showSearch } from "../features/Search/SearchSlice";
import { useEffect } from "react";
import { getAllUsers } from "../features/Users/UserSlice";
function Navbar() {
  const { isOpen } = useSelector((state) => state.search);
  const { users } = useSelector((state) => state.user);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (text.length > 0 && text !== "") {
      dispatch(showSearch());
    } else {
      dispatch(hideSearch());
    }
  });
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const onChangeHandler = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <div className=" flex justify-between bg-white  shadow-md p-4 md:flex-col space-y-3 items-center">
        <div className="ml-3 animate-bounce">
          <p className="text-xl">
            <Link className="cursor-pointer " to="/">
              <img src={Svg} alt="" className="h-6" />
            </Link>
          </p>
        </div>
        <div>
          <input
            type="search"
            placeholder="search"
            value={text}
            onChange={onChangeHandler}
            className="w-60 bg-slate-100 p-1 rounded border-2 border-gray-300"
          />
        </div>

        <div>
          <ul className="flex flex-row cursor-pointer space-between space-x-7 text-green-500 mr-4 text-xl font-medium ">
            <li>
              <Link to="/">
                <FaHome />
              </Link>
            </li>

            <li>
              <Link to="/create/post">
                <FaPlusCircle />
              </Link>
            </li>

            <li>
              <Link to="/users">
                <FaUsers />
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <FaUserCircle />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-3">
        <ToastContainer />
      </div>
      {isOpen && <SearchBox users={users} searchItem={text} />}
    </>
  );
}

export default Navbar;
