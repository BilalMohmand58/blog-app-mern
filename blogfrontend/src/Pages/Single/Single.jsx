import React from "react";
import "./Single.scss";
// import Sidebar from "../../Components/Sidebar/Sidebar";
import SinglePost from "../../Components/SinglePost/SinglePost";

const Single = () => {
  return (
    <div className="single">
      <SinglePost />
      {/* <Sidebar /> */}
    </div>
  );
};

export default Single;
