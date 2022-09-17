import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import { Context } from "../../Context/context";
import "./Sidebar.scss";

const Sidebar = () => {
  const { user } = useContext(Context);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const res = await axiosInstance.get("categories");
      setCategories(res.data);
    };
    getCategories();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        {user && <img src={user.profile} alt="" />}

        {user && <p>{user.bio}</p>}
      </div>

      <div className="sidebarItem">
        <h3 className="sidebarTitle">Categories</h3>
        <ul className="sidebarList">
          {categories.map((category) => (
            <Link to={`/?category=${category.name}`} className="centerLink">
              <li className="sidebarListItem">{category.name}</li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="sidebarItem">
        <h3 className="sidebarTitle">Follow Us</h3>
        <div className="sidebarSocial">
          <a
            href="https://twitter.com/BilalMohmand58"
            target="_blank"
            rel="opener noreferrer"
          >
            <i className="sidebarIcon fa-brands fa-twitter"></i>
          </a>

          <a
            href="https://www.instagram.com/bil.al_7/"
            target="_blank"
            rel="opener noreferrer"
          >
            <i className="sidebarIcon fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
