import React from "react";
import Navbar from "../components/Navbar";
function PassswordSetting() {
  return (
    <div>
      <Navbar />
 

      <div className="mx-8 shadow  mt-8 mb-8 p-4">
        <div className="flex flex-col space-x-4 mt-3 justify-center items-center ">
          <img
            src="https://cdn.pixabay.com/photo/2019/12/11/17/11/john-lennon-4688793_1280.png"
            alt="logo"
            className="h-10 w-10 rounded "
          />

          <h1 className=" mt-2 text-xl">Joseph Muchene</h1>
      
        </div>
        <div className="flex flex-row mt-4">
          <div className="flex flex-row space-x-3 mx-auto">
            {/* <p className="mt-2">Joseph muchene</p> */}

            <p className="bg-orange-400 p-2 rounded hover:bg-black text-white">
              Change profile photo
            </p>
          </div>
        </div>
        <form className="flex justify-center mt-5 flex-col items-center ">
          <div className="flex flex-col space-y-3 mb-3">
            <label htmlFor="password">Old password:</label>
            <input
              type="password"
              className="p-1 rounded border-2 border-gray-500 w-80"
            />
          </div>

          <div className="flex flex-col space-y-3 mb-3">
            <label htmlFor="password">password:</label>
            <input
              type="password"
              className="p-1 rounded border-2 border-gray-500 w-80"
            />
          </div>

          <div className="flex flex-col space-y-3 mb-3">
            <label htmlFor="password">Confirm password:</label>
            <input
              type="password"
              className="p-1 rounded border-2 border-gray-500 w-80"
            />
          </div>
          <div className="">
            <button className="bg-blue-400 px-4 rounded py-2">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PassswordSetting;
