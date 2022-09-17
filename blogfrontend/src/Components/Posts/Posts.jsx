import React from "react";
import Post from "../Post/Post";
import "./Posts.scss";

const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default Posts;
