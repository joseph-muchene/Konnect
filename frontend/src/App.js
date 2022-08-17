import React from "react";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
import SideContent from "./components/SideContent";

function App() {
  return (
    <div>
      <Navbar />

      <hr />
      <div className="flex flex-row space-x-60 overflow-scroll md:justify-center  ">
        <Posts />
        <SideContent />
      </div>
    </div>
  );
}

export default App;
