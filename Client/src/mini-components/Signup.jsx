import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/style2.css";

const Signup = () => {
  const navigate = useNavigate();
  const [data, Setdata] = useState({
    username: "",
    email: "",
    pass: "",
    cpass: "",
  });
  const Inputval = (e) => {
    const Name = e.target.name;
    const Value = e.target.value;

    Setdata((pre) => {
      return { ...pre, [Name]: Value };
    });
  };
  const Register = async (e) => {
    e.preventDefault();
    const { username, email, pass, cpass } = data;
    if (!username || !email || !pass || !cpass) {
      alert("Plz Fill all Fields !!");
    } else {
      if (pass === cpass) {
        const res = await axios.post("/api/register", data);
        console.log(JSON.stringify(res.data.username));
        if (res === 401 || res === 404 || !res) {
          console.log("Not Sumitted");
        } else {
          alert("Your are Submit successfully");
          navigate("/signin");
        }
      } else {
        console.log("Invalid Password");
      }
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
                onSubmit={Register}
              >
                <h1>Sign Up 🔐 </h1>
                <input
                  type="text"
                  placeholder="Enter Your username"
                  name="username"
                  onChange={Inputval}
                  value={data.username}
                  autocomplete="off"
                  required
                />
                <input
                  type="email"
                  placeholder="Enter Your email"
                  name="email"
                  onChange={Inputval}
                  value={data.email}
                  required
                  autocomplete="off"
                />
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  name="pass"
                  onChange={Inputval}
                  value={data.pass}
                  required
                  autocomplete="off"
                />
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  name="cpass"
                  onChange={Inputval}
                  value={data.cpass}
                  required
                  autocomplete="off"
                />
                <button className="btn btn-form" type="submit">
                  SIGN UP
                </button>
              </form>
            </div>
          </div>
          <div className="overlay">
            <div className="overlay-panel overlay-signin"></div>
            <div className="overlay-panel overlay-signup">
              <h1>Welcome Back!</h1>
              <span>
                To keep connected with us please Register with your personal
                info 🤗
              </span>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Signup;
