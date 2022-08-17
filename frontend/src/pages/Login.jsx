import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Svg from "../svg.png";
import { login } from "../features/Auth/AuthSlice";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { isSuccess, message, user, isLoading } = useSelector(
    (state) => state.auth
  );
  //  check state
  useEffect(() => {
    if (isSuccess && user) {
      navigate("/");
    }
  }, [isLoading, message, navigate, isSuccess, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(login({ email, password }));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="flex flex-row space-x-4 md:flex justify-center ">
        <div className="mt-16 shadow p-4">
          {/* logo */}
          <div className="flex justify-center">
            <img src={Svg} alt="" srcset="" className="h-16" />
          </div>
          <div>
            <form
              className="flex justify-center mt-5 flex-col items-center"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col space-y-3 mb-3">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChangeHandler}
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
                  onChange={onChangeHandler}
                  className="p-1 rounded border-2 border-gray-500 w-80 md:w-60"
                />
              </div>

              <div className="">
                <div className="">
                  <button className="bg-blue-400 px-4 rounded py-2">
                    Submit
                  </button>
                </div>
              </div>
            </form>

            <div>
              <p className="text-md text-center my-3">
                Dont have an account?{" "}
                <Link to="/register" className=" text-blue-400">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
