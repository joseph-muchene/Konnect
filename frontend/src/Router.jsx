import React from "react";
import { BrowserRouter as Routing, Routes, Route } from "react-router-dom";
import App from "./App";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import PassswordSetting from "./pages/PassswordSetting";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Users from "./pages/Users";
import PrivateRoutes from "./PrivateRoute";
import UserProfile from "./pages/userProfile";
function Router() {
  return (
    <>
      <Routing>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<App />} exact />
            <Route path="/settings" element={<PassswordSetting />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<Users />} />
            <Route path="/create/post" element={<CreatePost />} />
            <Route path="/user/:id" element={<UserProfile />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Routing>
    </>
  );
}
export default Router;
