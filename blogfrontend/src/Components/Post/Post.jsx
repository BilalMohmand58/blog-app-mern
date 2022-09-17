import React from "react";
import { Link } from "react-router-dom";
import "./Post.scss";

const Post = ({ post }) => {
  return (
    <div className="post">
      <Link to={`posts/${post._id}`}>
        {post.image && <img src={post.image} alt="" className="postImage" />}
      </Link>
      <div className="postInfo">
        <span className="postTitle">
          <Link to={`posts/${post._id}`} className="centerLink">
            {post.title}
          </Link>
        </span>

        <p className="postDesc">{post.description}</p>
        <div className="postCategories">
          {post.categories.map((category) => (
            <Link to={`/?category=${category}`} className="centerLink">
              <span className="postCategory">{category}</span>
            </Link>
          ))}
        </div>
        <div className="postTime">
          <span className="postDate">
            <i class="fa-solid fa-calendar-days"></i>
            {new Date(post.createdAt).toDateString()}
          </span>
          <span className="postDuration">
            <i class="fa-solid fa-clock"></i>5 min Read
          </span>
        </div>
      </div>
    </div>
  );
};
export default Post;
