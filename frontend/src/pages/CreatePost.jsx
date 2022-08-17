import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import FileBase64 from "react-file-base64";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { createPost, reset } from "../features/Post/PostSlice";
function CreatePost() {
  const dispatch = useDispatch();
  const { isError, isSuccess, message } = useSelector((state) => state.post);
  const [formData, setFormData] = useState({
    caption: "",
    photo: "",
  });
  const { caption, photo } = formData;

  if (isError) {
    toast.error("photo might be too large");
  }
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && message !== "") {
      toast.success(message);
    }
    dispatch(reset());
  }, [message, isError, isSuccess, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (caption === "") {
        return toast.error("caption is required");
      }
      dispatch(createPost({ description: caption, photo: photo }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <form
        className="flex justify-center  flex-col items-center  space-y-3"
        onSubmit={handleSubmit}
      >
        <div className="ml-24 md:ml-0">
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) => setFormData({ ...formData, photo: base64 })}
          />
        </div>

        <div>
          <textarea
            className="border-2 border-gray-400 rounded p-2  resize-none"
            placeholder="Add a caption"
            id="caption"
            name="caption"
            onChange={handleChange}
            value={caption}
          />
        </div>

        <input
          type="submit"
          value="submit"
          className="bg-blue-400 px-6 py-2 rounded cursor-pointer"
        />
      </form>
    </div>
  );
}

export default CreatePost;
