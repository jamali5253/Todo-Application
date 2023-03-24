import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "cookies-js";
// import "../css/style2.css";

const Signin = () => {
  const navigate = useNavigate();
  const [data, Setdata] = useState({
    email: "",
    pass: "",
  });
  const Inputval = (e) => {
    const Name = e.target.name;
    const Value = e.target.value;

    Setdata((pre) => {
      return { ...pre, [Name]: Value };
    });
  };
  const Submithandel = async (e) => {
    e.preventDefault();
    const { email, pass } = data;
    try {
      if (!email || !pass) {
        alert("Plz Fill The Field");
      } else {
        const res = await axios.post("/api/login", data);
        const currtoken = res.data.usertoken;
        console.log(currtoken);
        Cookies.set("authtoken", currtoken, { expires: 900000000 });
        navigate("/");
      }
    } catch (error) {
      console.log("There is some issue inside");
    }
  };
  return (
    <>
      <body>
        <div className="container">
          <div className="form-container">
            <div className="signin">
              <form
                method="post"
                className="form-sign-in"
                id="form101"
                onSubmit={Submithandel}
              >
                <h1>Sign In 🔑 </h1>
                <input
                  type="text"
                  placeholder="Enter Your email"
                  name="email"
                  onChange={Inputval}
                  value={data.email}
                  required
                />
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  name="pass"
                  onChange={Inputval}
                  value={data.pass}
                  required
                />
                <p
                  onClick={() => navigate("/forgetpass")}
                  style={{ cursor: "pointer" }}
                >
                  Forget your Password
                </p>
                <button className="btn btn-form" type="submit">
                  SIGN IN
                </button>
              </form>
            </div>
          </div>
          <div className="overlay">
            <div className="overlay-panel overlay-signin"></div>
            <div className="overlay-panel overlay-signup">
              <h1>Welcome Back!</h1>
              <span>
                To keep connected with us please login with your personal info{" "}
                🤗
              </span>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Signin;
