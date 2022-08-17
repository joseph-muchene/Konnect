import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getSignedUser, updateUser } from "../features/Users/UserSlice";
import FileBase64 from "react-file-base64";
import { useState } from "react";
function UserInfo() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getSignedUser());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    bio: "",
    profilePhoto: "",
    about: "",
  });
  const { name, email, website, bio, about, profilePhoto } = formData;
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // populate data on render
  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      name: user.name,
      email: user.email,
      about: user.about,
      website: user.website,
      bio: user.bio,
      profilePhoto: user.profilePhoto,
    }));
  }, [
    user.name,
    user.email,
    user.about,
    user.website,
    user.bio,
    user.profilePhoto,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const userData = {
        name,
        website,
        email,
        bio,
        about,
        profilePhoto,
      };
      dispatch(updateUser(userData));
      toast.success("updated successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mx-8 shadow  mt-8 p-4">
      <ToastContainer />
      <div className="flex flex-row">
        <div className="flex flex-row space-x-3 mx-auto">
          {/* <p className="mt-2">Joseph muchene</p> */}

          <div className="flex flex-col space-y-2">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-2">
                <FileBase64
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setFormData({ ...formData, profilePhoto: base64 })
                  }
                />

                <button
                  type="submit"
                  className="bg-orange-400 p-2 rounded hover:bg-black text-white mb-2 md:w-56 "
                >
                  update profile photo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <form
        className="flex justify-center mt-5 flex-col items-center "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col space-y-3 mb-3">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChange}
            className="p-1 rounded border-2 w-80 border-gray-500 md:w-60"
          />
        </div>
        <div className="flex flex-col space-y-3 mb-3">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            className="p-1 rounded border-2 border-gray-500 w-80 md:w-60"
          />
        </div>
        <div className="flex flex-col space-y-3 mb-3 ">
          <label htmlFor="bio">Bio:</label>
          <input
            type="text"
            name="bio"
            id="bio"
            onChange={handleChange}
            value={bio}
            className="p-1 rounded border-2 border-gray-500 w-80 md:w-60"
          />
        </div>

        <div className="flex flex-col space-y-3 mb-3">
          <label htmlFor="website">Website:</label>
          <input
            type="website"
            name="website"
            id="website"
            value={website}
            onChange={handleChange}
            className="p-1 rounded border-2 border-gray-500 w-80 md:w-60"
          />
        </div>

        <div className="flex flex-col space-y-3 mb-3">
          <label htmlFor="about">About:</label>
          <input
            type="text"
            name="about"
            id="about"
            value={about}
            onChange={handleChange}
            className="p-1 rounded border-2 border-gray-500 w-80 md:w-60"
          />
        </div>

        <div className="">
          <button className="bg-blue-400 px-4 rounded py-2">
            update account
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserInfo;
