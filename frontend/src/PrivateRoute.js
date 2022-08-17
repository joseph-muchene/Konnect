import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSignedUser } from "./features/Users/UserSlice";
function PrivateRoute() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getSignedUser());
  }, [dispatch]);
  return user !== null ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
