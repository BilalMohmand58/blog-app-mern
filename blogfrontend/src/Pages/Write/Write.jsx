import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Context } from "../../Context/context";
import "./Write.scss";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { axiosInstance } from "../../config";

const Write = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleClick = async (e) => {
    e.preventDefault();
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
          const newPost = {
            image: downloadURL,
            username: user.username,
            title,
            description,
            categories: categories,
          };
          try {
            const res = await axiosInstance.post("posts", newPost);
            window.location.replace("/posts/" + res.data._id);
          } catch (err) {}
        });
      }
    );
  };

  const handleSubmit = (e) => {
    setTitle("");
    setDescription("");
    setCategories([]);
    setFile(null);
  };
  return (
    <div className="write">
      <div className="imageContainer">
        <div alt="" className="writeImage">
          {" "}
        </div>

        <label htmlFor="file">
          <i class=" writeIcon fa-solid fa-arrow-up-from-bracket"></i>
        </label>
        <input
          name="image"
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <input
            type="text"
            className="writeInput"
            placeholder="Title"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            type="text"
            placeholder="Write Down Your Idea Here"
            className="writeInput writeText"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="writeFormGroup">
          <input
            className="writeInput categoryInput"
            name="categories"
            type="text"
            placeholder="Enter Categories Here"
            onChange={(e) => setCategories(e.target.value.split(","))}
          />
        </div>
        <div className="formControl">
          <button type="submit" className="writeSubmit" onClick={handleClick}>
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
