import React, { useState } from "react";
import User from "./user.png";
import { Link } from "react-router-dom";
function SearchBox({ searchItem, users }) {
  const [searchItems, setSearchItem] = useState([...users]);
  return (
    <div className="animate flex flex-col mb-3 justify-center items-center mx-auto w-1/2  bg-[#333] rounded shadow cursor-pointer">
      <div>
        {searchItems.length > 0 &&
          searchItems
            .filter((item) => item.name.toLowerCase().includes(searchItem))
            .slice(0, 4)
            .map((Item) => (
              <div className="flex flex-row space-x-2 mb-2 animate-pulse">
                <img src={User} alt="logo" className="h-20 w-25 rounded " />
                <div className="mt-6 ">
                  <Link to={`/user/${Item._id}`}>
                    <p className="text-green-600">{Item.name}</p>
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default SearchBox;
