import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Svg from "../svg.png";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { register } from "../features/Auth/AuthSlice";
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;

  //   onChange handler
  const handleFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { user, isLoading, isError, isSuccess, message, registered } =
    useSelector(({ auth }) => auth);
  // constantly check for state
  useEffect(() => {
    if (isLoading) {
      setLoading(!loading);
    }
    if (isError) {
      toast.error(message);
    }
    if (registered) {
      navigate("/login");
    }
  }, [
    isError,
    isSuccess,
    message,
    loading,
    navigate,
    isLoading,
    user,
    registered,
  ]);

  //   onSubmit

  const onSubmit = (e) => {
    e.preventDefault();
    // check if password matches
    if (password !== confirmPassword) {
      return toast.error("password do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-row  md:flex justify-center ">
       

        <div className="mt-16 shadow px-4 md:p-0">
          {/* logo */}
          <div className="flex justify-center items-center">
            <img src={Svg} alt="" srcset="" className="h-16 " />
          </div>
          <div className="mr-8">
            <form
              className="flex justify-center mt-5 flex-col items-center "
              onSubmit={onSubmit}
            >
              <div className="flex flex-col space-y-3 mb-3">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleFormChange}
                  className="p-1 rounded border-2 border-gray-500 w-80 md:w-60"
                />
              </div>
              <div className="flex flex-col space-y-3 mb-3">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleFormChange}
                  className="p-1 rounded border-2 border-gray-500 w-80 md:w-60"
                />
              </div>
              <div className="flex flex-col space-y-3 mb-3">
                <label htmlFor="password">password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleFormChange}
                  className="p-1 rounded border-2 border-gray-500 w-80 md:w-60"
                />
              </div>

              <div className="flex flex-col space-y-3 mb-3">
                <label htmlFor="password">Confirm password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleFormChange}
                  className="p-1 rounded border-2 border-gray-500 w-80 md:w-60"
                />
              </div>

              <div className="">
                <button className="bg-blue-400 px-4 rounded py-2">
                  Submit
                </button>
              </div>
            </form>

            <div>
              <p className="text-md text-center my-3">
                Already have an account?{" "}
                <Link to="/login" className=" text-blue-400">
                  click here to login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
