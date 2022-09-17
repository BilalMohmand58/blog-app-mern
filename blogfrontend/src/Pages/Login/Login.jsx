import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import { axiosInstance } from "../../config";
import { Context } from "../../Context/context";
import "./Login.scss";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("auth/login", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div className="login">
      <span className="title">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="loginInput"
          id="username"
          ref={usernameRef}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="loginInput"
          id="password"
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <span>
        Don't have an account <a href="/register">Sign up</a>
      </span>
    </div>
  );
};

export default Login;
