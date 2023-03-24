import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "cookies-js";
import Main_Todo from "./Main_Todo";
const Todo = () => {
  const nav = useNavigate();
  const [data, Setdata] = useState("");
  const checkuser = async () => {
    const res = await fetch("/api/checkuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: true,
      },
    });
    const userres = await res.json();
    console.log(userres);
    if (userres === 401 || userres === 404 || !userres) {
      nav("/signup");
    } else {
      nav("/todo");
    }
  };

  useEffect(() => {
    checkuser();
  }, []);
  return (
    <>
      <h1>This is Todo App</h1>
    </>
  );
};

export default Todo;
