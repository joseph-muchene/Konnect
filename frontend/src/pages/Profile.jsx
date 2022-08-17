import React from "react";
import Navbar from "../components/Navbar";
import UserActions from "../components/UserActions";
import UserInfo from "../components/UserInfo";
function Profile() {
  return (
    <div>
      <Navbar />
      <UserActions />
      <UserInfo />
    </div>
  );
}

export default Profile;
