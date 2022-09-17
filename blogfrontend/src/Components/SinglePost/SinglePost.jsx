import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./SinglePost.scss";
import { Context } from "../../Context/context";
import { axiosInstance } from "../../config";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const { user } = useContext(Context);

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`posts/${post._id}`);
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`posts/${post._id}`, {
        username: user.username,
        title,
        description,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.image && (
          <img src={post.image} alt="" className="singlePostImage" />
        )}

        {updateMode ? (
          <input
            value={title}
            type="text"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {user?.username === post.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={(e) => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <div className="postTime">
            <span className="postDate">
              <i class="fa-solid fa-calendar-days"></i>{" "}
              {new Date(post.createdAt).toDateString()} / by
              <Link to={`/?username=${post.username}`} className="centerLink">
                <b className="singlePostAuthor"> {post.username}</b>
              </Link>
            </span>
            <span className="postDuration">
              <i class="fa-solid fa-clock"></i> 5min Read
            </span>
          </div>
        </div>

        {updateMode ? (
          <textarea
            value={description}
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        ) : (
          <p className="singlePostDesc">{description}</p>
        )}
        {updateMode && (
          <div className="formControl">
            <button
              type="submit"
              className="writeSubmit"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
