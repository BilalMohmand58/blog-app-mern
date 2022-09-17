import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../../Context/context";
import "./Setting.scss";

import { axiosInstance } from "../../config";

const Setting = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const { user } = useContext(Context);

  const handleClick = async (e) => {
    e.preventDefault();

    const updatedUser = {
      userID: user._id,
      profile: user.profile,
      username,
      email,
      password,
      bio,
    };
    try {
      const res = await axiosInstance.put(`users/${user._id}`, updatedUser);
      res.data && window.location.replace("/");
    } catch (err) {}
  };
  return (
    <div className="setting">
      <div className="settingWrapper">
        <div className="settingTitle">
          <span className="settingTitleUpdate">Update Your Account</span>
          <span className="settingTitleDelete">Delete Account</span>
        </div>
        <form className="settingForm">
          <div className="settingPicture">
            <img src={user.profile} alt="" />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-sharp fa-solid fa-arrow-up-from-bracket"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              className="settingPictureInput"
              style={{ display: "none" }}
            />
          </div>
          <label htmlFor="username">Username</label>
          <input
            placeholder={user.username}
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            placeholder={user.email}
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="">Bio</label>
          <textarea
            className="bioInput"
            placeholder={user.bio}
            name=""
            id="bio"
            cols="3"
            rows="2"
            onChange={(e) => setBio(e.target.value)}
          ></textarea>

          <button type="submit" className="settingButton" onClick={handleClick}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setting;
