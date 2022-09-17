import React from "react";
import { useState } from "react";
import "./Register.scss";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { axiosInstance } from "../../config";

const Register = () => {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const [error, setError] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setError(false);
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const newUser = {
            profile: downloadURL,
            username,
            email,
            password,
            bio,
          };
          try {
            const res = await axiosInstance.post("auth/register", newUser);
            res.data && window.location.replace("/login");
          } catch (err) {
            setError(true);
          }
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    setFile(null);
    setUsername("");
    setEmail("");
    setPassword("");
    setBio("");
    setError(false);
  };

  return (
    <div className="register">
      <span className="title">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label htmlFor="profile">Profile Picture</label>
        <input
          name="profile"
          type="file"
          className="registerInput"
          id="profile"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="registerInput"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="registerInput"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="registerInput"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="password">Bio</label>
        <textarea
          type="text"
          className="registerInput"
          id="password"
          onChange={(e) => setBio(e.target.value)}
        />

        <button className="registerButton" type="submit" onClick={handleClick}>
          Register
        </button>
        {error && (
          <span style={{ margin: "auto", marginTop: "5px", color: "tomato" }}>
            something went worng!
          </span>
        )}
      </form>
      <span>
        already have an account <a href="/login">Sign in</a>
      </span>
    </div>
  );
};

export default Register;
